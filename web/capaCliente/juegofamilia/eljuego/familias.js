var colores = ["#68c2d3", "#44be4d", "#be4444", "#bebe44"];
var listafotos=[];

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
  casillas.flip({
    trigger: 'manual'
  });
  $(".subcuadrado.sel").click(function () {
    if (unaVez == 0) {
      if ($(this).hasClass("sel")) {
        $(this).flip(true);
        unaVez++;
        anterior = $(this).attr("data-sol");
        antpulsado = this;
      }
    } else if (unaVez == 1 && this != antpulsado) {
      if (anterior == $(this).attr("data-sol")) {
        $("[data-sol=" + anterior + "]").removeClass("sel").flip(true).css("opacity", "0.5");
        unaVez = 0;
        aciertos++;
        if (aciertos == 4) {
          var tiempofin = Date.now();
          var tiempousado = (tiempofin - tiempoin) / 1000;
          $(".underesult").slideDown();
          $("#solucion").css("display", "flex").append("<div>Has tardado</div><div style='font-size: 50px'> " + tiempousado + "</div><div>segundos</div>");
          localStorage.setItem("puntuacion", tiempousado + " segundos");
        }
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

function asignar(casillas) {

    envio = {"funcion": "recuperafamilia"};
    $.ajax({
        url: '../../../capaserver/gestionjuegos.php'
        , async: true
        , type: 'post'
        , data: envio
        , timeout: 4000
        , success: function (listajson) {
            listafotos= $.parseJSON(listajson);
            var array=[];
            $.each(listafotos,function (key , value) {
                array.push(key);
            });
            array.sort(function (a, b) {
                return 0.5 - Math.random()
            });
            for (var i = 0; i < casillas.length; i++) {
                var sol=Math.trunc(parseInt(array[i].substring(4,6))/10);
                var foto= listafotos[array[i]]
                $(casillas[i]).attr("data-sol", sol).children(".back").css("background", colores[sol - 1]).children().css('background-image',"url("+ foto+")" );
            }
        }
        , error: function () {
            console.log("Error en la carga AjAx, por favor recargue la página e intentelo de nuevo")
        }
        , complete: function () {
            console.log("Completo");
        }
    });
}
