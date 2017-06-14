
$(document).ready(function () {

    var $resanadir= $('#respuesta');
    var $selectjugador = $('#selectjugador');
    creaselectjugador();

    $("form").submit(function () {
        $resanadir.empty();
        $loader2.slideDown("fast");
        $.ajax({
            url: $("form").attr("action")
            , async: true
            , type: 'post'
            , data: $("form").serialize()
            , timeout: 2000
            , success: function ($respuesta) {
                if ($respuesta == "ok") {
                    $resanadir.empty().append("Datos guardados correctamente");
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

    function creaselectjugador() {
        var envio = {
            "funcion": "listado"
        };
        $.ajax({
            url: "../../capaServer/gestionjugadores.php"
            , async: true
            , type: 'post'
            , data: envio
            , timeout: 2000
            , success: function (listajson) {
                console.log("ok");
                var lista = $.parseJSON(listajson);
                $.each(lista, function (index, value) {
                    $selectjugador.append("<option value='" + value + "'>" + value + "</option>");
                });
            }
            , error: function () {
                console.log("error");
                $resanadir.empty().append("Error en la comunicación con el servidor");
            }
        });
    }
    /**
     * Created by jabor on 03/06/2017.
     */
});