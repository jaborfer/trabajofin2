/**
 * Created by jabor on 11/04/2017.
 */
$(document).ready(function () {
  var $mirutina = $('#mirutina');
  var $miselect = $('#miselect');
  var $nombre = $('#nombre');
  var $juegos = $('#juegos');
  var $listarutina = $('#listarutina');
  var $respuesta = $('#respuesta');
  var $guardarutina = $('#grabar');
  var $cargando = $('#loader');
  var nombrerutina;
  var rutinasguardadas;
  var listajuegos = [];
  var juegosrutina = [];
  $cargando.slideUp("fast");
  creamirutina();
  creaselect();
  $miselect.attr("disabled", true);
  $guardarutina.attr("disabled", true);
  $mirutina.change(function () {
    $listarutina.empty();
    $miselect.attr("disabled", false).val("");
    nombrerutina = $mirutina.val();
    var juegosderutina = [];
    $.each(rutinasguardadas, function (index, value) {
      if (value['nombre'] == nombrerutina) {
        juegosderutina = JSON.parse(value['juegos']);
        return false; //para no recorrer todo el bucle, una vez que encuentra el valor se sale
      }
    });
    $.each(juegosderutina, function (index, value) {
      var aux = 0;
      while (listajuegos[aux].nombre != value) {
        aux++
      } //localizamos la posición del objeto que tiene un atributo "nombre"= al buscado
      $listarutina.append("<div class='cajajuego'><div class='cajajuego-cabecera'>" + value + "</div><div class='cajajuego-cuerpo'>" + listajuegos[aux].descripcion + "</div></div>")
    });
    poncss($listarutina);
  });
  $miselect.change(function () {
    $guardarutina.attr("disabled", false);
    cargaListaJuegos();
  });

  function cargaListaJuegos() {
    var seleccion = $miselect.val();
    $juegos.empty();
    $.each(listajuegos, function (index, value) {
      if (value['tipo'] == seleccion) {
        $juegos.append("<div class='cajajuego'><div class='cajajuego-cabecera'>" + value['nombre'] + "</div><div class='cajajuego-cuerpo'>" + value['descripcion'] + "</div></div>")
      }
    });
    poncss($juegos);
  }

  function creaselect() {
    $cargando.slideDown("fast");
    envio = {
      "funcion": "listado"
      , "coleccion": "juego"
    };
    $.ajax({
      url: "../capaServer/gestionjuegos.php"
      , async: true
      , type: 'post'
      , data: envio
      , timeout: 2000
      , success: function (listajson) {
        listajuegos = $.parseJSON(listajson); // la guardo en una variable general por que luego la lista la necesito
        console.log(listajuegos);
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
      , complete: function () {
        $cargando.slideUp("fast");
      }
    });
  }

  function creamirutina() {
    $cargando.slideDown("fast");
    envio = {
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
        rutinasguardadas = $.parseJSON(listajson);
        $mirutina.empty();
        $mirutina.append("<option value=''>Seleccione la rutina</option>");
        $.each(rutinasguardadas, function (index, value) {
          $mirutina.append("<option value='" + value["nombre"] + "'>" + value["nombre"] + "</option>");
        });
      }
      , error: function () {
        $respuesta.empty().append("Error en la comunicación con el servidor");
      }
      , complete: function () {
        $cargando.slideUp("fast");
      }
    });
  }
  $guardarutina.click(function () {
    juegosrutina.length = 0;
    $listacabeceras = $('#listarutina div.cajajuego-cabecera');
    $.each($listacabeceras, function (index, value) {
      juegosrutina.push(value.textContent);
    });
    if (juegosrutina.length == 0) {
      $respuesta.empty().append("la rutina no puede estar vacía");
    }
    else {
      $cargando.slideDown("fast");
      envio = {
        "funcion": "actualizar"
        , "nombre": nombrerutina
        , "juegos": JSON.stringify(juegosrutina)
      };
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
            $guardarutina.attr("disabled", true);
            creamirutina();
          }
          else {
            $respuesta.empty().append(ok);
          }
        }
        , error: function () {
          $respuesta.empty().append("Error en la comunicación con el servidor");
        }
        , complete: function () {
          $cargando.slideUp("fast");
        }
      });
    }
  });
  // Rutinas para habilitar el cambio de columnas
  $(".columna").sortable({
    connectWith: ".columna"
    , handle: ".cajajuego-cabecera"
    , cancel: ".cajajuego-toggle"
    , placeholder: "cajajuego-placeholder ui-corner-all"
  });

  function poncss($columna) {
    $columna.find((".cajajuego")).addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all").find(".cajajuego-cabecera").addClass("ui-widget-header ui-corner-all").prepend("<span class='ui-icon ui-icon-minusthick cajajuego-toggle'></span>");
    $columna.find(".cajajuego-toggle").on("click", function () {
      var icon = $(this);
      icon.toggleClass("ui-icon-minusthick ui-icon-plusthick");
      icon.closest(".cajajuego").find(".cajajuego-cuerpo").toggle();
    });
    $("#listarutina").on("sortupdate", function (event, ui) {
      cargaListaJuegos()
    });
    $columna.find(".cajajuego-toggle").toggleClass("ui-icon-minusthick ui-icon-plusthick");
    $columna.find(".cajajuego-cuerpo").toggle();
  }
});