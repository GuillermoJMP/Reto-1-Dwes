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

  // Leer ?id= (demo) y ajustar precio
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

  // Botón "Enviar solicitud" dispara el submit del form
  $(".js-submit").on("click", function () {
    $("#requestForm").trigger("submit");
  });

  function isValidEmail(email) {
    return email.includes("@") && email.includes(".");
  }

  function isValidPhone(phone) {
    // España: 9 dígitos (permitimos espacios)
    const cleaned = phone.replace(/\s+/g, "");
    return /^\d{9}$/.test(cleaned);
  }

  // Validación simple
  $("#requestForm").on("submit", function (e) {
    e.preventDefault();

    const nombre = $('[name="nombre"]').val().trim();
    const apellidos = $('[name="apellidos"]').val().trim();
    const email = $('[name="email"]').val().trim();
    const telefono = $('[name="telefono"]').val().trim();
    const tipo = $('[name="tipo"]').val();
    const mensaje = $('[name="mensaje"]').val().trim();

    if (nombre.length < 3) {
      $("#formMsg")
        .text("El nombre debe tener al menos 3 caracteres.")
        .css("color", "#EB5757");
      return;
    }
    if (apellidos.length < 3) {
      $("#formMsg")
        .text("Los apellidos deben tener al menos 3 caracteres.")
        .css("color", "#EB5757");
      return;
    }
    if (!isValidEmail(email)) {
      $("#formMsg")
        .text("Introduce un correo electrónico válido.")
        .css("color", "#EB5757");
      return;
    }
    if (!isValidPhone(telefono)) {
      $("#formMsg")
        .text("Introduce un teléfono válido (9 dígitos).")
        .css("color", "#EB5757");
      return;
    }
    if (!tipo) {
      $("#formMsg")
        .text("Selecciona un tipo de solicitud.")
        .css("color", "#EB5757");
      return;
    }
    if (mensaje.length < 10) {
      $("#formMsg")
        .text("El mensaje debe tener al menos 10 caracteres.")
        .css("color", "#EB5757");
      return;
    }

    $("#formMsg").text("Solicitud enviada (demo).").css("color", "#27AE60");
    this.reset();
  });
});
