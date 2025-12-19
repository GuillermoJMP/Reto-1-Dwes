$(function () {
  // Menú responsive (móvil)
  $(".js-nav-toggle").on("click", function () {
    const $nav = $(".js-nav");
    const isOpen = $nav.toggleClass("is-open").hasClass("is-open");
    $(this).attr("aria-expanded", isOpen);
  });

  // Cerrar menú al clicar un enlace (móvil)
  $(".js-nav .nav__link").on("click", function () {
    $(".js-nav").removeClass("is-open");
    $(".js-nav-toggle").attr("aria-expanded", "false");
  });

  // Buscador del index -> redirige a catalogo-vivienda con parámetros
  $("#searchForm").on("submit", function (e) {
    e.preventDefault();

    const ubicacion = $("#ubicacion").val();
    const tipo = $("#tipo").val();
    const precioMax = $("#precioMax").val();

    if (!ubicacion && !tipo && !precioMax) {
      $("#searchMsg")
        .text("Selecciona al menos un filtro para buscar.")
        .css("color", "#EB5757");
      return;
    }

    $("#searchMsg").text("").css("color", "");

    const params = new URLSearchParams();
    if (ubicacion) params.append("ubicacion", ubicacion);
    if (tipo) params.append("tipo", tipo);
    if (precioMax) params.append("precioMax", precioMax);

    window.location.href = "catalogo-vivienda.html?" + params.toString();
  });
});
