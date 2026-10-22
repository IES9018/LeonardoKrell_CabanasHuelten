import { describe, it, expect, vi, beforeEach, afterAll } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";

const html = readFileSync(fileURLToPath(new URL("../index.html", import.meta.url)), "utf8");

let dom = null;
let importCounter = 0;
let emailjsSend;
let modalShow;

async function setup(configOverride) {
  if (dom) dom.window.close();
  dom = new JSDOM(html, {
    url: "http://localhost/",
    runScripts: "outside-only",
    pretendToBeVisual: true,
  });

  global.window = dom.window;
  global.document = dom.window.document;

  if (configOverride) dom.window.__EMAILJS_CONFIG__ = configOverride;

  emailjsSend = vi.fn().mockResolvedValue({ status: 200, text: "OK" });
  const emailjsMock = { init: vi.fn(), send: emailjsSend };
  dom.window.emailjs = emailjsMock;
  global.emailjs = emailjsMock;

  modalShow = vi.fn();
  global.bootstrap = {
    Modal: { getOrCreateInstance: () => ({ show: modalShow }) },
  };

  class CalendarMock {
    constructor(_el, config) {
      CalendarMock.lastConfig = config;
    }
    render() {}
  }
  global.FullCalendar = { Calendar: CalendarMock };

  const moduleUrl = new URL(`../app.js?case=${++importCounter}`, import.meta.url).href;
  await import(/* @vite-ignore */ moduleUrl);
}

const CONFIGURED = {
  publicKey: "pk_test_000",
  serviceId: "svc_test_000",
  templateId: "tpl_test_000",
};

function fill(overrides = {}) {
  const doc = dom.window.document;
  const values = {
    guestName: "Valentina Rios",
    guestEmail: "valentina@example.com",
    guestPhone: "+54 9 351 555 1234",
    guests: "4",
    checkIn: "2026-11-05",
    checkOut: "2026-11-07",
    message: "Consulta de prueba",
    ...overrides,
  };
  for (const [id, value] of Object.entries(values)) {
    const el = doc.getElementById(id);
    if (el) el.value = value;
  }
  return doc;
}

async function submit() {
  const doc = dom.window.document;
  const form = doc.getElementById("reservationForm");
  form.dispatchEvent(new dom.window.Event("submit", { bubbles: true, cancelable: true }));
  await vi.waitFor(
    () => {
      expect(doc.getElementById("formAlert").classList.contains("d-none")).toBe(false);
    },
    { timeout: 1000 }
  );
  return doc.getElementById("formAlert");
}

function alertText() {
  return dom.window.document.getElementById("formAlert").textContent;
}

afterAll(() => {
  if (dom) dom.window.close();
});

describe("Calendario y fechas (RF-04, RF-05, RF-06)", () => {
  beforeEach(() => setup());

  it("inicializa el calendario con los 5 tramos ocupados", () => {
    const config = global.FullCalendar.Calendar.lastConfig;
    expect(config).toBeDefined();
    expect(config.events).toHaveLength(5);
    expect(config.events[0].display).toBe("background");
    expect(config.selectOverlap).toBe(false);
    expect(config.locale).toBe("es");
  });

  it("impide fechas pasadas con min = hoy en check-in y check-out", () => {
    const doc = dom.window.document;
    const today = new Date().toISOString().split("T")[0];
    expect(doc.getElementById("checkIn").min).toBe(today);
    expect(doc.getElementById("checkOut").min).toBe(today);
  });

  it("bloquea el envío con campos obligatorios vacíos (sin llamar a EmailJS)", async () => {
    await setup(CONFIGURED);
    fill({ guestName: "", guestEmail: "", checkIn: "", checkOut: "" });
    const alert = await submit();
    expect(alertText()).toContain("obligatorios");
    expect(emailjsSend).not.toHaveBeenCalled();
  });

  it("bloquea check-out igual o anterior al check-in", async () => {
    await setup(CONFIGURED);
    fill({ checkIn: "2026-11-07", checkOut: "2026-11-07" });
    const alert = await submit();
    expect(alert.className).toContain("alert-warning");
    expect(alertText()).toContain("posterior");
    expect(emailjsSend).not.toHaveBeenCalled();
  });

  it("bloquea rango que solapa una fecha ocupada (temporada alta 24-31 dic)", async () => {
    await setup(CONFIGURED);
    fill({ checkIn: "2026-12-26", checkOut: "2026-12-28" });
    const alert = await submit();
    expect(alert.className).toContain("alert-danger");
    expect(alertText()).toContain("superpone");
    expect(emailjsSend).not.toHaveBeenCalled();
  });

  it("permite el día adyacente al fin de una ocupación (31 dic libre)", async () => {
    await setup(CONFIGURED);
    fill({ checkIn: "2026-12-31", checkOut: "2027-01-02" });
    const alert = await submit();
    expect(alert.className).toContain("alert-success");
    expect(emailjsSend).toHaveBeenCalledTimes(1);
  });
});

