/**
 * Created by jabor on 11/04/2017.
 */
$(document).ready(function () {
    var $miselect = $('#miselect');
    var $nombre = $('#nombre');
    var $juegos = $('#juegos');
    var $listarutina=$('#listarutina');
    var $respuesta = $('#respuesta');
    var $enviar = $('#botonenviar');
    var $guardarutina=$('#grabar');
    var nombrerutina;
    var listajuegos;
    var juegosrutina=[];

    creaselect();
    poncss();
    $miselect.attr("disabled", true);

    $enviar.click(function () {
        nombrerutina = $("#nombre").val();
        if (nombrerutina != "") {
            envio = {"funcion": "comprobar", "nombre": nombrerutina};

            $.ajax({
                url: "../capaServer/gestionjuegos.php"
                , async: true
                , type: 'post'
                , data: envio
                , timeout: 2000
                , success: function (ok) {

                    if (ok == "valido") {
                        $respuesta.empty().append("Nombre disponible");
                        $miselect.attr("disabled", false);
                        $guardarutina.attr("disabled", false);
                        $nombre.attr("disabled", true);
                        $enviar.attr("disabled", true);
                    } else if (ok == "invalido") {
                        $respuesta.empty().append("Nombre usado, elija otro");
                    } else {
                        $respuesta.empty().append("Error " + ok);

                    }
                }
                , error: function () {
                    $respuesta.empty().append("Error en la comunicación con el servidor");

                }
            });
        } else {
            $respuesta.empty().append("El nombre no puede estar vacio");
        }
    });

    $miselect.change(function () {
        cargaListaJuegos();
    });

    function cargaListaJuegos() {
        var seleccion = $miselect.val();
        $juegos.empty();
        $.each(listajuegos, function (index, value) {
            if (value['tipo'] == seleccion) {
                $juegos.append("<div class='cajajuego'><div class='cajajuego-cabecera'>" + value['nombre'] + "</div><div class='cajajuego-cuerpo'>" + value['descripcion'] + "</div></div>")
            }
        })
        poncss();
    }

    function creaselect() {
        envio = {"funcion": "listado", "coleccion": "juego"};
        $.ajax({
            url: "../capaServer/gestionjuegos.php"
            , async: true
            , type: 'post'
            , data: envio
            , timeout: 2000
            , success: function (listajson) {
                listajuegos = $.parseJSON(listajson);// la guardo en una variable general por que luego la lista la necesito
                var aux = [];
                $.each(listajuegos, function (index, value) {
                    if (jQuery.inArray(value["tipo"], aux) == -1) //metodo para que no se repitan los valores
                    {
                        $miselect.append("<option value='" + value["tipo"] + "'>" + value["tipo"] + "</option>");
                        aux.push(value["tipo"]);
                    }
                });
            }
            , error: function () {
                $respuesta.empty().append("Error en la comunicación con el servidor");
            }
        });
    }

    $guardarutina.click(function () {

        $listacabeceras=$('#listarutina div.cajajuego-cabecera');
        $.each($listacabeceras ,function (index,value) {
            juegosrutina.push(value.textContent);
        });
        if(juegosrutina.length==0){
            $respuesta.empty().append("la rutina no puede estar vacía");
        } else {
            envio = {"funcion": "guardar", "nombre": nombrerutina , "juegos": JSON.stringify(juegosrutina)};

            $.ajax({
                url: "../capaServer/gestionjuegos.php"
                , async: true
                , type: 'post'
                , data: envio
                , timeout: 2000
                , success: function (ok) {

                    if (ok == "correcto") {
                        $respuesta.empty().append("Rutina guardada correctamente");
                        $miselect.attr("disabled", true);
                        $juegos.empty();
                        $listarutina.empty();
                        $nombre.empty();
                        $nombre.attr("disabled", false);
                        $enviar.attr("disabled", false);
                        $guardarutina.attr("disabled", false);
                    }  else {
                        $respuesta.empty().append("Error " + ok);

                    }
                }
                , error: function () {
                    $respuesta.empty().append("Error en la comunicación con el servidor");

                }
            });
        }
    })
    // Rutinas para habilitar el cambio de columnas

    $( ".columna" ).sortable({
        connectWith: ".columna",
        handle: ".cajajuego-cabecera",
        cancel: ".cajajuego-toggle",
        placeholder: "cajajuego-placeholder ui-corner-all"
    });
    function poncss(){
    $( "#juegos .cajajuego" )
        .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
        .find( ".cajajuego-cabecera" )
        .addClass( "ui-widget-header ui-corner-all" )
        .prepend( "<span class='ui-icon ui-icon-minusthick cajajuego-toggle'></span>");

    $( "#juegos .cajajuego-toggle" ).on( "click", function() {
        var icon = $( this );
        icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
        icon.closest( ".cajajuego" ).find( ".cajajuego-cuerpo" ).toggle();
    });
        $( "#listarutina" ).on( "sortupdate", function( event, ui ) {cargaListaJuegos()} );

    $("#juegos .cajajuego-toggle").toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
    $( "#juegos .cajajuego-cuerpo" ).toggle();
    }
})
