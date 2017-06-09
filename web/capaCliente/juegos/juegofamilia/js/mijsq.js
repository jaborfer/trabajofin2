/**
 * Created by jabor on 05/01/2017.
 */
var imagenes = 15;//este parámetro se pasará desde php
var numImag = 5; //este es el número de imágenes por fila
var imgseleccionada = 0;
var aciertos = 0;
var fallos = 0;
var imgfallada;
var inicio = new Date();
function llena() {
    var aux = [];
    var alea;
    for (var i = 0; i < numImag; i++) {
        alea = Math.floor((Math.random() * imagenes) + 1);
        while (aux.indexOf(alea) != -1) {
            alea = Math.floor((Math.random() * imagenes) + 1);
        }
        aux.push(alea);
    }
    return (aux);
}

$(document).ready(function () {
    var fila1 = [];
    var fila2 = [];
    fila1 = llena();
    fila2 = fila1.slice();
    fila2 = fila2.sort(function deMenorAMayor(elem1, elem2) {
        return elem1 - elem2;
    }); //la funcion sort los ordena por orden alfabetico, no númerico, por eso necesita una función interior
    $('#fila1 img').each(function (num, ele) {
        ele.src = 'c:/fotosjuego/a' + fila1[num] + '.jpg';
        ele.alt = 'imagen a' + fila1[num];
        $(ele).click(function () {
            $(ele).siblings().removeClass('clikeado');
            $(ele).addClass('clikeado');
            imgseleccionada = fila1[num];
        })
    })//fin de la fila1

    $('#fila2 img').each(function (num, ele) {
        ele.src = 'c:/fotosjuego/b' + fila2[num] + '.jpg';
        ele.alt = 'imagen b' + fila2[num];
        $(ele).click(function () {
            if (imgseleccionada != 0) {
                if (fila2[num] == imgseleccionada) {
                    aciertos++;
                    ele.src = 'c:/fotosjuego/acierto.jpg';
                    $('#fila1 img').eq($.inArray(imgseleccionada, fila1)).removeClass('clikeado').attr('src', 'img/acierto.jpg').unbind();
                    imgseleccionada = 0;
                    if (aciertos == numImag) {
                        console.log(fallos);
                        var final = new Date();
                        var duracion = Math.floor((final - inicio) / 1000);
                        //$("<a>").attr("href", "fin.html")[0].click();
                        /*$.post("fin.php", {errores: fallos, tiempo: duracion  }, function(htmlexterno){ //aqui se meterán todas las variables que queremos enviar
                         $("#cargaexterna").html(htmlexterno);
                         });*/

                        $('<h1> El número de errores ha sido ' + fallos + '</h1>').appendTo('footer');
                        $('<h1> El tiempo pasado ha sido ' + duracion + ' segundos</h1>').appendTo('footer');
                    }
                } else {
                    fallos++;
                    console.log('fallo');
                    imgfallada = $(ele).attr('src');
                    setTimeout(
                        function () {
                            $(ele).attr('src', imgfallada);
                        }, 1000);
                    $(ele).attr('src', 'c:/fotosjuego/error.jpg')

                }
            }
        })
    })//fin de la fila2
});
