$(document).ready(function () {
  $("body").fadeIn(1000);
  var inst2 = $("#solucion");
  var fallos = 0;
  var aciertos = 0;
  var filas = $("[data-row]");
  var cols = $("[data-col]");
  var cond;
  var casilla;
  var exceso = 0;
  var tiempoin = Date.now();

  asignarValores(exceso);
  ocultarCasillas(10);

  $(".cuadrado").slideDown();
  $(".sel").click(function () {
    if (casillasLlenas() < 16) {
      $(".pulsador").css("visibility", "visible");
      casilla = $(this);
    }
  });
  $(".numpul").click(function () {
    $(".pulsador").css("visibility", "hidden");
    casilla.text($(this).text());
    if (casillasLlenas() == 16) {
      var correcto = true;
      for (var fila = 1; fila < 5; fila++) {
        for (var colm = 1; colm < 5; colm++) {
          if (!comprobarCasilla(fila, colm, $("[data-row=" + fila + "][data-col=" + colm + "]").text())) {
            correcto = false;
          }
        }
      }
      //si el sudoku está bien completado
      if (correcto) {
        $(".underesult").slideDown();
        localStorage.setItem("puntuacion", tiempousado + " segundos");
        var tiempofin = Date.now();
        var tiempousado = (tiempofin - tiempoin) / 1000 + " segundos.";
        inst2.slideDown().append("<div>Has tardado</div><div style='font-size: 50px'> " + tiempousado + "</div><div>segundos</div>");

        //almacena el tiempo empleado en resolverlo
        localStorage.setItem("puntuacion", tiempousado);

        //si no
      } else {
        $("#underesult").slideDown();
        inst2.slideDown().append("<div>Incorrecto</div> <div>la próxima vez será </div>");

        //almacena "no resulto"
        localStorage.setItem("puntuacion", "no resuelto");
      }
    }
  });
});

/*
 *
 * comprueba que tanto en su fila, como en su columna, como en su sección, no haya otro número igual 
 *
 */
function comprobarCasilla(fila, colm, numero) {
  cond = true;
  var sol = $("[data-row=" + fila + "][data-col=" + colm + "]").parent().attr("data-sol");
  var este = $("[data-row=" + fila + "][data-col=" + colm + "]");
  $("[data-row=" + fila + "]").each(function () {
    if (this != este[0] && $(this).text() == numero) {
      cond = false;
    }
  });
  $("[data-col=" + colm + "]").each(function () {
    if (this != este[0] && $(this).text() == numero) {
      cond = false;
    }
  });
  $("[data-sol=" + sol + "]").children().each(function () {
    if (this != este[0] && $(this).text() == numero) {
      cond = false;
    }
  });
  return cond;
}

function numAzar() {
  var num = Math.floor((Math.random() * 4) + 1);
  return num;
}

//borra num casillas, variando este número en función de la dificultad que se le de al juego
function ocultarCasillas(num) {
  for (var c = 0; c < num; c++) {
    cond = false;
    while (!cond) {
      cond = true;
      var fila = numAzar();
      var colm = numAzar();
      if ($("[data-row=" + fila + "][data-col=" + colm + "]").text() == "") {
        cond = false;
      } else {
        if (cond) $("[data-row=" + fila + "][data-col=" + colm + "]").empty().addClass("sel");
      }
    }
  }
}

//comprueba si están todas las casillas con un número en su interior
function casillasLlenas() {
  var llenos = 0;
  $(".subsub").each(function () {
    if ($(this).text() != "") llenos++;
  });
  return llenos;
}

/*
 * Asigna numeros aleatorios, comprobando a su vez que complan con las reglas, se le aplica un parametro llamado "exceso" para un posible caso en el que no existan combinaciones posibles, vuelva a empezar
 *
 * comprueba que tanto en su fila, como en su columna, como en su sección, no haya otro número igual 
 *
 */
function asignarValores(exceso) {
  var cond;
  for (var fila = 1; fila < 5; fila++) {
    for (var colm = 1; colm < 5; colm++) {
      cond = false;
      while (!cond) {
        exceso++;
        console.log(exceso);
        cond = true;
        var numero = numAzar();
        var fact = comprobarCasilla(fila, colm, numero);
        if (fact) {
          $("[data-row=" + fila + "][data-col=" + colm + "]").text(numero);
          cond = true;
        } else {
          cond = false;
        }
        if (exceso >= 120) {
          cond = true;
        }
      }
    }
  }
  if (exceso >= 120) {
    asignarValores(0);
  }
}
