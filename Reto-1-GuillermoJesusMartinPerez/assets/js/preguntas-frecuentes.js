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

  // Acordeón FAQ (abre/cierra y cambia + / −)
  $(".js-faq-toggle").on("click", function () {
    const $item = $(this).closest(".js-faq");
    const $body = $item.find(".js-faq-body");
    const isOpen = $item.hasClass("is-open");

    // Cierra los demás (comportamiento típico de FAQ)
    $(".js-faq")
      .not($item)
      .removeClass("is-open")
      .find(".js-faq-body")
      .stop(true, true)
      .slideUp(180);
    $(".js-faq").not($item).find(".faq-item__btn").text("+");
    $(".js-faq")
      .not($item)
      .find(".js-faq-toggle")
      .attr("aria-expanded", "false");

    if (isOpen) {
      $item.removeClass("is-open");
      $body.stop(true, true).slideUp(180);
      $(this).attr("aria-expanded", "false");
      $(this).find(".faq-item__btn").text("+");
    } else {
      $item.addClass("is-open");
      $body.stop(true, true).slideDown(180);
      $(this).attr("aria-expanded", "true");
      $(this).find(".faq-item__btn").text("−");
    }
  });
});
