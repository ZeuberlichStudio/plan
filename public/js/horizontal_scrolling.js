(function() {
  function scrollHorizontally(e) {
    var isTouchPad = e.wheelDeltaY ? e.wheelDeltaY === -3 * e.deltaY : e.deltaMode === 0
    if( !isTouchPad ){
      e = window.event || e;
      var delta = Math.max(-1, Math.min(1, e.wheelDeltaY));
      document.body.scrollLeft -= (delta*15); // Multiplied by 40
      e.preventDefault();
    }
  }
  if (window.addEventListener) {
      // IE9, Chrome, Safari, Opera
      window.addEventListener("mousewheel", scrollHorizontally, {passive: false});
      // Firefox
      window.addEventListener("DOMMouseScroll", scrollHorizontally, {passive: false});
  } else {
      // IE 6/7/8
      window.attachEvent("onmousewheel", scrollHorizontally);
  }
})();
