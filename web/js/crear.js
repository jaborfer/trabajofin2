/**
 * Created by jabor on 24/03/2017.
 */
$(document).ready(function () {
    var $loader = $("#loader");
    var $enviar = $("#enviar");
    var $usuario = $("#usuario");
    var $mail = $("#mail");
    var $pass1 = $("#pass1");
    var $pass2 = $("#pass2");
    var $respuesta = $("#resultadoBuscar");
    $loader.toggle("fast");
    $enviar.attr("disabled", "true");
    var correcto = false;
    var chknombre = true
        , chkmail = false
        , chkpass = false;
    $mail.keyup(function () {
        chkmail = ($mail.val().length>5);
        comprueba();
    });
    $("input:password").keyup(function () {

        chkpass = (($pass1.val() == $pass2.val()) && $pass1.val().length > 5);
        console.log(chkpass);
        comprueba()
    })

    function comprueba() {
        console.log("comprueba "+ ((chkmail && chknombre) && chkpass));
        console.log("mail ", chkmail);
        console.log("pass ", chkpass);
        console.log("nombre ", chknombre);
        $("#enviar").attr("disabled", !((chkmail && chknombre) && chkpass));
    }

    $usuario.blur(function () {

        $respuesta.empty();
        $loader.toggle("fast");
        var envio = {"usuario" : $usuario.val() };

        $.ajax({
            url: "comprobar.php"
            , async: true
            , type: 'post'
            , data: envio
            , timeout: 2000
            , success: function (ok) {
                if (ok == "si") {
                    $respuesta.empty().append("Usuario disponible");
                    chknombre = true;
                }
                else {
                    $respuesta.empty().append("Usuario ya usado");
                    $usuario = false;
                }
            }
            , error: function () {
                $respuesta.empty().append("Error en la comunicación con el servidor")
            }
            , complete: function () {
                $loader.toggle("fast");
            }
        });
        return false;
    });
})