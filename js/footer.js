"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// Open relevant popup if its button is clicked
$$("footer .popup > button").forEach(function (elem) {
  elem.onclick = function (event) {
    elem.nextElementSibling.classList.toggle("active");
  };
}); // Hide popup when clicking outside its area

$$("footer .popup > .content").forEach(function (elem) {
  elem.onmousedown = function (event) {
    // Remove active if target wasn't a child
    if (elem === event.target) elem.classList.remove("active");
  };
}); // Hide popups on Escape key

document.onkeydown = function (event) {
  if (event.key === "Escape") {
    var _$;

    (_$ = $("footer .popup > .content.active")) === null || _$ === void 0 ? void 0 : _$.classList.remove("active");
  }
};

var themeElem = $("#theme");
themeElem.checked = theme === "dark";

themeElem.onchange = function (event) {
  theme = event.target.checked ? "dark" : "light";
  setTheme();
};

var scrollElem = $("#scroll");

try {
  scrollElem.checked = localStorage.scroll === "true";
} catch (_unused) {}

scrollElem.onchange = function (event) {
  try {
    localStorage.scroll = event.target.checked;
  } catch (_unused2) {}
};

var columnsElem = $("#columns");

try {
  var _localStorage$columns;

  columnsElem.value = (_localStorage$columns = localStorage.columns) !== null && _localStorage$columns !== void 0 ? _localStorage$columns : null;
} catch (_unused3) {}

columnsElem.oninput = function (event) {
  var columns = event.target.value;
  var grid = $(".grid");
  grid.style.gridTemplateColumns = columns ? "repeat(".concat(columns, ", auto)") : null;

  try {
    localStorage.columns = columns;
  } catch (_unused4) {}
};

columnsElem.oninput({
  target: columnsElem
});
var bgInputElem = $("#background");

try {
  var _localStorage$bg;

  bgInputElem.value = (_localStorage$bg = localStorage.bg) !== null && _localStorage$bg !== void 0 ? _localStorage$bg : null;
} catch (_unused5) {}

bgInputElem.oninput = function (event) {
  var bg = event.target.value;
  [$(".grid"), $("footer")].forEach(function (elem) {
    elem.style.background = bg;
  });
  $$("footer .popup .content .body").forEach(function (elem) {
    elem.style.background = bg;
  });

  try {
    localStorage.bg = bg;
  } catch (_unused6) {}
};

bgInputElem.oninput({
  target: bgInputElem
});
var atlantica100Acre = $("#atlantica_100_acre");

try {
  atlantica100Acre.checked = localStorage.atlantica100Acre === "true";
} catch (_unused7) {}

atlantica100Acre.onchange = function (event) {
  // Lower total if setting enabled
  var value = event.target.checked ? 5 : 6;
  [$(".atlantica"), $(".hundred_acre")].forEach(function (elem) {
    elem.dataset.total = value;
  });

  try {
    localStorage.atlantica100Acre = event.target.checked;
  } catch (_unused8) {}
};

atlantica100Acre.onchange({
  target: atlantica100Acre
});
var disableShadows = $("#disable_shadows");

try {
  disableShadows.checked = localStorage.disableShadows === "true";
} catch (_unused9) {}

disableShadows.onchange = function (event) {
  var filter = event.target.checked ? "none" : null;
  $$("img").forEach(function (elem) {
    elem.style.filter = filter;
  });

  try {
    localStorage.disableShadows = event.target.checked;
  } catch (_unused10) {}
};

disableShadows.onchange({
  target: disableShadows
});
var icons = Array.from($$(".item"));
var grid = $(".grid");
var iconOrder = $("#order");

try {
  var _localStorage$order;

  iconOrder.value = (_localStorage$order = localStorage.order) !== null && _localStorage$order !== void 0 ? _localStorage$order : null;
} catch (_unused11) {}

iconOrder.oninput = function (event) {
  var order = event.target.value.trim();
  grid.innerHTML = "";
  if (order) order.split(" ").forEach(function (i) {
    return grid.appendChild(icons[i - 1]);
  });else icons.forEach(function (icon) {
    return grid.appendChild(icon);
  });

  try {
    localStorage.order = event.target.value;
  } catch (_unused12) {}
};

if (iconOrder.value) iconOrder.oninput({
  target: iconOrder
});
var iconRemove = $("#remove");

try {
  var _localStorage$remove;

  iconRemove.value = (_localStorage$remove = localStorage.remove) !== null && _localStorage$remove !== void 0 ? _localStorage$remove : null;
} catch (_unused13) {}

iconRemove.oninput = function (event) {
  var remove = event.target.value.trim().split(" ").map(function (i) {
    return parseInt(i) - 1;
  });
  grid.innerHTML = "";

  var _iterator = _createForOfIteratorHelper(icons.entries()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          index = _step$value[0],
          icon = _step$value[1];

      if (!remove.includes(index)) {
        grid.appendChild(icon);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  try {
    localStorage.remove = event.target.value;
  } catch (_unused14) {}
};

if (iconRemove.value) iconRemove.oninput({
  target: iconRemove
});

//# sourceMappingURL=footer.js.map