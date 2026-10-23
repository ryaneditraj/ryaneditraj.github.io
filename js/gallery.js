/*
 * PhotoSwipe 4 lightbox for the static gallery.
 * Titles are escaped before PhotoSwipe writes them with innerHTML.
 */
(function () {
  "use strict";

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[character];
    });
  }

  var figures = document.querySelectorAll("#gallery figure");
  var items = [];

  figures.forEach(function (figure) {
    var link = figure.querySelector("a");
    var image = figure.querySelector("img");
    if (!link) {
      return;
    }
    var caption = link.getAttribute("data-caption") || (image ? image.getAttribute("alt") : "") || "";
    items.push({
      src: link.getAttribute("href"),
      msrc: image ? image.getAttribute("src") : "",
      w: parseInt(link.getAttribute("data-width"), 10) || 1200,
      h: parseInt(link.getAttribute("data-height"), 10) || 900,
      title: escapeHtml(caption)
    });
  });

  figures.forEach(function (figure, index) {
    var link = figure.querySelector("a");
    if (!link) {
      return;
    }
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var pswp = document.querySelector(".pswp");
      if (!pswp || typeof PhotoSwipe !== "function" || typeof PhotoSwipeUI_Default !== "function") {
        window.location.href = link.href;
        return;
      }
      var gallery = new PhotoSwipe(pswp, PhotoSwipeUI_Default, items, {
        index: index,
        bgOpacity: 0.85,
        showHideOpacity: true
      });
      gallery.init();
    });
  });
})();
