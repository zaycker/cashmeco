(function (w) {
  function init(id) {
    L.map(id).setView([51.505, -0.09], 13);
  }

  window.cashmeco = {
    init
  };
})(window);
