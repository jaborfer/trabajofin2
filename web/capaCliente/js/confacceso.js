/**
 * Created by jabor on 04/04/2017.
 */
$(document).ready(function () {
  var $miselect = $('#miselect');
  var $formulario = $('#formulario');
  var $loader2 = $("#loader2");
  var $resactualizar = $("#resactualizar");
  var $enviar = $('#enviar');
  $enviar.attr("disabled", true);
  $miselect.attr("disabled", true)
  $loader2.slideUp("fast");
  creaselect();
  $miselect.change(function () {
    $enviar.attr("disabled", false);
  });
  $("#juegos").click(function () {
    $miselect.attr("disabled", false);
    $enviar.attr("disabled", true);
  });
  $("#standard").click(function () {
    $miselect.attr("disabled", true);
    $enviar.attr("disabled", false);
  })

  function creaselect() {
    envio = {
      "funcion": "listado"
    };
    $.ajax({
      url: "../capaServer/gestionjugadores.php"
      , async: true
      , type: 'post'
      , data: envio
      , timeout: 4000
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
  $("form").submit(function () {
    $resactualizar.empty();
    $loader2.slideDown("fast");
    $.ajax({
      url: $("form").attr("action")
      , async: true
      , type: 'post'
      , data: $("form").serialize()
      , timeout: 4000
      , success: function ($respuesta) {
        if ($respuesta == "ok") {
          $formulario.hide();
          $resactualizar.empty().append("Acceso modificado correctamente");
        }
        else {
          $resactualizar.empty().append($respuesta);
        }
      }
      , error: function () {
        $resactualizar.empty().append("Error en la carga AjAx, por favor recargue la página e intentelo de nuevo")
      }
      , complete: function () {
        $loader2.toggle("fast");
      }
    });
    return false;
  });

});