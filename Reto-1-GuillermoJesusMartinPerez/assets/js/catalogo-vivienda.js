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

  // --- Catálogo: filtros + paginación ---
  const $items = $(".js-item");
  const pageSize = 3; // wireframe: 3 tarjetas por fila => 1 "página" demo de 3
  let currentPage = 1;
  let filtered = $items;

  function readParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      ubicacion: params.get("ubicacion") || "",
      tipo: params.get("tipo") || "",
      precioMax: params.get("precioMax") || "",
    };
  }

  function writeParams(filters) {
    const params = new URLSearchParams();
    if (filters.ubicacion) params.set("ubicacion", filters.ubicacion);
    if (filters.tipo) params.set("tipo", filters.tipo);
    if (filters.precioMax) params.set("precioMax", filters.precioMax);
    const newUrl =
      window.location.pathname +
      (params.toString() ? "?" + params.toString() : "");
    window.history.replaceState({}, "", newUrl);
  }

  function applyFilters(filters) {
    filtered = $items.filter(function () {
      const u = $(this).data("ubicacion");
      const t = $(this).data("tipo");
      const p = Number($(this).data("precio"));

      const okU = !filters.ubicacion || u === filters.ubicacion;
      const okT = !filters.tipo || t === filters.tipo;
      const okP = !filters.precioMax || p <= Number(filters.precioMax);

      return okU && okT && okP;
    });

    currentPage = 1;
    render();
  }

  function render() {
    // ocultar todo
    $items.hide();

    // paginar lo filtrado
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    const $pageItems = filtered.slice(start, end);
    $pageItems.show();

    // mensaje
    if (filtered.length === 0) {
      $("#catalogMsg")
        .text("No se han encontrado resultados con esos filtros.")
        .css("color", "#EB5757");
    } else {
      $("#catalogMsg")
        .text(`${filtered.length} resultado(s) encontrados.`)
        .css("color", "#27AE60");
    }

    // estado de botones página
    $(".js-page").removeClass("is-active");
    $(`.js-page[data-page="${currentPage}"]`).addClass("is-active");
  }

  // 1) Autorrellenar filtros desde URL
  const initial = readParams();
  if (initial.ubicacion) $("#ubicacion").val(initial.ubicacion);
  if (initial.tipo) $("#tipo").val(initial.tipo);
  if (initial.precioMax) $("#precioMax").val(initial.precioMax);

  // 2) Aplicar filtros iniciales
  applyFilters(initial);

  // 3) Submit buscador
  $("#catalogSearch").on("submit", function (e) {
    e.preventDefault();

    const filters = {
      ubicacion: $("#ubicacion").val(),
      tipo: $("#tipo").val(),
      precioMax: $("#precioMax").val(),
    };

    // Si todo vacío: mostrar todos
    $("#catalogMsg").text("").css("color", "");
    writeParams(filters);
    applyFilters(filters);
  });

  // 4) Paginación
  $(".js-page").on("click", function () {
    const page = Number($(this).data("page"));
    currentPage = page;
    render();
  });

  $(".js-prev").on("click", function () {
    if (currentPage > 1) {
      currentPage--;
      render();
    }
  });

  $(".js-next").on("click", function () {
    const maxPage = Math.max(1, Math.ceil(filtered.length / pageSize));
    if (currentPage < maxPage) {
      currentPage++;
      render();
    }
  });
});
