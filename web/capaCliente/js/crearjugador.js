/**
 * Created by jabor on 02/04/2017.
 */
$(document).ready(function () {
    $jugador = $("#jugador");
    $loader = $("#loader");
    $loader2 = $("#loader2");
    $notas = $("#notas");
    $respuesta = $("#resultadoBuscar");
    $enviar = $("#enviar");
    $edad = $("#edad");
    $divformulario = $("#formulario");
    $enfermedad = $("#enfermedad");
    $resanadir = $("#resultadoAnadir");
    $listado = $("#listado");
    chknombre = false;
    $loader.toggle("fast");
    $loader2.toggle("fast");
    $enviar.attr("disabled", true);
    $notas.focus(function () {
        $notas.text("");
    });
    $notas.keyup(function () {
        if ($notas.text() == "") {
            $notas.text("Notas personales sobre el jugador . . .");
        }
        comprueba();
    });
    $edad.blur(function () {
        comprueba();
    });
    $enfermedad.keyup(function () {
        comprueba();
    });
    $jugador.blur(function () {

        $loader.toggle("fast");
        var valorJugador = $("#jugador").val();
        envio = {"funcion": "comprobar","jugador": valorJugador};

        $.ajax({
            url: "../capaServer/gestionjugadores.php"
            , async: true
            , type: 'post'
            , data: envio
            , timeout: 2000
            , success: function (ok) {

                if (ok == "valido") {
                    $respuesta.empty().append("Nombre disponible");
                    chknombre = true;
                } else if (ok == "invalido") {
                    $respuesta.empty().append("Nombre usado, elija otro");
                    chknombre = false;
                } else {
                    $respuesta.empty().append("Error "+ok);
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
                    $divformulario.toggle("fast");
                    var valorJugador = $("#jugador").val();
                    $resanadir.empty().append(valorJugador + " creado correctamente");
                    listadojugadores();

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
    function listadojugadores() {
        envio = {"funcion": "listado"};
        $.ajax({
            url: "../capaServer/gestionjugadores.php"
            , async: true
            , data: envio
            , type: 'post'
            , timeout: 2000
            , success: function (listajson) {
                var lista = $.parseJSON(listajson);
                $listado.append('<p>Los jugadores creados son:</p>');
                $listado.append('<ul>');
                $.each(lista, function (index, value) {
                    $listado.append("<li>" + value + "</li>");
                });
                $listado.append('</ul>');
            }
            , error: function () {
                $respuesta.empty().append("Error en la comunicación con el servidor");
                chknombre = false;
            }
        });
    }
    function comprueba() {

        if (chknombre && ($enfermedad.val() != "")) {
            $enviar.attr("disabled", false);
        } else {
            $enviar.attr("disabled", true);
        }
    }
});