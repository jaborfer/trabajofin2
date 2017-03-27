/**
 * Created by jabor on 24/03/2017.
 */
$(document).ready(function () {
    var $loader2 = $("#loader2");
    var $usuario = $("#usuario");
    var $pass1 = $("#pass1");
    var $resLogin = $("#resultadologin");
    $loader2.toggle("fast");

    $usuario.focus(function (){
        $resLogin.empty();
    })
    $pass1.focus(function (){
        $resLogin.empty();
    })

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
                if($respuesta=="ok"){
                    $resanadir.empty().append("Usuario correcto");
                    timer = setTimeout(function () {
                        $(location).attr('href',"panelcontrol.html");
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