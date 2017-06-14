$(document).ready(function () {
  $("body").fadeIn(1000);

  var $marcos = $(".marco");
  var $imagenes = $("img");
  var $letrerofin = $('#solucion');
  var movimientos = 0;
  var juegoimagenes = 10 * numAzar(6);
  var $pulsada = null;

  colocaimagenes();

  //al clicar hacemos visible la secuencia
  $("#ver").click(function () {
    $marcos.css("visibility", "visible");
    $(this).css("visibility", "hidden");
  });


  $imagenes.click(function () {
    $(this).toggleClass("seleccionado");
    if ($pulsada == null) {
      $pulsada = $(this);
      movimientos++;
    } else if ($pulsada == $(this)) {
      $pulsada = null;
    } else {
      $(this).toggleClass("seleccionado");
      $pulsada.toggleClass("seleccionado");
      var aux = $pulsada.attr("src");

      $pulsada.attr("src", $(this).attr("src"));
      $(this).attr("src", aux);
      $pulsada = null;
      if (compruebaordenado()) {
        $(".underesult").slideDown();
        $('#solucion').slideDown().append("<div>Completado en </div><div  style='font-size: 50px'>" + movimientos + " </div><div>movimientos.</div>");
        localStorage.setItem("puntuacion", "Movimientos: " + movimientos);
        console.log($letrerofin[0]);
      }
    }

  });

  //función que comprueba si las imagenes están colocadas en su sitio
  function compruebaordenado() {
    var $imagenes = $("img");
    var aux = [];
    $imagenes.each(function (index, value) {
      aux.push(value.src)
    });
    ordenado = aux.slice();
    return (JSON.stringify(ordenado.sort()) == JSON.stringify(aux))
  }

  function numAzar(semilla) {
    var num = 1 + Math.floor((Math.random() * semilla));
    return num;
  }

  //función que coloca las imagenes en orden aleatorio
  function colocaimagenes() {
    var orden = [juegoimagenes + 1, juegoimagenes + 2, juegoimagenes + 3, juegoimagenes + 4];
    do {
      orden = orden.sort(function () {
        return Math.random() - 0.5
      });
      $imagenes.each(function (index) {
        $(this).attr("src", "imagenes/" + orden[index] + ".png");

      })
    } while (compruebaordenado());
  }
});
