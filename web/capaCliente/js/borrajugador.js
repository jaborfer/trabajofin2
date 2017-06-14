/**
 * Created by jabor on 04/04/2017.
 */
$(document).ready(function () {
  var $miselect = $('#miselect');
  var $formulario = $('#formulario');
  var $loader2 = $("#loader2");
  var $resborrar = $("#resborrar");
  var $boton = $("#botonrojo");
  var $aceptar = $("#aceptar");
  $boton.attr("disabled", true);
  $loader2.slideUp("fast");
  $formulario.hide();
  creaselect();
  $miselect.change(function () {
    $formulario.show();
    $boton.attr("disabled", true);
  });
  $("#aceptar").click(function () {
    $boton.attr("disabled", !$aceptar.prop('checked'));
  });

  function creaselect() {
    envio = {
      "funcion": "listado"
    };
    $.ajax({
      url: "../capaServer/gestionjugadores.php",
      async: true,
      type: 'post',
      data: envio,
      timeout: 4000,
      success: function (listajson) {
        var lista = $.parseJSON(listajson);
        $.each(lista, function (index, value) {
          $miselect.append("<option value='" + value + "'>" + value + "</option>");
        });
      },
      error: function () {
        $respuesta.empty().append("Error en la comunicación con el servidor");
      }
    });
  }
  $("form").submit(function () {
    $resborrar.empty();
    $loader2.slideDown("fast");
    $.ajax({
      url: $("form").attr("action"),
      async: true,
      type: 'post',
      data: $("form").serialize(),
      timeout: 4000,
      success: function ($respuesta) {
        if ($respuesta == "ok") {
          $formulario.hide();
          $resborrar.empty().append("Usuario borrado correctamente");
          $miselect.empty();
          creaselect();
        } else {
          $resborrar.empty().append($respuesta);
        }
      },
      error: function () {
        $resborrar.empty().append("Error en la carga AjAx, por favor recargue la página e intentelo de nuevo")
      },
      complete: function () {
        $loader2.slideUp("fast");
      }
    });
    return false;
  });

});
