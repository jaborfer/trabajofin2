$(document).ready(function () {
  var canciones = ["00", "01", "02", "03"];
  var i = 0;
  var audio = document.getElementById("myAudio");

  function playAudio() {
    audio.play();
  }

  function pauseAudio() {
    audio.pause();
  }

  function reloadaudio(cancion) {
    $(audio).children().attr("src", "../music/" + cancion + ".mp3");
    audio.load();
    audio.play();
    $("#playing").css("visibility", "visible");
  }
  $("#play").click(function () {
    if ($(this).hasClass("glyphicon-play")) {
      $(this).addClass("glyphicon-stop").removeClass("glyphicon-play");
      $("#playing").css("visibility", "visible");
      playAudio();
    } else {
      $(this).addClass("glyphicon-play").removeClass("glyphicon-stop");
      pauseAudio();
      $("#playing").css("visibility", "hidden");
    }
  });
  $("#next").click(function () {
    if (i == canciones.length) {
      reloadaudio(canciones[0]);
    } else {
      i = i + 1;
      reloadaudio(canciones[i]);
    }
  });
  $("#previous").click(function () {
    if (i == 0) {
      reloadaudio(canciones[canciones.length]);
    } else {
      i = i - 1;
      reloadaudio(canciones[i]);
    }
  });
  audio.addEventListener("ended", function () {
    if (i == canciones.length) {
      reloadaudio(canciones[0]);
    } else {
      i = i + 1;
      reloadaudio(canciones[i]);
    }
  }, true);
});
