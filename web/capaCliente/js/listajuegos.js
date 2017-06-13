/**
 * Created by jabor on 11/04/2017.
 */
$(document).ready(function () {
  var $miselect = $('#miselect');
  var $lista = $('#lista');
  var $latabla = $('#latabla');
  var listajuegos;
  $lista.toggle("fast");
  creaselect();

  $miselect.change(function () {
    $lista.hide();
    var seleccion = $miselect.val();
    $latabla.empty();
    $latabla.append("<tr><th>nombre</th><th>descripción</th><th>foto</th></tr>");
    $.each(listajuegos, function (index, value) {
      if (value['tipo'] == seleccion) {
        var lafoto = "juegos/" + value['nombre'] + "/" + value['nombre'] + ".PNG";
        $latabla.append("<tr><td>" + value['nombre'] + "</td><td>" + value['descripcion'] + "</td><td><a target='_blank' href='" + lafoto + "'>" + "<div class='fotolistadojuego' style='background: url(" + lafoto + "); background-size: cover;  background-position: center; background-repeat: no-repeat;'></div>" + "</a></td></tr>")
      }
    });
    $lista.toggle("fast");
  });

  function creaselect() {
    envio = {
      "funcion": "listado",
      "coleccion": "juego"
    };
    $.ajax({
      url: "../capaServer/gestionjuegos.php",
      async: true,
      type: 'post',
      data: envio,
      timeout: 4000,
      success: function (listajson) {
        listajuegos = $.parseJSON(listajson); // la guardo en una variable general por que luego la lista la necesito
        var aux = [];
        $.each(listajuegos, function (index, value) {
          if (jQuery.inArray(value["tipo"], aux) == -1) //metodo para que no se repitan los valores
          {
            $miselect.append("<option value='" + value["tipo"] + "'>" + value["tipo"] + "</option>");
            aux.push(value["tipo"]);
          }
        });
      },
      error: function () {
        $respuesta.empty().append("Error en la comunicación con el servidor");
      }
    });
  }
});
