var universe = { up: false, down: false, left: false, right: false };

function sendJoinsToServer() {
  // set refresh rate to send data at 10Hz
  // compress data
  var bitfield = 0x00000000; // 4 byte bitfield
  var fields = { u: 0x01, d: 0x02, l: 0x04, r: 0x08 };
  bitfield = universe.up ?
      (bitfield | fields.u) : (bitfield & ~fields.u);
  bitfield = universe.down ?
      (bitfield | fields.d) : (bitfield & ~fields.d);
  bitfield = universe.left ?
      (bitfield | fields.l) : (bitfield & ~fields.l);
  bitfield = universe.right ?
      (bitfield | fields.r) : (bitfield & ~fields.r);

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
});
