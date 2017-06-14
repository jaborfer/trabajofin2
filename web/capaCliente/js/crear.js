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
    $loader.slideUp();
    $loader2.slideUp();
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
    $("input:password").blur(function () {
        if (!chkpass){
            $respuesta.empty().append("Las contraseñas deben coincidir y tener un mínimo de 6 caracteres");
        } else {
            $respuesta.empty();
        }
    });
    function comprueba() {

        $("#enviar").attr("disabled", !((chkmail && chknombre) && chkpass));
        if ((chkmail && chknombre) && chkpass){
    $respuesta.empty();
        }
    }

    $usuario.focus(function () {
        $respuesta.empty();
    });
    $usuario.blur(function () {
        $loader.slideDown("fast");
        var valorUsuario = $("#usuario").val();
        console.log("nombre:" + valorUsuario + ":");
        if (valorUsuario != "") {
            envio = {
                "funcion": "comprobar"
                , "usuario": valorUsuario
            };
            $.ajax({
                url: "../capaServer/gestionjugadores.php"
                , async: true
                , type: 'post'
                , data: envio
                , timeout: 4000
                , success: function (ok) {
                    if (ok == "valido") {
                        $respuesta.empty().append("Usuario disponible");
                        chknombre = true;
                    }
                    else if (ok == "invalido") {
                        console.log("invalido");
                        $respuesta.empty().append("Usuario usado, elija otro");
                        chknombre = false;
                    }
                    else {
                        $respuesta.empty().append("Error");
                        chknombre = false;
                    }
                }
                , error: function () {
                    $respuesta.empty().append("Error en la comunicación con el servidor");
                    chknombre = false;
                }
                , complete: function () {
                    $loader.slideUp("fast");
                    comprueba();
                }
            });
        } else {
            $respuesta.empty().append("El nombre no puede estar vacio");
            $loader.slideUp("fast");
            chknombre = false;
        }
    });
    $("form").submit(function () {
        $resanadir.empty();
        $loader2.slideDown("fast");
        $.ajax({
            url: $("form").attr("action")
            , async: true
            , type: 'post'
            , data: $("form").serialize()
            , timeout: 4000
            , success: function ($respuesta) {
                if ($respuesta == "ok") {
                    $resanadir.empty().append("Usuario creado correctamente entrando en el panel de control");
                    timer = setTimeout(function () {
                        $(location).attr('href', "panelcontrol.html");
                    }, 3000);
                }
                else {
                    $resanadir.empty().append($respuesta);
                }
            }
            , error: function () {
                $resanadir.empty().append("Error en la carga AjAx, por favor recargue la página e intentelo de nuevo")
            }
            , complete: function () {
                $loader2.slideUp("fast");
            }
        });
        return false;
    });
});