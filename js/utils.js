"use strict";

function $(selector, el) {
  if (!el) el = document;
  return el.querySelector(selector);
}

function $$(selector, el) {
  if (!el) {
    el = document;
  }

  return el.querySelectorAll(selector);
}

//# sourceMappingURL=utils.js.map