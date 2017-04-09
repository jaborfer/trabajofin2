/**
 * Created by jabor on 04/04/2017.
 */
$(document).ready(function () {
    var $miselect = $('#miselect');
    var $formulario = $('#formulario');
    var $edad=$('#edad');
    var $enfermedad=$('#enfermedad');
    var $notas=$('#notas');
    var $loader2=$("#loader2");
    var $resactualizar=$("#resactualizar");
    $loader2.toggle("fast");
    $formulario.hide();
    creaselect();

    $miselect.change(function () {
        cargaformulario();
        $formulario.show();

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
    function cargaformulario() {
        var jugadorseleccionado=$miselect.val();
        envio = {"funcion": "traedocumento","tipo":"jugador","jugador":jugadorseleccionado};
        $.ajax({
            url: "../capaServer/gestionjugadores.php"
            , async: true
            , type: 'post'
            , data: envio
            , timeout: 2000
            , success: function (respuestajson) {

                var respuesta = $.parseJSON(respuestajson);
                $edad.val(respuesta["edad"]);
                $enfermedad.val(respuesta["enfermedad"]);
                $notas.val(respuesta["notas"]);
            }
            , error: function () {
                $respuesta.empty().append("Error en la comunicación con el servidor");
            }
        });
    }
    $("form").submit(function () {
        $resactualizar.empty();
        $loader2.toggle("fast");
        $.ajax({
            url: $("form").attr("action")
            , async: true
            , type: 'post'
            , data: $("form").serialize()
            , timeout: 2000
            , success: function ($respuesta) {
                if ($respuesta == "ok") {
                    $formulario.hide();
                    $resactualizar.empty().append("Usuario modificado correctamente");

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
    /*$botonenviar.click(function () {
        console.log("enviado");
        $resactualizar.empty();
        $loader2.toggle("fast");
        $.ajax({
            url: "../capaServer/gestionjugadores.php"
            , async: true
            , type: 'post'
            , data: $("form").serialize()
            , timeout: 2000
            , success: function (respuesta) {
                console.log("respuesta= " + respuesta);
                if (respuesta === "ok") {
                    $divformulario.toggle("fast");
                    var jugadorseleccionado=$miselect.val();
                    $resactualizar.empty().append(jugadorseleccionado + " actualizado correctamente");

                } else {
                    console.log("error");
                    $resactualizar.empty().append($respuesta);
                }

            }
            , error: function () {
                console.log("error1");
                $resactualizar.empty().append("Error en la carga AjAx, por favor recargue la página e intentelo de nuevo")
            }
            , complete: function () {
                console.log("completado");
                $loader2.toggle("fast");
            }
        });
    });*/

});