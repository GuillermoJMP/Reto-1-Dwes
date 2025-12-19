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
});
