#How to use:

```javascript
  (function(w, d, p) {
    var s = d.createElement('script'),
      tsId = 'cashmeco_' + +new Date();
    s.onload = function() { w.chashmeco.init(tsId); }
    s.src = p;
    d.querySelector('head').appendChild(s);
    document.write('<div id="' + tsId + '"></div>');
  })(window, document, '/PATH_TO_LOADER.js');
```;
