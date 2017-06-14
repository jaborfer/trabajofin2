//posibles operaciones  
var operaciones = ["suma", "resta", "multiplicacion", "division"];

$(document).ready(function () {

  $("body").fadeIn(1000);
  var tiempoin = Date.now();

  //elegimos una operación al azar
  var sol = operaciones[opAzar()];

  /*
   * realizamos la operación, la selección de números variará en función del tipo de operación asignado
   */
  switch (sol) {
    case "suma":
      var num1 = numAzar();
      var num2 = numAzar();
      var suma = num1 + num2;
      $("#operacion").append("<div class='carta'><div class='carta-in'>" + num1 + "</div></div><div class='carta'>?</div><div class='carta'><div class='carta-in'>" + num2 + "</div></div> = <div class='carta'><div class='carta-in'>" + suma + "</div></div>").attr("data-sol", "suma");
      break;
    case "resta":
      var num1 = numAzar();
      var num2 = numAzar2(num1);
      var resta = num1 - num2;
      $("#operacion").append("<div class='carta'><div class='carta-in'>" + num1 + "</div></div><div class='carta'>?</div><div class='carta'><div class='carta-in'>" + num2 + "</div></div> = <div class='carta'><div class='carta-in'>" + resta + "</div></div>").attr("data-sol", "resta");
      break;
    case "multiplicacion":
      var num1 = numAzar();
      var num2 = numAzar();
      var mult = num1 * num2;
      $("#operacion").append("<div class='carta'><div class='carta-in'>" + num1 + "</div></div><div class='carta'>?</div><div class='carta'><div class='carta-in'>" + num2 + "</div></div> = <div class='carta'><div class='carta-in'>" + mult + "</div></div>").attr("data-sol", "multiplicacion");
      break;
    case "division":
      var num1 = numAzarD();
      var num2 = numAzarD2(num1);
      var divi = num1 / num2;
      $("#operacion").append("<div class='carta'><div class='carta-in'>" + num1 + "</div></div><div class='carta'>?</div><div class='carta'><div class='carta-in'>" + num2 + "</div></div> = <div class='carta'><div class='carta-in'>" + divi + "</div></div>").attr("data-sol", "division");
      break;
  }

  //al elegir solución, comprueba si esta es la correcta, al fallar, te permite re-intentarlo
  $("button").click(function () {
    var resp = $(this).attr("data-sol");
    if (resp == sol) {
      var tiempofin = Date.now();
      var tiempousado = (tiempofin - tiempoin) / 1000 + " segundos.";
      $(".underesult").slideDown();
      $("#solucion").empty().slideDown().append("Has tardado un total de " + tiempousado + " segundos.");
      localStorage.setItem("puntuacion", tiempousado);
    } else {
      $("#resol").empty().slideDown().append("Incorrecto, prueba otra vez.");
    }
  });
});

//número al azar del 0 al 10
function numAzar() {
  var num = Math.floor((Math.random() * 11));
  return num;
}

//numero al azar del 0 al 10 divisible por 2
function numAzarD() {
  var num = Math.floor((Math.random() * 11));
  while (!num > 2) {
    var num = Math.floor((Math.random() * 11));
  }
  return num;
}

//dado un numero numMax, devuelve otro número por el que numMax sea divisible
function numAzarD2(numMax) {
  var num = Math.floor((Math.random() * numMax));
  while (!(numMax % num == 0)) {
    var num = Math.floor((Math.random() * numMax));
  }
  return num;
}

//dado un numero numMax, devuelve otro número menor o igual que numMax
function numAzar2(numMax) {
  var num = Math.floor((Math.random() * numMax));
  return num;
}

//numero al azar del 0 al 3
function opAzar() {
  var num = Math.floor((Math.random() * 4));
  return num;
}
