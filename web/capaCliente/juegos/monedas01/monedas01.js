$(document).ready(function () {
  $("body").fadeIn(1000);
  var monedas = $(".moneda");

  //array con las diferentes monedas
  var valores = [1, 2, 5, 10, 20, 50, 100, 200];
  var fallos = 0;
  var aciertos = 0;
  var total = 0;
  var tiempoin = Date.now();

  //seleccionamos 7 monedas al azar y almacenamos el dinero total que suman estas
  for (var i = 0; i < monedas.length; i++) {
    var num = numAzar();
    $(monedas[i]).attr("data-sol", valores[num]).css({
      "background": "url(img/" + valores[num] + ".gif)",
      "background-size": "contain"
    });
    total = total + valores[num];
  }

  /*
   * Al clicar en el botón, comprueba si la cantidad introducida es igual a la almacenada por la suma de monedas anteriormente,
   * en caso contrario, permite volver a intentarlo
   *
   */
  $("[type=button].btn").click(function () {
    var respuesta = parseInt($("#euros").val()) * 100 + parseInt($("#centimos").val());
    if (respuesta == total) {
      var tiempofin = Date.now();
      var tiempousado = (tiempofin - tiempoin) / 1000;
      $("div.underesult").slideDown();
      $("#solucion").css("display", "flex").append("<div>Resuelto en</div><div style='font-size: 50px;'>" + tiempousado + "</div><div>segunos</div>");
      localStorage.setItem("puntuacion", tiempousado + " segundos.");
    } else {
      $("#resol").empty().append("No es correcto, vuelve a intentarlo.").slideDown("fast");
    }
  });
});

function numAzar() {
  var num = Math.floor((Math.random() * 8));
  return num;
}
