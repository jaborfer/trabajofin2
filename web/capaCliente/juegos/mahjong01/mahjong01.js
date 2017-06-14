var aciertos = 0;
var anterior = "-1";
var elemant = "-1";
var tiempoin = Date.now();

$(document).ready(function () {
  $("body").fadeIn(1000);
  //var casillas = $(".subcuadrado.sel");
  var antpulsado;
  var aciertos = 0;
  var arrayNums = crearArray(29);

  /*
   * El juego se esctrutura en 3 capas, cada una de ellas una tabla
   * Los arrays de posiciones, son las celdas que deben tener ficha en su interior
   */
  var posiciones1 = [0, 1, 2, 3, 4, 5, 6, 9, 10, 11, 15, 16, 17, 18, 19, 22, 23, 24, 25, 26, 30, 31, 32, 35, 36, 37, 38, 39, 40, 41];
  var posiciones2 = [2, 3, 4, 9, 10, 11, 16, 17, 18, 23, 24, 25, 30, 31, 32, 37, 38, 39];
  var posiciones3 = [3, 10, 16, 17, 18, 23, 24, 25, 31, 38];

  //desordenamos las fichas
  var arrayDes = shuffle(arrayNums);

  //rellenamos las 3 capas con fichas
  var tabla = crearTabla(6, 7, 1);
  $("#contcuads").append(tabla);
  var minPos = rellenarTabla(1, posiciones1, arrayDes, 0);
  var tabla = crearTabla(6, 7, 2);
  $("#contcuads").append(tabla);
  var minPos2 = rellenarTabla(2, posiciones2, arrayDes, minPos);
  var tabla = crearTabla(6, 7, 3);
  $("#contcuads").append(tabla);
  rellenarTabla(3, posiciones3, arrayDes, minPos + minPos2);


  $("td").click(function () {

    /*
     * Siempre que cliques, clicarás la capa3, así que si no hay ficha en esa celda, consultará al nivel inmediatamente inferior, y así recursivamente hasta dar con una ficha aplucar la funcion marc()
     *
     */
    if ($(this).hasClass("nosel")) {
      var index = $(this).parent().parent().parent().data("index");
      marcarabajo(this, index);
    } else {
      marc($(this));
    }
  });

  //podremos terminar el juego cuando queramos
  $("button").click(function () {
    $(this).css("display", "none");
    fin();
  });


});

function asignar(casillas) {
  array = [];
  for (var i = 0; i < casillas.length / 2; i++) {
    array.push(i + 1);
    array.push(i + 1);
  }
  array.sort(function (a, b) {
    return 0.5 - Math.random()
  });
  var array2 = array.sort(function (a, b) {
    return 0.5 - Math.random()
  });
  for (var i = 0; i < casillas.length; i++) {
    $(casillas[i]).attr("data-sol", array[i]).children(".back").css("background", colores[array[i] - 1]).children().css('background-image', 'url(img/' + array[i] + '.png)');
  }
}

function crearArray(num) {
  var array = [];
  for (var i = 0; i < num; i++) {
    array.push(i + 1);
    array.push(i + 1);
  }
  return array;
}

//funcion para desordenar arrays
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//función para crear tablas con X filas e Y columnas, asignandoles un id
function crearTabla(filas, columnas, id) {
  var tabla = "<table id='tabla" + id + "' data-index='" + id + "'>";
  for (var i = 0; i < filas; i++) {
    tabla += "<tr>";
    for (var j = 0; j < columnas; j++) {
      tabla += "<td class='nosel' data-fila='" + i + "' data-col='" + j + "'></td>";
    }
    tabla += "</tr>";
  }
  tabla += "</table>";
  return tabla;
}

//funcion que rellena las tablas en las posiciones concretas
function rellenarTabla(tabla, arrayPos, arrayImgs, imgMin) {
  for (var i = 0; i < arrayPos.length; i++) {
    $($("#tabla" + tabla + " td")[arrayPos[i]]).css({
      "background": "url(img/" + arrayImgs[imgMin + i] + ".png)",
      "background-size": "cover",
      "background-position": "center"
    }).attr("data-sol", arrayImgs[imgMin + i]).addClass("sel").removeClass("nosel");
  }
  return arrayPos.length;
}

//comprueba la celde del nivel justamente inferior a la dada
function marcarabajo(e, index) {
  var fila = $(e).data("fila");
  var col = $(e).data("col");
  if (index > 1) {
    var mindex = index - 1;
    var ficha = $("#tabla" + mindex + " [data-fila=" + fila + "][data-col=" + col + "]");

    if (ficha.hasClass("sel")) {
      marc(ficha);
    } else {
      marcarabajo(e, mindex);
    }
  } else if ($(e).hasClass("sel")) {
    marc(e);
  }
}

//función que marca las fichas
function marc(elem) {
  var fila = $(elem).data("fila");
  var col = $(elem).data("col");
  var index = $(elem).parent().parent().parent().data("index");
  var filaant = $(elemant).data("fila");
  var colant = $(elemant).data("col");
  var indexant = $(elemant).parent().parent().parent().data("index");
  console.log(fila + " " + col + " " + index);
  var izq = $("#tabla" + index + " [data-fila=" + fila + "][data-col=" + (col - 1) + "]");
  var der = $("#tabla" + index + " [data-fila=" + fila + "][data-col=" + (col + 1) + "]");

  //si la ficha está libre por uno de los 2 laos
  if (!izq.hasClass("sel") || !der.hasClass("sel")) {

    var sol = $(elem).data("sol");
    $(elem).css({
      "background": "url(img/" + sol + "b.png)",
      "background-size": "cover",
      "background-position": "center"
    });

    //si ya hay una ficha marcada
    if (anterior != "-1") {

      //si es la ficha-pareja a la anteriormente marcada y no has clicado dos veces en la misma
      if (sol == anterior && !(filaant == fila && colant == col && indexant == index)) {

        $("[data-sol=" + sol + "]").removeClass("sel").addClass("nosel").css("background", "transparent !important");
        aciertos++;
        if (aciertos == 29) {
          fin();
        }

      } else {
        //desmarcamos las casillas
        $("[data-sol=" + anterior + "]").css({
          "background": "url(img/" + anterior + ".png)",
          "background-size": "cover",
          "background-position": "center"
        });
        $("[data-sol=" + sol + "]").css({
          "background": "url(img/" + sol + ".png)",
          "background-size": "cover",
          "background-position": "center"
        });
      }
      anterior = "-1";
      elemant = "-1";
    } else {
      anterior = $(elem).data("sol");
      elemant = elem;
    }

  }
}

//pone fin a la partida
function fin() {
  var porcent = Math.round((aciertos * 100) / 29);
  var tiempofin = Date.now();
  var tiempousado = (tiempofin - tiempoin) / 1000;
  $(".underesult").slideDown();
  $("#solucion").css("display", "flex").append("<div>Completado un</div><div style='font-size: 50px'>" + porcent + "%</div><div style='font-size: 50px'> " + tiempousado + "</div><div>segundos</div>");
  localStorage.setItem("puntuacion", tiempousado + " segundos - " + porcent + "%");
}
