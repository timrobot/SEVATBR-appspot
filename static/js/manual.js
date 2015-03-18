var universe = {
  up: false, down: false, left: false, right: false,
  lift: false, drop: false, grab: false, release: false
};

function sendJoinsToServer() {
  // set refresh rate to send data at 10Hz
  // compress data
  var bitfield = 0x00000000; // 4 byte bitfield
  var fields = {
    up: 0x01, down: 0x02, left: 0x04, right: 0x08,
    lift: 0x10, drop: 0x20, grab: 0x40, release: 0x80
  };
  bitfield = universe.up ?
    (bitfield | fields.up) : (bitfield & ~fields.up);
  bitfield = universe.down ?
    (bitfield | fields.down) : (bitfield & ~fields.down);
  bitfield = universe.left ?
    (bitfield | fields.left) : (bitfield & ~fields.left);
  bitfield = universe.right ?
    (bitfield | fields.right) : (bitfield & ~fields.right);
  bitfield = universe.lift ?
    (bitfield | fields.lift) : (bitfield & ~fields.lift);
  bitfield = universe.drop ?
    (bitfield | fields.drop) : (bitfield & ~fields.drop);
  bitfield = universe.grab ?
    (bitfield | fields.grab) : (bitfield & ~fields.grab);
  bitfield = universe.release ?
    (bitfield | fields.release) : (bitfield & ~fields.release);

  $.ajax({
    type: "POST",
    url: "/manual",
    data: { controls: bitfield },
    async: true,
    success: function(response) {
      console.log(response);
    },
    error: function(xhr, textStatus, errorThrown) { 
      console.log(errorThrown);
      console.log(xhr.response);
    }
  });
}

$(document).ready(function() {
  $(".button").mouseover(function() {
    $("body").css("cursor", "pointer");
  });
  $(".button").mouseout(function() {
    $("body").css("cursor", "default");
  });
  $("#topbutton").mousedown(function() {
    universe.up = true;
    sendJoinsToServer();
  });
  $("#topbutton").mouseup(function() {
    universe.up = false;
    sendJoinsToServer();
  });
  $("#leftbutton").mousedown(function() {
    universe.left = true;
    sendJoinsToServer();
  });
  $("#leftbutton").mouseup(function() {
    universe.left = false;
    sendJoinsToServer();
  });
  $("#rightbutton").mousedown(function() {
    universe.right = true;
    sendJoinsToServer();
  });
  $("#rightbutton").mouseup(function() {
    universe.right = false;
    sendJoinsToServer();
  });
  $("#bottombutton").mousedown(function() {
    universe.down = true;
    sendJoinsToServer();
  });
  $("#bottombutton").mouseup(function() {
    universe.down = false;
    sendJoinsToServer();
  });
  $("#stopbutton").mousedown(function() {
    universe.up = false;
    universe.left = false;
    universe.right = false;
    universe.down = false;
    sendJoinsToServer();
  });
  $("#stopbutton").mouseup(function() {
    // just in case
    universe.up = false;
    universe.left = false;
    universe.right = false;
    universe.down = false;
    sendJoinsToServer();
  });
  $("#liftbutton").mousedown(function() {
    universe.lift = true;
    sendJoinsToServer();
  });
  $("#liftbutton").mouseup(function() {
    universe.lift = false;
    sendJoinsToServer();
  });
  $("#grabbutton").mousedown(function() {
    universe.grab = true;
    sendJoinsToServer();
  });
  $("#grabbutton").mouseup(function() {
    universe.grab = false;
    sendJoinsToServer();
  });
  $("#releasebutton").mousedown(function() {
    universe.release = true;
    sendJoinsToServer();
  });
  $("#releasebutton").mouseup(function() {
    universe.release = false;
    sendJoinsToServer();
  });
  $("#dropbutton").mousedown(function() {
    universe.drop = true;
    sendJoinsToServer();
  });
  $("#dropbutton").mouseup(function() {
    universe.drop = false;
    sendJoinsToServer();
  });
  $("body").mouseup(function() {
    universe.up = false;
    universe.down = false;
    universe.left = false;
    universe.right = false;
    universe.lift = false;
    universe.drop = false;
    universe.grab = false;
    universe.release = false;
  });
});
