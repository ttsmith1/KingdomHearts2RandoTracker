"use strict";

var socket;

function connectSocket(elem) {
  var _$;

  if (socket) // Ensure old connections are closed
    socket.close(1000);
  (_$ = $(".row.message")) === null || _$ === void 0 ? void 0 : _$.remove();
  socket = new WebSocket(undefined);
  socket.addEventListener("error", function (e) {
    var roomId = $("#room_id");
    roomId.classList.add("active");
    roomId.textContent = "Could not connect to server. (Server may be down)";
  });
}

function createPRow(elem, text) {
  var row = document.createElement("div");
  row.classList.add("row", "message");
  var p = document.createElement("p");
  p.textContent = text;
  row.appendChild(p);
  elem.insertAdjacentElement("afterend", row);
}

function findCell(msg) {
  return $("[src=\"".concat(msg.item, "\"]"), $(".grid[data-user-id=\"".concat(msg.id, "\"]"))).parentElement;
}

function messageHandler(event, elem) {
  var msg = JSON.parse(event.data);

  switch (msg.type) {
    case "room_created":
      {
        $("#room_id").innerHTML = "Created room with ID: <code>".concat(msg.id, "</code> (Give this to your teammates!)");
        break;
      }

    case "room_joined":
      {
        var room_id = msg.id;
        break;
      }

    case "user_joined":
      {
        var newGrid = $(".grid").cloneNode(true);
        newGrid.dataset.userId = msg.id;
        $("main").appendChild(newGrid);
        break;
      }

    case "user_left":
      {
        $(".grid[data-user-id=\"".concat(msg.id, "\"]")).remove();
        break;
      }

    case "error":
      {
        createPRow(elem, "Error: ".concat(msg.message));
        break;
      }

    case "user_primary":
      {
        handlePrimary({
          currentTarget: findCell(msg)
        }, msg.offset);
        break;
      }

    case "user_secondary":
      {
        handleSecondary({
          currentTarget: findCell(msg)
        });
        break;
      }

    case "user_disable":
      {
        handleDisable({
          currentTarget: findCell(msg)
        });
        break;
      }
  }
}

$("#co_op_join").onsubmit = function (event) {
  connectSocket(event.target);
  socket.addEventListener("open", function () {
    socket.send(JSON.stringify({
      type: "join_room",
      room: $("#co_op_join input").value
    }));
  });
  socket.addEventListener("message", function (e) {
    return messageHandler(e, event.target);
  });
  return false;
};

$("#co_op_create").onsubmit = function (event) {
  connectSocket(event.target);
  var size = parseInt($("#co_op_create input").value);

  if (!size) {
    createPRow(event.target, "Invalid or no size given, using default of 2.");
    size = 2;
  }

  var roomId = $("#room_id");
  roomId.classList.add("active");
  roomId.textContent = "Creating room...";
  socket.addEventListener("open", function () {
    socket.send(JSON.stringify({
      type: "create_room",
      size: size
    }));
  });
  socket.addEventListener("message", function (e) {
    return messageHandler(e, event.target);
  });
  return false;
};

var coOpColumnsElem = $("#co_op_columns");

try {
  var _localStorage$coOpCol;

  coOpColumnsElem.value = (_localStorage$coOpCol = localStorage.coOpColumns) !== null && _localStorage$coOpCol !== void 0 ? _localStorage$coOpCol : null;
} catch (_unused) {}

coOpColumnsElem.oninput = function (event) {
  var columns = event.target.value;
  var main = $("main");
  main.style.gridTemplateColumns = columns ? "repeat(".concat(columns, ", auto)") : null;

  try {
    localStorage.coOpColumns = columns;
  } catch (_unused2) {}
};

coOpColumnsElem.oninput({
  target: coOpColumnsElem
});

//# sourceMappingURL=co_op.js.map