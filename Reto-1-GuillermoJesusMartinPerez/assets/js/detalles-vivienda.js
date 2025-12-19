$(function () {
  // Menú responsive (móvil)
  $(".js-nav-toggle").on("click", function () {
    const $nav = $(".js-nav");
    const isOpen = $nav.toggleClass("is-open").hasClass("is-open");
    $(this).attr("aria-expanded", isOpen);
  });

  // Cerrar menú al clicar enlace (móvil)
  $(".js-nav .nav__link").on("click", function () {
    $(".js-nav").removeClass("is-open");
    $(".js-nav-toggle").attr("aria-expanded", "false");
  });

  // ---- Cambiar "foto" principal al clicar miniaturas (placeholder demo) ----
  function setMainPhoto(imgId) {
    // como son placeholders, cambiamos el degradado para simular cambio
    const gradients = {
      1: "linear-gradient(180deg, rgba(47,128,237,.14), rgba(0,0,0,0))",
      2: "linear-gradient(180deg, rgba(39,174,96,.14), rgba(0,0,0,0))",
      3: "linear-gradient(180deg, rgba(235,87,87,.14), rgba(0,0,0,0))",
      4: "linear-gradient(180deg, rgba(224,224,224,.55), rgba(0,0,0,0))",
    };
    $(".js-main-photo").css("background", gradients[imgId] || gradients[1]);
  }

  $(".js-thumb").on("click", function () {
    $(".js-thumb").removeClass("is-active");
    $(this).addClass("is-active");

    const imgId = Number($(this).data("img"));
    setMainPhoto(imgId);
  });

  setMainPhoto(1);

  // ---- Leer ?id= y ajustar precio (demo defendible) ----
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id") || 1);

  const prices = {
    1: "350.000€",
    2: "240.000€",
    3: "180.000€",
    4: "310.000€",
    5: "145.000€",
    6: "99.000€",
  };
  $("#priceValue").text(prices[id] || "350.000€");

  // ---- Validación simple del formulario ----
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    const nombre = $('[name="nombre"]').val().trim();
    const email = $('[name="email"]').val().trim();
    const mensaje = $('[name="mensaje"]').val().trim();

    if (nombre.length < 3) {
      $("#formMsg")
        .text("El nombre debe tener al menos 3 caracteres.")
        .css("color", "#EB5757");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      $("#formMsg")
        .text("Introduce un correo electrónico válido.")
        .css("color", "#EB5757");
      return;
    }
    if (mensaje.length < 10) {
      $("#formMsg")
        .text("El mensaje debe tener al menos 10 caracteres.")
        .css("color", "#EB5757");
      return;
    }

    $("#formMsg").text("Mensaje enviado (demo).").css("color", "#27AE60");
    this.reset();
  });
});
