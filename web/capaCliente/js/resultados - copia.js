/**
 * Created by jabor on 04/04/2017.
 */
$(document).ready(function () {
  var $miselect = $('#miselect');
  var $loader2 = $("#loader2");
  var $resactualizar = $("#resactualizar");
  var $enviar = $('#enviar');
  var $resultados = $('#resultados');
  $enviar.attr("disabled", true);
  $loader2.slideUp("fast");
  creaselect();
  $miselect.change(function () {
    $resultados.empty();
    $enviar.attr("disabled", false);
  });

  function creaselect() {
    envio = {
      "funcion": "listado"
    };
    $.ajax({
      url: "../capaServer/gestionjugadores.php"
      , async: true
      , type: 'post'
      , data: envio
      , timeout: 2000
      , success: function (listajson) {
        var lista = $.parseJSON(listajson);
        $.each(lista, function (index, value) {
          $miselect.append("<option value='" + value + "'>" + value + "</option>");
        });
      }
      , error: function () {
        $respuesta.empty().append("Error en la comunicación con el servidor");
      }
    });
  }
  $enviar.click(function () {
    $resactualizar.empty();
    $loader2.slideDown("fast");
    jugador = $miselect.val();
    envio = {
      "funcion": "puntuacion"
      , "jugador": jugador
    };
    $.ajax({
      url: "../capaServer/gestionjuegos.php"
      , async: true
      , type: 'post'
      , data: envio
      , timeout: 2000
      , success: function ($respuesta) {
        var datos = $.parseJSON($respuesta);
        $resultados.append("<tr><th style='width: 80px;'>Jugador </th><th>Juego</th><th>Fecha</th><th>Puntuación</th></tr>");
        $resultados.append("<tr class='trnombre'><td>" + $miselect.val() + "</td><td></td><td></td><td></td></tr>");
        var juegoaux = "";
        $.each(datos, function (id, value) {
          if (value["juego"] != juegoaux) {
            juegoaux = value["juego"];
            $resultados.append("<tr><td></td><td><div class='trjuegofirst'>" + juegoaux + "</div></td><td  class='trjuego'></td><td  class='trjuego'></td></tr>");
          }
          $resultados.append("<tr><td></td><td></td><td class='pinta'>" + value['fecha'] + "</td><td class='pinta'>" + value['resultado'] + "</td></tr>");
        })
      }
      , error: function () {
        $resactualizar.empty().append("Error en la carga AjAx, por favor recargue la página e intentelo de nuevo");
      }
      , complete: function () {
        $loader2.slideUp("fast");
      }
    });
  });
});