/**
 * Created by jabor on 04/04/2017.
 */
$(document).ready(function () {
    var $miselect = $('#miselect');
    var $loader2=$("#loader2");
    var $resactualizar=$("#resactualizar");
    var $enviar=$('#enviar');
    $enviar.attr("disabled",true);
    $loader2.toggle("fast");
    creaselect();

    $miselect.change(function () {
        $enviar.attr("disabled",false);
    });


    function creaselect() {
        envio = {"funcion": "listado"};
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
        $loader2.toggle("fast");
        jugador=$miselect.val();
        envio = {"funcion": "acceso","opciones":"standard","jugador":jugador};
        $.ajax({
            url: "../capaServer/gestionjugadores.php"
            , async: true
            , type: 'post'
            , data: envio
            , timeout: 2000
            , success: function ($respuesta) {
                if ($respuesta == "ok") {

                    window.parent.location.href = "juego.html";

                } else {
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