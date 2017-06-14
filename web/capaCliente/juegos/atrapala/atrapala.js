$(document).ready(function () {
  $("body").fadeIn(1000);

  var canvas = $("#myCanvas")[0];
  var context = "";

  //cuanto va a desplazarse cada movimiento
  var dx = 4;
  var dy = 4;

  //posicion inicial
  var y = 150;
  var x = 10;

  var tiempo = 52;
  var interval = setInterval(draw, tiempo);
  var nivel = 1;
  var vidas = 5;

  //funcion que repetiremos continuamente para dar la impresión de movimiento
  function draw() {
    context = myCanvas.getContext('2d');

    //dentro de este rectángulo la pelota no dejará "huella" y así parecerá un movimiento real
    context.clearRect(0, 0, 950, 500);
    context.beginPath();

    //color de la pelota
    context.fillStyle = "#0000ff";

    //tamaño de la pelota
    context.arc(x, y, 50, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();

    //cuando la posicion en uno de los 2 ejes llegue al borde, cambiará de dirección
    if (x < 0 || x > 950)
      dx = -dx;
    if (y < 0 || y > 500)
      dy = -dy;
    x += dx;
    y += dy;
  }

  //obtiene la posición del puntero del ratón
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
    var mousePos = getMousePos(evt);

    //sumamos/restamos el radio de la pelota a la posición de la pelota cuando clicó el ratón, así obtendremos el rango de coordenadas donde estaba la pelota
    var xiz = x - 50;
    var yiz = y - 50;
    var xde = x + 50;
    var yde = y + 50;

    //si el ratón clicó dentro de la pelota, subirá de nivel y velocidad, en caso contrario, se perderá una vida
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
