/**
 * Created by jabor on 24/03/2017.
 */
$(document).ready(function () {
  var $loader2 = $("#loader2");
  var $enviar = $("#enviar");
  var $mail = $("#mail");
  var $pass1 = $("#pass1");
  var $pass2 = $("#pass2");
  var $resmodificar = $("#resultadomodificar");
  var ok;
  var envio;
  var correcto = true;
  var chkmail = true;
  var chkpass = true;
  cargadatos();
  $mail.keyup(function () {
    chkmail = ($mail.val().length > 5);
    comprueba();
  });
  $("input:password").keyup(function () {
    chkpass = (($pass1.val() == $pass2.val()) && $pass1.val().length > 5);
    comprueba()
  });

  function cargadatos() {
    envio = {
      "funcion": "traedocumento"
      , "tipo": "cuidador"
    };
    $.ajax({
      url: "../capaServer/gestionjugadores.php"
      , async: true
      , type: 'post'
      , data: envio
      , timeout: 4000
      , success: function (respuestajson) {
        var respuesta = $.parseJSON(respuestajson);
        $mail.val(respuesta["mail"]);
        $pass1.val(respuesta["pass"]);
        $pass2.val(respuesta["pass"]);
      }
      , error: function () {
        $respuesta.empty().append("Error en la comunicación con el servidor");
      }
    });
  }

  function comprueba() {
    $("#enviar").attr("disabled", !(chkmail && chkpass));
  }
  $("form").submit(function () {
    $resmodificar.empty();
    $loader2.slideDown("fast");
    $.ajax({
      url: $("form").attr("action")
      , async: true
      , type: 'post'
      , data: $("form").serialize()
      , timeout: 4000
      , success: function ($respuesta) {
        if ($respuesta == "ok") {
          $resmodificar.empty().append("Usuario modificado correctamente");
          $("form").slideDown("fast");
        }
        else {
          $resmodificar.empty().append($respuesta);
        }
      }
      , error: function () {
        $resmodificar.empty().append("Error en la carga AjAx, por favor recargue la página e intentelo de nuevo")
      }
      , complete: function () {
        $loader2.slideUp("fast");
      }
    });
    return false;
  });
});