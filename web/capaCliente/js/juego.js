/**
 * Created by jabor on 02/05/2017.
 */
$(document).ready(function () {
    var $boton = $('#boton');
    var $cargando = $('#loader');
    var $respuesta = $('#respuesta');
    var listajuegos = [];
    var juegoactivo = 0;
    var puntuacion;
    localStorage.setItem("punuacion", "-1");

    $cargando.toggle("fast");
    $boton.attr("disabled", true);
    traejuegos();

    function traejuegos() {
        $cargando.toggle("fast");
        envio = {"funcion": "traejuegos"};
        $.ajax({
            url: "../capaServer/gestionjuegos.php"
            , async: true
            , type: 'post'
            , data: envio
            , timeout: 2000
            , success: function (listajson) {
                listajuegos = $.parseJSON(listajson);
                $boton.attr("disabled", false);
            }
            , error: function () {
                $respuesta.empty().append("Error en la comunicación con el servidor");
            }, complete: function () {
                $cargando.toggle("fast");
            }
        });
    }

    $boton.click(function () {
        if((juegoactivo>0) && (juegoactivo < listajuegos.length)){
        puntuacion = localStorage.getItem("puntuacion");
        guardapuntos();
        localStorage.setItem("puntuacion", "-1");
        } else {
            $boton.empty().append("Siguente");
        }
        if (juegoactivo < listajuegos.length) {
            var nombrejuego = listajuegos[juegoactivo];
            var direccion = "juegos/" + nombrejuego + "/" + nombrejuego + ".html";
            $boton.attr("href", direccion);
            $boton.hide();
            setTimeout(function() {
                $boton.show();
            },5000);
        } else if (juegoactivo = listajuegos.length) {
            $boton.attr("href", "juegos/gracias.html");
            $boton.hide();
            setTimeout(function() {
                $boton.show();
            },5000);
        } else {
            $boton.hide();
        }
        juegoactivo++;

    });

    function guardapuntos() {
        $cargando.toggle("fast");
        var eljuego=listajuegos[juegoactivo-1];
        envio = {"funcion": "guardar","juego":eljuego,"puntuacion":puntuacion};
        $.ajax({
            url: "../capaServer/gestionjuegos.php"
            , async: true
            , type: 'post'
            , data: envio
            , timeout: 2000
            , success: function (comprueba) {
                if(comprueba!="correcto"){
                    $respuesta.empty().append("Error al guardar los puntos");
                }
            }
            , error: function () {
                $respuesta.empty().append("Error en la comunicación con el servidor");
            }, complete: function () {
                $cargando.toggle("fast");
            }
        });
    }
})