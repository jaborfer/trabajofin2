  $(document).ready(function () {
    var secuencia = new Array();
    var respuestas = new Array();
    var contador = 1;
    var contRes = 0;
    var luces;
    var paneles = $(".panel");
    $("#boton").click(function () {
      if ($(this).hasClass("btn-default")) {
        secuencia.push(numAzar());
        $(this).empty().removeClass("btn-default");
        luces = setInterval(encenderLuz, 900);
      }
    });
    var encenderLuz = function encenderLuz() {
      $("body").fadeIn(1000);
      $(paneles[secuencia[contador - 1]]).css({
        "opacity": 0.4
      });
      var sound = $(paneles[secuencia[contador - 1]]).children()[0];
      sound.play();
      setTimeout(function () {
        $(paneles[secuencia[contador - 1]]).css("opacity", 1);
        if (contador == secuencia.length) {
          clearInterval(luces);
          contador = 0;
          $("#boton").append("<div>REPITE</div><div>SECUENCIA</div>").addClass("blue");
          paneles.addClass("sel");
          paneles.on("click", function () {
            var sound = $(this).children()[0];
            sound.play();
            respuestas.push($(this).attr("data-sol"));
            contRes++;
            if (secuencia.length == contRes) {
              paneles.removeClass("sel");
              var same = secuencia.equals(respuestas);
              if (same) {
                respuestas = [];
                contRes = 0;
                paneles.off("click").removeClass("sel");
                $("#boton").empty().append("<div>MUY BIEN</div><div>OTRA VEZ</div>").addClass("btn-default").removeClass("blue").addClass("green");
              } else {
                $(".underesult").slideDown();
                $("#boton").empty().append("FIN").removeClass("blue").addClass("red");
                $("#boton").off("click");
                paneles.off("click").removeClass("sel");
                $("#solucion").slideDown("fast").append("Has llegado al nivel " + secuencia.length + ".");
                localStorage.setItem("puntuacion", "nivel " + secuencia.length);
              }
            }
          });
        }
        contador++;
      }, 500);
    }
  });

  function numAzar() {
    var num = Math.floor((Math.random() * 4));
    return num;
  }
  if (Array.prototype.equals) console.warn("Error");
  Array.prototype.equals = function (array) {
    if (!array) return false;
    if (this.length != array.length) return false;
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] instanceof Array && array[i] instanceof Array) {
        if (!this[i].equals(array[i])) return false;
      } else if (this[i] != array[i]) {
        return false;
      }
    }
    return true;
  }
  Object.defineProperty(Array.prototype, "equals", {
    enumerable: false
  });
