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

  // Validación simple del formulario
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
