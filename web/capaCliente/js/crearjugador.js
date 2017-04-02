/**
 * Created by jabor on 02/04/2017.
 */
$(document).ready(function () {
    $jugador=$("#jugador");
   $loader=$("#loader");
    $loader2=$("#loader2");
   $notas=$("#notas");
   $respuesta=$("#resultadoBuscar");
   $enviar=$("#enviar");
   $edad=$("#edad");
   $enfermedad=$("#enfermedad");
   $resanadir=$("#resultadoAnadir");
   chknombre=false;
    $loader.toggle("fast");
    $loader2.toggle("fast");
   $enviar.attr("disabled",true);
   $notas.focus(function () {
       $notas.text("");
   });
   $notas.keyup(function () {
       if ($notas.text()==""){$notas.text("Notas personales sobre el jugador . . .");}
       comprueba();
   });
   $edad.blur(function () {
       comprueba();
   })
   $enfermedad.keyup(function () {
       comprueba();
   })
    $jugador.blur(function () {

        $loader.toggle("fast");
        var valorJugador= $("#jugador").val();
        envio = {"jugador": valorJugador};

        $.ajax({
            url: "../capaServer/comprobar.php"
            , async: true
            , type: 'post'
            , data: envio
            , timeout: 2000
            , success: function (ok) {

                if (ok=="valido") {
                    console.log("valido");
                    $respuesta.empty().append("Nombre disponible");
                    chknombre = true;
                } else if (ok=="invalido") {
                    console.log("invalido");
                    $respuesta.empty().append("Nombre usado, elija otro");
                    chknombre = false;
                } else {
                    $respuesta.empty().append("Error");
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
                if($respuesta=="ok"){
                    $resanadir.empty().append("Jugador creado correctamente");

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
function comprueba() {

    if (chknombre && ($enfermedad.val()!="")){
        console.log("valido");
        $enviar.attr("disabled",false);
    } else {
        console.log("invalido");
        $enviar.attr("disabled",true);}
}
});