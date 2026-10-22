(() => {
  "use strict";

  const EMAILJS_CONFIG = {
    publicKey: "YOUR_PUBLIC_KEY",
    serviceId: "YOUR_SERVICE_ID",
    templateId: "YOUR_TEMPLATE_ID",
    toEmail: "hueltencabanas@yahoo.com.ar",
  };

  const occupiedRanges = [
    { start: "2026-09-12", end: "2026-09-16", title: "Ocupado" },
    { start: "2026-09-22", end: "2026-09-26", title: "Ocupado" },
    { start: "2026-10-03", end: "2026-10-08", title: "Ocupado" },
    { start: "2026-10-18", end: "2026-10-22", title: "Ocupado" },
    { start: "2026-12-24", end: "2026-12-31", title: "Temporada alta" },
  ];

  const galleryItems = [
    {
      category: "interiores",
      title: "Habitación de montaña",
      caption: "Dormitorio de madera con textiles cálidos y vista a la cordillera.",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    },
    {
      category: "interiores",
      title: "Chimenea",
      caption: "Living con chimenea a leña para las noches frías de Malargüe.",
      image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80",
    },
    {
      category: "interiores",
      title: "Cocina de madera",
      caption: "Cocina equipada en madera, lista para desayunos y asados de invierno.",
      image: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1200&q=80",
    },
    {
      category: "exteriores",
      title: "Cabaña frente a los Andes",
      caption: "Fachada de cabaña con fondo de montañas nevadas.",
      image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
    },
    {
      category: "exteriores",
      title: "Parque y entorno",
      caption: "Espacios verdes para descansar al aire libre con vista abierta.",
      image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",
    },
    {
      category: "exteriores",
      title: "Parrillas",
      caption: "Quincho y parrilla para asados bajo el cielo de Mendoza.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
    },
    {
      category: "piscina",
      title: "Piscina climatizada",
      caption: "Piscina templada con terraza y horizonte de montaña.",
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80",
    },
    {
      category: "piscina",
      title: "Relax junto al agua",
      caption: "Camastros y agua climatizada para después de un día en Las Leñas.",
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
    },
    {
      category: "piscina",
      title: "Atardecer en la pileta",
      caption: "La terraza se tiñe de naranja al caer el sol sobre Malargüe.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const yearRoundAttractions = [
    {
      title: "Planetario Malargüe",
      text: "Observación astronómica y muestras interactivas, un clásico de la ciudad todo el año.",
      image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Laberintos de Carmona",
      text: "Senderos y formaciones para caminar cerca de la ciudad, ideales en cualquier estación.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const seasonalAttractions = {
    invierno: {
      intro: "Nieve, termas y noches de chimenea. El sur mendocino se pone en modo ski.",
      items: [
        {
          title: "Valle de Las Leñas",
          text: "Uno de los centros de esquí más importantes de Sudamérica, a un rato de las cabañas.",
          image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=900&q=80",
        },
        {
          title: "Termas de Cajón del Grande",
          text: "Aguas termales en plena montaña: el contrapunto perfecto después de esquiar.",
          image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=80",
        },
      ],
    },
    verano: {
      intro: "Días largos para explorar volcanes, cavernas y paisajes lunares.",
      items: [
        {
          title: "Reserva Natural La Payunia",
          text: "Un mar de volcanes y arenas negras único en el mundo, mejor con clima estable.",
          image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
        },
        {
          title: "Caverna de las Brujas",
          text: "Recorrido guiado por galerías subterráneas de estalactitas y leyendas locales.",
          image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=80",
        },
        {
          title: "Pozo de las Ánimas",
          text: "Hundimientos naturales de agua turquesa entre la estepa y la precordillera.",
          image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
        },
      ],
    },
    otono: {
      intro: "Menos gente, colores ocres y buen clima para rutas escénicas.",
      items: [
        {
          title: "Reserva Natural La Payunia",
          text: "Temporada más calma para recorrer el campo volcánico con luz suave de otoño.",
          image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
        },
        {
          title: "Caverna de las Brujas",
          text: "Temperatura estable bajo tierra, ideal cuando afuera empieza el frío.",
          image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=80",
        },
      ],
    },
    primavera: {
      intro: "Deshielo, flores de montaña y la temporada que conecta nieve residual con trekking.",
      items: [
        {
          title: "Pozo de las Ánimas",
          text: "Paisaje más verde y accesible, perfecto para una escapada de día.",
          image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
        },
        {
          title: "Termas de Cajón del Grande",
          text: "Aún hay nieve en altura y las termas se disfrutan con menos aglomeración.",
          image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=80",
        },
      ],
    },
  };

  const galleryGrid = document.getElementById("galleryGrid");
  const galleryModal = document.getElementById("galleryModal");
  const galleryModalImage = document.getElementById("galleryModalImage");
  const galleryModalCaption = document.getElementById("galleryModalCaption");
  const galleryModalLabel = document.getElementById("galleryModalLabel");
  const seasonIntro = document.getElementById("seasonIntro");
  const seasonCards = document.getElementById("seasonCards");
  const form = document.getElementById("reservationForm");
  const formAlert = document.getElementById("formAlert");
  const submitBtn = document.getElementById("submitReservation");
  const checkInInput = document.getElementById("checkIn");
  const checkOutInput = document.getElementById("checkOut");

  function categoryLabel(key) {
    return { interiores: "Interiores", exteriores: "Exteriores", piscina: "Piscina" }[key] || key;
  }

  function renderGallery(filter = "all") {
    const items = galleryItems.filter((item) => filter === "all" || item.category === filter);
    galleryGrid.innerHTML = items
      .map(
        (item) => `
        <div class="col-sm-6 col-lg-4">
          <article class="card gallery-card" data-index="${galleryItems.indexOf(item)}" role="button" tabindex="0">
            <img src="${item.image}" alt="${item.title}" />
            <div class="card-body">
              <span class="badge badge-cat mb-2">${categoryLabel(item.category)}</span>
              <h3 class="h6 mb-0">${item.title}</h3>
            </div>
          </article>
        </div>`
      )
      .join("");
  }

  function openGalleryItem(index) {
    const item = galleryItems[index];
    if (!item) return;
    galleryModalLabel.textContent = item.title;
    galleryModalImage.src = item.image;
    galleryModalImage.alt = item.title;
    galleryModalCaption.textContent = item.caption;
    bootstrap.Modal.getOrCreateInstance(galleryModal).show();
  }

  function attractionCard(item, yearRound = false) {
    return `
      <div class="col-md-6 ${yearRound ? "col-lg-6" : "col-lg-4"}">
        <article class="card attraction-card">
          <img src="${item.image}" alt="${item.title}" />
          <div class="card-body">
            ${yearRound ? '<span class="badge year-round mb-2">Todo el año</span>' : ""}
            <h3 class="h5">${item.title}</h3>
            <p class="mb-0">${item.text}</p>
          </div>
        </article>
      </div>`;
  }

  function renderSeason(season) {
    const data = seasonalAttractions[season];
    seasonIntro.textContent = data.intro;
    const seasonalHtml = data.items.map((item) => attractionCard(item)).join("");
    const yearRoundHtml = yearRoundAttractions.map((item) => attractionCard(item, true)).join("");
    seasonCards.innerHTML = `${seasonalHtml}${yearRoundHtml}`;
  }

  function datesOverlap(startA, endA, startB, endB) {
    return startA < endB && endA > startB;
  }

  function isRangeOccupied(checkIn, checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return occupiedRanges.some((range) => {
      const occupiedStart = new Date(range.start);
      const occupiedEnd = new Date(range.end);
      return datesOverlap(start, end, occupiedStart, occupiedEnd);
    });
  }

  function showAlert(type, message) {
    formAlert.className = `alert alert-${type}`;
    formAlert.textContent = message;
    formAlert.classList.remove("d-none");
  }

  function hideAlert() {
    formAlert.classList.add("d-none");
  }

  function initCalendar() {
    const calendarEl = document.getElementById("reservationCalendar");
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: window.innerWidth < 768 ? "dayGridMonth" : "dayGridMonth",
      locale: "es",
      height: "auto",
      selectable: true,
      selectOverlap: false,
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "",
      },
      buttonText: { today: "Hoy" },
      events: occupiedRanges.map((range) => ({
        start: range.start,
        end: range.end,
        display: "background",
        classNames: ["busy-event"],
        color: "#9a3b1e",
      })),
      dateClick(info) {
        if (!checkInInput.value || (checkInInput.value && checkOutInput.value)) {
          checkInInput.value = info.dateStr;
          checkOutInput.value = "";
        } else if (info.dateStr > checkInInput.value) {
          checkOutInput.value = info.dateStr;
        } else {
          checkInInput.value = info.dateStr;
          checkOutInput.value = "";
        }
      },
      select(info) {
        checkInInput.value = info.startStr;
        checkOutInput.value = info.endStr;
      },
    });
    calendar.render();
  }

  function initEmailJs() {
    if (window.emailjs && EMAILJS_CONFIG.publicKey !== "YOUR_PUBLIC_KEY") {
      emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
    }
  }

  async function sendReservation(payload) {
    const configured = EMAILJS_CONFIG.publicKey !== "YOUR_PUBLIC_KEY";
    if (!configured) {
      throw new Error("config");
    }
    return emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, payload);
  }

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
      renderGallery(button.dataset.filter);
    });
  });

  galleryGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".gallery-card");
    if (card) openGalleryItem(Number(card.dataset.index));
  });

  galleryGrid.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest(".gallery-card");
    if (!card) return;
    event.preventDefault();
    openGalleryItem(Number(card.dataset.index));
  });

  document.querySelectorAll("[data-season]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-season]").forEach((btn) => {
        const on = btn === button;
        btn.classList.toggle("is-on", on);
        btn.setAttribute("aria-pressed", String(on));
      });
      renderSeason(button.dataset.season);
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideAlert();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      showAlert("warning", "Completá los campos obligatorios para enviar la solicitud.");
      return;
    }

    if (checkOutInput.value <= checkInInput.value) {
      showAlert("warning", "La fecha de check-out debe ser posterior al check-in.");
      return;
    }

    if (isRangeOccupied(checkInInput.value, checkOutInput.value)) {
      showAlert("danger", "El rango elegido se superpone con fechas ocupadas. Probá otras noches.");
      return;
    }

    const payload = {
      to_email: EMAILJS_CONFIG.toEmail,
      from_name: document.getElementById("guestName").value.trim(),
      from_email: document.getElementById("guestEmail").value.trim(),
      phone: document.getElementById("guestPhone").value.trim(),
      guests: document.getElementById("guests").value,
      check_in: checkInInput.value,
      check_out: checkOutInput.value,
      message: document.getElementById("message").value.trim() || "Sin mensaje adicional",
    };

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    try {
      await sendReservation(payload);
      showAlert("success", "Recibimos tu solicitud. Te vamos a responder a la brevedad por Gmail o WhatsApp.");
      form.reset();
      form.classList.remove("was-validated");
    } catch (error) {
      if (error && error.message === "config") {
        showAlert(
          "warning",
          "El formulario está listo, pero faltan las claves de EmailJS en app.js. Mientras tanto, escribinos a hueltencabanas@yahoo.com.ar o por WhatsApp."
        );
      } else {
        showAlert("danger", "No pudimos enviar la reserva. Intentá de nuevo o contactanos por WhatsApp.");
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar solicitud de reserva";
    }
  });

  const today = new Date().toISOString().split("T")[0];
  checkInInput.min = today;
  checkOutInput.min = today;

  renderGallery();
  renderSeason("invierno");
  initEmailJs();
  initCalendar();
})();
