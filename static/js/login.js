function encrypt(x) {
  // for now, just use statically determined keys
  var public_key = 182279;
  var N = 968207;
  return Math.pow(x, public_key) % N;
}

function setPageToManual() {
  $.ajax({
    type: "GET",
    url: "/interface",
    async: true,
    success: function(response) {
      $("#content").html(response);
    },
    error: function(xhr, textStatus, errorThrown) {a
      console.log(errorThrown);
      console.log(xhr.responseText);
    }
  });
}

$(document).ready(function() {

  // submit button events
  $("#submit").mouseover(function() {
    $("body").css("cursor", "pointer");
  });

  $("#submit").mouseout(function() {
    $("body").css("cursor", "default");
  });

  $("#submit").click(function() {
    var passkey = $("#password").val();
    $("#password").val = "";
    $.ajax({
      type: "POST",
      url: "/reply",
      data: { key: passkey },
      async: true,
      success: function(response) {
        if (response == "Authentication successful") {
          console.log("Authenticated");
          $("body").css("cursor", "default");
          setPageToManual();
        } else {
          $("#password").val("");
          $("#error").html("Invalid key");
          $("#error").css("visibility", "visible");
        }
      },
      error: function(xhr, textStatus, errorThrown) {
        console.log(errorThrown);
        console.log(xhr.responseText);
      }
    });
  });

});
