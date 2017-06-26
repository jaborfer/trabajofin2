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
  $cargando.slideUp("fast");
  $panelaux.slideUp("fast");
  crearselectrutina();

  $selectrutina.change(function () {
    rutinaseleccionada = $selectrutina.val();
    if (rutinaseleccionada == "0") {
      $panelaux.slideUp();
    } else {
      $cargando.show();
      var envio = {
        "funcion": "listado",
        "rutina": rutinaseleccionada
      };
      $listado.empty();
      $.ajax({
        url: "../capaServer/gestionjugadores.php",
        async: true,
        type: 'post',
        data: envio,
        timeout: 4000,
        success: function (listajson) {
          $("#enviar").slideUp();
          var listajugadores = $.parseJSON(listajson);
          var numjugadores = 0;
          $.each(listajugadores, function (index, value) {
            $listado.append("<li class='centadoh'>" + value + "</li>");
            numjugadores++;
          });
          console.log(numjugadores);
          if (numjugadores == 0) {
            console.log("entra");
            $("#mensaje1").empty().append("<p>Ningún jugador tiene esea rutina asignada</p>");
            $("#mensaje2").empty();
          } else {
            $("#mensaje1").empty().append("Los siguientes jugadores tienen asignada esa rutina:");
            $("#mensaje2").empty().append("Estos jugadores se quedarán sin rutina asociada");
          }
          $panelaux.slideDown();
        },
        error: function () {
          $resactualizar.empty().append("Error en la comunicación con el servidor");
        },
        complete: function () {
          $cargando.toggle("fast");
        }
      });
    }
  });

  function crearselectrutina() {
    $selectrutina.empty();
    $selectrutina.append("<option value='0'>Seleccione la rutina</option>");
    var envio = {
      "funcion": "listado",
      "coleccion": "rutina"
    };
    $.ajax({
      url: "../capaServer/gestionjuegos.php",
      async: true,
      type: 'post',
      data: envio,
      timeout: 4000,
      success: function (listajson) {
        var listarutina = $.parseJSON(listajson);
        $.each(listarutina, function (index, value) {
          $selectrutina.append("<option value='" + value["nombre"] + "'>" + value["nombre"] + "</option>");
        });
      },
      error: function () {
        $resactualizar.empty().append("Error en la comunicación con el servidor");
      }
    });
  }
  $botonborrar.click(function () {
    $cargando.toggle("fast");
    var comprobacion = $("#listado li").length; //calculamos los nombres de que tienen asociado esa rutina
    var envio = {
      "funcion": "borrar",
      "rutina": rutinaseleccionada,
      "control": comprobacion
    };
    $.ajax({
      url: "../capaServer/gestionjuegos.php",
      async: true,
      type: 'post',
      data: envio,
      timeout: 4000,
      success: function (respuesta) {
        $resactualizar.empty().append(respuesta);
        $panelaux.slideUp();
      },
      error: function () {
        $resactualizar.empty().append("Error en la comunicación con el servidor");
      },
      complete: function () {
        $cargando.toggle("fast");
        crearselectrutina();
      }
    });
  });
});
