var colores = ["#68c2d3", "#44be4d", "#be4444", "#bebe44"];

$(document).ready(function () {

    var cuadrados = $(".cuadrado");
    var unaVez = 0;
    var inst1 = $(".alert-info");
    var inst2 = $(".alert-danger");
    var casillas = $(".subcuadrado.sel");
    var fallos = 0;
    var aciertos = 0;
    var anterior;
    var aciertos = 0;
    var tiempoin = Date.now();


    asignar(casillas);

    casillas.flip({
        trigger: 'manual'
    });

    $(".subcuadrado.sel").click(function () {
        if (unaVez == 0) {
            if ($(this).hasClass("sel")) {
                $(this).flip(true);
                unaVez++;
                anterior = $(this).attr("data-sol");
            }
        } else if (unaVez == 1) {
            if (anterior == $(this).attr("data-sol")) {
                $("[data-sol=" + anterior + "]").removeClass("sel").flip(true).css("opacity", "0.5");
                unaVez = 0;
                aciertos++;
                if (aciertos == 4) {
                    var tiempofin = Date.now();
                    var tiempousado= (tiempofin - tiempoin) / 1000 + " segundos.";
                    $("#solucion").slideDown().append("Has tardado un total de " + tiempousado);
                    localStorage.setItem("puntuacion",tiempousado);
                }
            } else {
                unaVez++;
                $(this).flip(true);
                setTimeout(function () {
                    $(".subcuadrado.sel").flip(false);
                    unaVez = 0;
                }, 2000);
            }
        }
    });


});


function numAzar() {
    var num = Math.floor((Math.random() * 7));
    return num;
}

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
