$(document).ready(function () {
  $("body").fadeIn(1000);
  var cuadrados = $(".cuadrado");
  var unaVez = true;
  var inst1 = $(".alert-info");
  var inst2 = $(".alert-danger");
  var fallos = 0;
  var aciertos = 0;
  for (var i = 0; i < cuadrados.length; i++) {
    var num = numAzar();
    var subc = $(cuadrados[i]).children()[num];
    $(cuadrados[i]).attr("data-sol", num + 1);
    $(subc).addClass("on");
  }
  $("#ver").click(function () {
    if (unaVez) {
      cuadrados.css("visibility", "visible");
      unaVez = false;
      $(this).attr("disabled", true);
      setTimeout(function () {
        inst1.css("visibility", "hidden");
        //cuadrados.css("visibility", "hidden");
        cuadrados.addClass("sel");
        cuadrados.children().removeClass("on");
        inst2.css("visibility", "visible");
        $(".sel").children().click(function () {
          var numsub = $(this).attr("data-sol");
          var numcua = $(this).parent().attr("data-sol");
          if (numcua == numsub && !$(this).hasClass("done")) {
            aciertos++;
            $(this).addClass("done").css("background", "#44c353").append("<div class='glyphicon glyphicon-ok'></div>");
            $(this).siblings().addClass("done");
            $(this).parent().removeClass("sel");
            if (aciertos == cuadrados.length) {
              $("div.underesult").slideDown();
              $(".result").append("<div>Completado con</div><div style='font-size: 50px'>" + fallos + "</div><div>errores</div>").css("display", "flex");
              localStorage.setItem("puntuacion", fallos + " fallos");
            }
          } else if (!$(this).hasClass("done")) {
            fallos++;
            $(this).addClass("done").css("background", "#ac3c3c").append("<div class='glyphicon glyphicon-remove'></div>");
          }
        });
      }, 3000);
    }
  });
});

function numAzar() {
  var num = Math.floor((Math.random() * 4));
  return num;
}
