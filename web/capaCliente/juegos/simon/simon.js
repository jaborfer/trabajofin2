  $(document).ready(function () {
    $("body").fadeIn(1000);
    var secuencia = [];
    var respuestas = [];
    var contador = 1;
    var contRes = 0;
    var luces;
    var paneles = $(".panel");

    //al pulsar el botón
    $("#boton").click(function () {

      /*
       *
       * si el botón tiene la clase btn-default, es que está preparado para iniciar otra secuencia
       * en ese caso, se suma un color más a la secuencia
       *
       */
      if ($(this).hasClass("btn-default")) {
        secuencia.push(numAzar());
        $(this).empty().removeClass("btn-default");
        luces = setInterval(encenderLuz, 900);
      }
    });


    var encenderLuz = function encenderLuz() {

      //se enciende el panel que corresponde en la secuencia
      $(paneles[secuencia[contador - 1]]).css({
        "opacity": 0.4
      });

      //suena la nota de dicho panel
      var sound = $(paneles[secuencia[contador - 1]]).children()[0];
      sound.play();

      //al medio segundo
      setTimeout(function () {

        //el panel vuelve a estar apagado
        $(paneles[secuencia[contador - 1]]).css("opacity", 1);

        //si la secuencia ha llegado a su fin
        if (contador == secuencia.length) {

          //paramos el interval
          clearInterval(luces);

          //el contador vuelve a 0
          contador = 0;

          $("#boton").append("<div>REPITE</div><div>SECUENCIA</div>").addClass("blue");
          paneles.addClass("sel");

          //añadimos un listener onclick a los paneles
          paneles.on("click", function () {
            var sound = $(this).children()[0];
            sound.play();

            //añadimos el panel que hemos pulsado al array respuestas
            respuestas.push($(this).attr("data-sol"));
            contRes++;

            //si hemos pulsado tantos paneles como dura la secuencia
            if (secuencia.length == contRes) {
              paneles.removeClass("sel");
              var same = secuencia.equals(respuestas);

              //si la secuencia = respuestas
              if (same) {
                respuestas = [];
                contRes = 0;

                //quitamos el listener onlick a los paneles
                paneles.off("click").removeClass("sel");
                $("#boton").empty().append("<div>MUY BIEN</div><div>OTRA VEZ</div>").addClass("btn-default").removeClass("blue").addClass("green");

                //en cuanto fallemos, la partida acabará
              } else {
                $(".underesult").slideDown();
                $("#boton").empty().append("FIN").removeClass("blue").addClass("red");
                $("#boton").off("click");
                paneles.off("click").removeClass("sel");
                $("#solucion").slideDown("fast").append("Has llegado al nivel " + secuencia.length + ".");

                //almacenaremos el nivel alcanzado
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

  //refefinimos el método equals para comprar los arrays de secuencia vs respuestas
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
  };
  Object.defineProperty(Array.prototype, "equals", {
    enumerable: false
  });