describe("Envío de reserva (RF-07, CA-03)", () => {
  it("sin claves configuradas muestra fallback y no llama a EmailJS", async () => {
    await setup();
    fill();
    const alert = await submit();
    expect(alert.className).toContain("alert-warning");
    expect(alertText()).toContain("EmailJS");
    expect(alertText()).toContain("WhatsApp");
    expect(emailjsSend).not.toHaveBeenCalled();
  });

  it("con claves configuradas envía el ReservationPayload y muestra éxito", async () => {
    await setup(CONFIGURED);
    fill();
    const alert = await submit();
    expect(alert.className).toContain("alert-success");
    expect(emailjsSend).toHaveBeenCalledTimes(1);
    const [serviceId, templateId, payload] = emailjsSend.mock.calls[0];
    expect(serviceId).toBe("svc_test_000");
    expect(templateId).toBe("tpl_test_000");
    expect(payload).toMatchObject({
      to_email: "hueltencabanas@yahoo.com.ar",
      from_name: "Valentina Rios",
      from_email: "valentina@example.com",
      guests: "4",
      check_in: "2026-11-05",
      check_out: "2026-11-07",
    });
  });
});

describe("Galería (RF-02, RF-03)", () => {
  beforeEach(() => setup());

  it("renderiza las 9 fotos con el filtro Todas por defecto", () => {
    const cards = dom.window.document.querySelectorAll("#galleryGrid .gallery-card");
    expect(cards).toHaveLength(9);
  });

  it("el filtro Piscina muestra 3 fotos y sincroniza aria-pressed", () => {
    const doc = dom.window.document;
    doc.querySelector('[data-filter="piscina"]').click();
    const cards = doc.querySelectorAll("#galleryGrid .gallery-card");
    expect(cards).toHaveLength(3);
    expect(doc.querySelector('[data-filter="piscina"]').getAttribute("aria-pressed")).toBe("true");
    expect(doc.querySelector('[data-filter="all"]').getAttribute("aria-pressed")).toBe("false");
    expect(doc.querySelector('[data-filter="all"]').classList.contains("active")).toBe(false);
  });

  it("hacer clic en una card abre el lightbox con su título", () => {
    const doc = dom.window.document;
    const card = doc.querySelector("#galleryGrid .gallery-card");
    card.click();
    expect(modalShow).toHaveBeenCalledTimes(1);
    expect(doc.getElementById("galleryModalLabel").textContent).toBe("Habitación de montaña");
  });
});

describe("Atractivos por temporada (RF-08)", () => {
  beforeEach(() => setup());

  it("cambia el contenido al seleccionar Verano y actualiza aria-pressed", () => {
    const doc = dom.window.document;
    expect(doc.getElementById("seasonCards").textContent).toContain("Las Leñas");
    doc.querySelector('[data-season="verano"]').click();
    expect(doc.getElementById("seasonCards").textContent).toContain("La Payunia");
    expect(doc.getElementById("seasonCards").textContent).not.toContain("Las Leñas");
    expect(doc.querySelector('[data-season="verano"]').getAttribute("aria-pressed")).toBe("true");
    expect(doc.querySelector('[data-season="invierno"]').getAttribute("aria-pressed")).toBe("false");
  });
});
