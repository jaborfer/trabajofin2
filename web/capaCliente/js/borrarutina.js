/**
 * Created by jabor on 29/04/2017.
 */
$(document).ready(function () {
    var $selectrutina = $('#selectrutina');
    var $resactualizar = $('#resactualizar');
    var $cargando = $('#loader');
    var $listado = $('#listado');
    var $botonborrar = $('#borrar');
    var $panelaux = $('#listajugador');
    var rutinaseleccionada;
    $cargando.toggle("fast");
    $panelaux.toggle("fast");
    crearselectrutina();


    $selectrutina.change(function () {
        rutinaseleccionada = $selectrutina.val();
        if (rutinaseleccionada == "Seleccione la rutina") {
            $panelaux.hide();
        } else {
            $cargando.show();

            var envio = {"funcion": "listado", "rutina": rutinaseleccionada};
            $listado.empty();
            $.ajax({
                url: "../capaServer/gestionjugadores.php"
                , async: true
                , type: 'post'
                , data: envio
                , timeout: 2000
                , success: function (listajson) {
                    var listarutina = $.parseJSON(listajson);
                    $.each(listarutina, function (index, value) {
                        $listado.append("<li>" + value + "</li>");
                    });
                    $panelaux.show();
                }
                , error: function () {
                    $resactualizar.empty().append("Error en la comunicación con el servidor");
                }, complete: function () {
                    $cargando.toggle("fast");
                }
            });
        }
    });

    function crearselectrutina() {
        var envio = {"funcion": "listado", "coleccion": "rutina"};
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

    $botonborrar.click(function () {
        $cargando.toggle("fast");
        var comprobacion = $("#listado li").length; //calculamos los nombres de que tienen asociado esa rutina
        var envio = {"funcion": "borrar", "rutina": rutinaseleccionada, "control": comprobacion};
        $.ajax({
            url: "../capaServer/gestionjuegos.php"
            , async: true
            , type: 'post'
            , data: envio
            , timeout: 2000
            , success: function (respuesta) {
                $resactualizar.empty().append(respuesta);
                $panelaux.hide();
            }
            , error: function () {
                $resactualizar.empty().append("Error en la comunicación con el servidor");
            }, complete: function () {
                $cargando.toggle("fast");
                crearselectrutina()
            }
        });
    });
});