var universe = {
  up: false, down: false, left: false, right: false,
  lift: false, drop: false, grab: false, release: false,
  override: true
};

function sendJoinsToServer() {
  // set refresh rate to send data at 10Hz
  // compress data
  var bitfield = 0x00000000; // 4 byte bitfield
  var fields = {
    up: 0x0001, down: 0x0002, left: 0x0004, right: 0x0008,
    lift: 0x0010, drop: 0x0020, grab: 0x0040, release: 0x0080,
    override: 0x0100
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
  bitfield = universe.override ?
    (bitfield | fields.override) : (bitfield & ~fields.override);

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
  $("#topbutton").mousedown(function() {
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
    sendJoinsToServer();
  });
  $("#enable").mouseover(function() {
    $("body").css("cursor", "pointer");
  });
  $("#enable").mouseout(function() {
    $("body").css("cursor", "default");
  });
  $("#disable").mouseover(function() {
    $("body").css("cursor", "pointer");
  });
  $("#disable").mouseout(function() {
    $("body").css("cursor", "default");
  });
  $("#enable").mouseup(function() {
    universe.override = true;
    sendJoinsToServer();
  });
  $("#disable").mouseup(function() {
    universe.override = false;
    sendJoinsToServer();
  });
});
