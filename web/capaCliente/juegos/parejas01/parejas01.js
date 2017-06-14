var colores = ["#68c2d3", "#44be4d", "#be4444", "#bebe44"];

$(document).ready(function () {

  $("body").fadeIn(1000);
  var cuadrados = $(".cuadrado");
  var unaVez = 0;
  var inst1 = $(".alert-info");
  var inst2 = $(".alert-danger");
  var casillas = $(".subcuadrado.sel");
  var fallos = 0;
  var aciertos = 0;
  var anterior;
  var antpulsado;
  var aciertos = 0;
  var tiempoin = Date.now();

  asignar(casillas);

  //asignamos a todas las casillas el efecto flip-flip en modo manual
  casillas.flip({
    trigger: 'manual'
  });

  //cuando seleccionamos una casilla
  $(".subcuadrado.sel").click(function () {

    //si no hay seleccionada ninguna otra casilla
    if (unaVez == 0) {

      //si aun tiene la clase "sel" (aun no resuelta)
      if ($(this).hasClass("sel")) {
        $(this).flip(true);
        unaVez++;
        anterior = $(this).attr("data-sol");
        antpulsado = this;
      }

      //si es la 2ª casilla seleccionada
    } else if (unaVez == 1 && this != antpulsado) {

      //si el animal (data-sol) es el mismo que el de la anterior seleccionada
      if (anterior == $(this).attr("data-sol")) {
        $("[data-sol=" + anterior + "]").removeClass("sel").flip(true).css("opacity", "0.5");
        unaVez = 0;
        aciertos++;

        //si ya se han encontrado todas las parejas
        if (aciertos == 4) {
          var tiempofin = Date.now();
          var tiempousado = (tiempofin - tiempoin) / 1000;
          $(".underesult").slideDown();
          $("#solucion").css("display", "flex").append("<div>Has tardado</div><div style='font-size: 50px'> " + tiempousado + "</div><div>segundos</div>");

          //se almacena el tiempo empleado en encontrar todas las parejas
          localStorage.setItem("puntuacion", tiempousado + " segundos");
        }

        //si no son pareja, se muestran durante 2 segundos, y se da la vuelta a las casillas de nuevo
      } else {
        unaVez++;
        $(this).flip(true);
        setTimeout(function () {
          $(".subcuadrado.sel").flip(false);
          unaVez = 0;
        }, 2000);
      }
    }
  });
});

function numAzar() {
  var num = Math.floor((Math.random() * 7));
  return num;
}

//función que asigna a cada casilla una imagen
function asignar(casillas) {
  array = [];
  for (var i = 0; i < casillas.length / 2; i++) {
    array.push(i + 1);
    array.push(i + 1);
  }
  array.sort(function (a, b) {
    return 0.5 - Math.random()
  });
  var array2 = array.sort(function (a, b) {
    return 0.5 - Math.random()
  });
  for (var i = 0; i < casillas.length; i++) {
    $(casillas[i]).attr("data-sol", array[i]).children(".back").css("background", colores[array[i] - 1]).children().css('background-image', 'url(img/' + array[i] + '.png)');
  }
}
