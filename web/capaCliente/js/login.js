/**
 * Created by jabor on 24/03/2017.
 */
$(document).ready(function () {
  var $loader2 = $("#loader2");
  var $usuario = $("#usuario");
  var $pass1 = $("#pass1");
  var $resLogin = $("#resultadologin");
  var $enviar = $("#enviar");
  var $recuperar = $("#recuperacion");
  $loader2.slideUp("fast");
  $usuario.focus(function () {
    $resLogin.empty();
  });
  $pass1.focus(function () {
    $resLogin.empty();
  });
  $enviar.click(function () {
    $resLogin.empty();
    $loader2.slideDown("fast");
    $.ajax({
      url: "../capaServer/gestionjugadores.php"
      , async: true
      , type: 'post'
      , data: $("form").serialize()
      , timeout: 4000
      , success: function ($respuesta) {
        if ($respuesta == "ok") {
          $resLogin.empty().append("Usuario correcto");
          var timer = setTimeout(function () {
            $(location).attr('href', "panelcontrol.html");
          }, 1000);
        }
        else {
          $resLogin.empty().append($respuesta);
        }
      }
      , error: function () {
        $resLogin.empty().append("Error en la carga AjAx, por favor recargue la página e intentelo de nuevo");
      }
      , complete: function () {
        $loader2.slideUp("fast");
      }
    });
    return false;
  });
  $recuperar.click(function () {
    $("#formport").slideUp("fast");
    $.ajax({
      url: "recuperarpass.html"
      , async: true
      , success: function (html) {
        $("#formport").empty().slideDown("fast").append(html);
      }
      , error: function () {
        $("#formport").empty().slideDown("fast").append("<div class='alert alert-danger'>Ha ocurrido algún error, pruebe otra vez.</div>").removeClass("hidden");
      }
      , complete: function () {
        $(".alert-success").remove();
        //$("#loader").slideUp();
      }
    });
  });
});