var aciertos = 0;
var anterior = "-1";
var elemant = "-1";
var tiempoin = Date.now();
$(document).ready(function () {
  $("body").fadeIn(1000);
  var unaVez = 0;
  var inst1 = $(".alert-info");
  var inst2 = $(".alert-danger");
  var casillas = $(".subcuadrado.sel");
  var fallos = 0;
  var antpulsado;
  var aciertos = 0;
  var arrayNums = crearArray(29);


  var posiciones1 = [0, 1, 2, 3, 4, 5, 6, 9, 10, 11, 15, 16, 17, 18, 19, 22, 23, 24, 25, 26, 30, 31, 32, 35, 36, 37, 38, 39, 40, 41];
  var posiciones2 = [2, 3, 4, 9, 10, 11, 16, 17, 18, 23, 24, 25, 30, 31, 32, 37, 38, 39];
  var posiciones3 = [3, 10, 16, 17, 18, 23, 24, 25, 31, 38];

  var arrayDes = shuffle(arrayNums);

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
    if ($(this).hasClass("nosel")) {
      var index = $(this).parent().parent().parent().data("index");
      marcarabajo(this, index);
    } else {
      marc($(this));
    }
  });

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

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

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
  if (!izq.hasClass("sel") || !der.hasClass("sel")) {
    var sol = $(elem).data("sol");
    $(elem).css({
      "background": "url(img/" + sol + "b.png)",
      "background-size": "cover",
      "background-position": "center"
    });

    if (anterior != "-1") {
      if (sol == anterior && !(filaant == fila && colant == col && indexant == index)) {

        $("[data-sol=" + sol + "]").removeClass("sel").addClass("nosel").css("background", "transparent !important");
        aciertos++;
        if (aciertos == 29) {
          fin();
        }

      } else {
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

function fin() {
  var porcent = Math.round((aciertos * 100) / 29);
  var tiempofin = Date.now();
  var tiempousado = (tiempofin - tiempoin) / 1000;
  $(".underesult").slideDown();
  $("#solucion").css("display", "flex").append("<div>Completado un</div><div style='font-size: 50px'>" + porcent + "%</div><div style='font-size: 50px'> " + tiempousado + "</div><div>segundos</div>");
  localStorage.setItem("puntuacion", tiempousado + " segundos - " + porcent + "%");
}
