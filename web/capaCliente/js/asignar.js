/**
 * Created by jabor on 04/04/2017.
 */
$(document).ready(function () {
    var $selectjugador = $('#selectjugador');
    var $selectrutina = $('#selectrutina');
    //var $loader2 = $("#loader");
    var $resactualizar = $("#resactualizar");
    var $enviar = $("#enviar");
    var jugadorseleccionado;
    //$loader2.slideUp("fast");
    $selectrutina.attr("disabled", true);
    $enviar.attr("disabled", true);
    creaselectjugador();
    crearselectrutina();

    $selectjugador.change(function () {
        traerutinadeljugador();
        $selectrutina.attr("disabled", false);
    });

    function traerutinadeljugador() {
        jugadorseleccionado = $selectjugador.val();
        envio = {
            "funcion": "traedocumento"
            , "tipo": "jugador"
            , "jugador": jugadorseleccionado
        };
        $.ajax({
            url: "../capaServer/gestionjugadores.php"
            , async: true
            , type: 'post'
            , data: envio
            , timeout: 2000
            , success: function (respuestajson) {
                var respuesta = $.parseJSON(respuestajson);
                $("#selectrutina option").filter(function () {
                    return $(this).text() == respuesta["rutina"];
                }).prop('selected', true);
                $enviar.attr("disabled", false);
            }
            , error: function () {
                $resactualizar.empty().append("Error en la comunicación con el servidor");
            }
        });
    }

    function creaselectjugador() {
        var envio = {
            "funcion": "listado"
        };
        $.ajax({
            url: "../capaServer/gestionjugadores.php"
            , async: true
            , type: 'post'
            , data: envio
            , timeout: 2000
            , success: function (listajson) {
                var lista = $.parseJSON(listajson);
                $.each(lista, function (index, value) {
                    $selectjugador.append("<option value='" + value + "'>" + value + "</option>");
                });
            }
            , error: function () {
                $resactualizar.empty().append("Error en la comunicación con el servidor");
            }
        });
    }

    function crearselectrutina() {
        var envio = {
            "funcion": "listado"
            , "coleccion": "rutina"
        };
        $.ajax({
            url: "../capaServer/gestionjuegos.php"
            , async: true
            , type: 'post'
            , data: envio
            , timeout: 2000
            , success: function (listajson) {
                var listarutina = $.parseJSON(listajson);
                $.each(listarutina, function (index, value) {
                    $selectrutina.append("<option value='" + value["nombre"] + "'>" + value["nombre"] + "</option>");
                });
            }
            , error: function () {
                $resactualizar.empty().append("Error en la comunicación con el servidor");
            }
        });
    }

    $enviar.click(function () {
        var rutinaseleccionada = $selectrutina.val();
        var envio = {
            "funcion": "actualizarrutina"
            , "jugador": jugadorseleccionado
            , "rutina": rutinaseleccionada
        };
        $.ajax({
            url: "../capaServer/gestionjugadores.php"
            , async: true
            , type: 'post'
            , data: envio
            , timeout: 2000
            , success: function (respuesta) {
                $selectjugador.attr("disabled", false);
                $selectrutina.attr("disabled", true);
                $enviar.attr("disabled", true);
                if (respuesta == "ok") {
                    $resactualizar.empty().append("actualizado correctamente");
                }
                else {
                    $resactualizar.empty().append("error al actualizar, codigo" + respuesta);
                }
            }
            , error: function () {
                $resactualizar.empty().append("Error en la comunicación con el servidor");
            }
        });
    });
});
