$(document).ready(function () {
  $("body").fadeIn(1000);

  /*
  $("#ver").click(function () {
    if (unaVez) {
      cuadrados.css("visibility", "visible");
      unaVez = false;
      $(this).attr("disabled", true);
      setTimeout(function () {
        inst1.css("visibility", "hidden");
        //cuadrados.css("visibility", "hidden");
        cuadrados.addClass("sel");
        cuadrados.children().removeClass("on");
        inst2.css("visibility", "visible");
        $(".sel").children().click(function () {
          var numsub = $(this).attr("data-sol");
          var numcua = $(this).parent().attr("data-sol");
          if (numcua == numsub && !$(this).hasClass("done")) {
            aciertos++;
            $(this).addClass("done").css("background", "#44c353").append("<div class='glyphicon glyphicon-ok'></div>");
            $(this).siblings().addClass("done");
            $(this).parent().removeClass("sel");
            if (aciertos == cuadrados.length) {
              $("div.underesult").slideDown();
              $(".result").append("<div>Completado con</div><div style='font-size: 50px'>" + fallos + "</div><div>errores</div>").css("display", "flex");
              localStorage.setItem("puntuacion", fallos + " fallos");
            }
          } else if (!$(this).hasClass("done")) {
            fallos++;
            $(this).addClass("done").css("background", "#ac3c3c").append("<div class='glyphicon glyphicon-remove'></div>");
          }
        });
      }, 3000);
    }
  });
  */
  var canvas = $("#myCanvas")[0];
  var context = "";
  var dx = 4;
  var dy = 4;
  var y = 150;
  var x = 10;
  var tiempo = 52;
  var interval = setInterval(draw, tiempo);
  var nivel = 1;
  var vidas = 5;

  function draw() {
    context = myCanvas.getContext('2d');
    context.clearRect(0, 0, 950, 500);
    context.beginPath();
    context.fillStyle = "#0000ff";
    context.arc(x, y, 50, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
    if (x < 0 || x > 950)
      dx = -dx;
    if (y < 0 || y > 500)
      dy = -dy;
    x += dx;
    y += dy;
  }

  /*function getMousePos(myCanvas, evt) {
    var rect = myCanvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }*/

  function getMousePos(e) {
    var mouseX, mouseY;

    if (e.offsetX) {
      mouseX = e.offsetX;
      mouseY = e.offsetY;
    } else if (e.layerX) {
      mouseX = e.layerX;
      mouseY = e.layerY;
    }
    return {
      x: mouseX,
      y: mouseY
    };

  }
  canvas.addEventListener('click', function (evt) {
    console.log("holiii");
    var mousePos = getMousePos(evt);
    var xiz = x - 50;
    var yiz = y - 50;
    var xde = x + 50;
    var yde = y + 50;
    //alert('Mouse position: ' + mousePos.x + ',' + mousePos.y + '---------------------- Bola position: ' + xiz + "-" + xde + '  ,  ' +
    //yiz + "-" + yde);
    if (mousePos.x <= xde && mousePos.x >= xiz && mousePos.y <= yde && mousePos.y >= yiz) {
      clearInterval(interval);
      nivel++;
      tiempo -= 4;
      $(canvas).css("opacity", "0.5");
      $("#nivel").empty().slideDown().append("Nivel " + nivel);
      setTimeout(function () {
        interval = setInterval(draw, tiempo);
        $(canvas).css("opacity", "1");
        $("#nivel").slideUp("fast");
      }, 1000);
    } else {
      vidas--;
      $("#vidas").attr("src", "img/vidas" + vidas + ".png");
      if (vidas == 0) {
        $("div.underesult").slideDown("fast");
        $("#solucion").empty().append("<div>Llegaste al nivel</div><div style='font-size: 50px'>" + nivel + "</div>").css("display", "flex");
        localStorage.setItem("puntuacion", "nivel" + nivel);
      }
    }
  }, false);

});
