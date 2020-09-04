"use strict";

function dispatchEvent(type, elem, offset) {
  if (socket && !elem.parentElement.dataset.userId) {
    socket.send(JSON.stringify({
      type: type,
      item: $(".icon", elem).getAttribute("src"),
      offset: offset
    }));
  }
}

function handlePrimary(event) {
  var _elem$dataset$total, _elem$dataset$level;

  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var elem = event.currentTarget;
  if (elem.classList.contains("disabled")) // If the world/item is disabled, don't do anything
    return;
  dispatchEvent("user_primary", elem, offset);
  var nobody = $(".nobody", elem);
  var total = Number((_elem$dataset$total = elem.dataset.total) !== null && _elem$dataset$total !== void 0 ? _elem$dataset$total : 1) + Boolean(nobody);
  var end = total + 1; // Change level, resetting to 0 if >total, or wrapping to the end if <0

  var level = Number((_elem$dataset$level = elem.dataset.level) !== null && _elem$dataset$level !== void 0 ? _elem$dataset$level : 0);
  if (level === 0 || $(".icon", elem).classList.contains("opaque")) // When in group, don't increase level if item unlocked for first time but already levelled
    level = (level + (end + offset) % end) % end;
  elem.dataset.level = level;
  if (nobody && level === total) // Show nobody symbol on last level
    nobody.classList.add("opaque");
  var imgNum = Math.min(level, total - Boolean(nobody));
  var group = elem.dataset.group;
  var elems = group ? $$("[data-group=\"".concat(group, "\"]"), elem.parentElement) : [elem];
  elems.forEach(function (groupElem) {
    // Change state for each item in group
    groupElem.dataset.level = level;
    var icon = elem === groupElem ? $(".icon", groupElem) : null;
    var number = $(".number", groupElem);
    var nobody = $(".nobody", groupElem);
    if (imgNum > 1) number === null || number === void 0 ? void 0 : number.setAttribute("src", "img/numbers/".concat(imgNum, ".png"));

    switch (level) {
      case 0:
        // Disable
        icon === null || icon === void 0 ? void 0 : icon.classList.remove("opaque");
        number === null || number === void 0 ? void 0 : number.classList.remove("opaque");
        nobody === null || nobody === void 0 ? void 0 : nobody.classList.remove("opaque");
        break;

      case 1:
        // First state, don't show number yet
        icon === null || icon === void 0 ? void 0 : icon.classList.add("opaque");
        number === null || number === void 0 ? void 0 : number.classList.remove("opaque");
        break;

      default:
        icon === null || icon === void 0 ? void 0 : icon.classList.add("opaque");
        number === null || number === void 0 ? void 0 : number.classList.add("opaque");
        break;
    }
  });
}

function handleSecondary(event) {
  var _secondary$dataset$in;

  var elem = event.currentTarget;
  if (elem.classList.contains("disabled")) return;
  var secondary = $(".secondary", elem);
  if (!secondary) return;
  dispatchEvent("user_secondary", elem);
  var files = secondary.dataset.files;
  if (!files) // A single image rather than an array
    return secondary.classList.toggle("opaque"); // Otherwise, parse JSON array

  files = JSON.parse(secondary.dataset.files); // Increment image index

  var index = Number((_secondary$dataset$in = secondary.dataset.index) !== null && _secondary$dataset$in !== void 0 ? _secondary$dataset$in : 0) + 1;
  if (index % (files.length + 1) === 0) index = 0;else secondary.setAttribute("src", "img/".concat(files[index - 1], ".png")); // We toggle the opaque class for 0 (disable) and 1 (enable)

  if (index < 2) secondary.classList.toggle("opaque");
  secondary.dataset.index = index;
}

function handleDisable(event) {
  var elem = event.currentTarget;
  dispatchEvent("user_disable", elem);
  elem.classList.toggle('disabled');
} // Item clicking


$$(".grid > div").forEach(function (elem) {
  elem.onmousedown = function (event) {
    switch (event.button) {
      case 0:
        // Left click
        handlePrimary(event);
        break;

      case 2:
        // Right click
        handleSecondary(event);
        break;

      case 1:
        // Middle click
        handleDisable(event);
        break;
    }
  }; // We have our own events for right click so the context menu would be intrusive


  elem.oncontextmenu = function (event) {
    return event.preventDefault();
  }; // Scroll to increment/decrement


  elem.onwheel = function (event) {
    // Check setting is on
    if (!scrollElem.checked) return; // Prevent page scroll

    event.preventDefault(); // Increment/decrement

    var offset = event.deltaY < 0 ? 1 : -1;
    handlePrimary(event, offset);
  };
});

document.body.onmousedown = function (event) {
  if (event.button === 1) // Prevent autoscroll on middle click
    return false;
};

//# sourceMappingURL=main.js.map