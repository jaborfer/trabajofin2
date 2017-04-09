/**
 * Created by jabor on 24/03/2017.
 */
$(document).ready(function () {
    var $loader = $("#loader");
    var $loader2 = $("#loader2");
    var $enviar = $("#enviar");
    var $usuario = $("#usuario");
    var $mail = $("#mail");
    var $pass1 = $("#pass1");
    var $pass2 = $("#pass2");
    var $respuesta = $("#resultadoBuscar");
    var $resanadir = $("#resultadoAnadir");
    var ok;
    var envio;
    $loader.toggle("fast");
    $loader2.toggle("fast");
    $enviar.attr("disabled", "true");
    var correcto = false;
    var chknombre = false
        , chkmail = false
        , chkpass = false;
    $mail.blur(function () {
        chkmail = ($mail.val().length > 5);
        comprueba();
    });
    $("input:password").keyup(function () {

        chkpass = (($pass1.val() == $pass2.val()) && $pass1.val().length > 5);

        comprueba()
    });

    function comprueba() {
        console.log("comprobando " + chknombre);
        $("#enviar").attr("disabled", !((chkmail && chknombre) && chkpass));
    }

    $usuario.focus(function () {
        $respuesta.empty();
    });
    $usuario.blur(function () {


        $loader.toggle("fast");
        var valorUsuario = $("#usuario").val();
        envio = {"funcion": "comprobar", "usuario": valorUsuario};

        $.ajax({
            url: "../capaServer/gestionjugadores.php"
            , async: true
            , type: 'post'
            , data: envio
            , timeout: 2000
            , success: function (ok) {

                if (ok == "valido") {
                    console.log("valido");
                    $respuesta.empty().append("Usuario disponible");
                    chknombre = true;
                } else if (ok == "invalido") {
                    console.log("invalido");
                    $respuesta.empty().append("Usuario usado, elija otro");
                    chknombre = false;
                } else {
                    $respuesta.empty().append("Error");
                    chknombre = false;
                }
            }
            , error: function () {
                $respuesta.empty().append("Error en la comunicación con el servidor");
                chknombre = false;
            }
            , complete: function () {
                $loader.toggle("fast");
                comprueba();
            }
        });
    });

    $("form").submit(function () {
        $resanadir.empty();
        $loader2.toggle("fast");
        $.ajax({
            url: $("form").attr("action")
            , async: true
            , type: 'post'
            , data: $("form").serialize()
            , timeout: 2000
            , success: function ($respuesta) {
                if ($respuesta == "ok") {
                    $resanadir.empty().append("Usuario creado correctamente entrando en el panel de control");
                    timer = setTimeout(function () {
                        $(location).attr('href', "panelcontrol.html");
                    }, 3000);
                } else {
                    $resanadir.empty().append($respuesta);
                }

            }
            , error: function () {
                $resanadir.empty().append("Error en la carga AjAx, por favor recargue la página e intentelo de nuevo")
            }
            , complete: function () {
                $loader2.toggle("fast");
            }
        });
        return false;
    });
});