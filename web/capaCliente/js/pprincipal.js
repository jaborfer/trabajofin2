  $(document).ready(init);

  function init() {
    var body = $('#capa');
    var backgrounds = ['url(imagenes/01.jpg)', 'url(imagenes/03.jpg)', 'url(imagenes/04.jpg)','url(imagenes/05.jpg)'];
    var cont = 0;

    function nextBackground() {
      cont++;
      cont = cont % backgrounds.length;
      body.fadeTo('slow', 0.3, function () {
        body.css("background-image", backgrounds[cont]);
      }).fadeTo('slow', 1);
    }
    var interval = setInterval(nextBackground, 7000);
    $("[value=registrate]").click(function () {
      $("#formport").slideUp("fast");
      clearInterval(interval);
      $("#forms-portada").css("background-color", "rgba(224, 224, 224, 0.9)");
      setTimeout(function () {
        $.ajax({
          url: "crear.html"
          , async: true
          , success: function (html) {
            $("#formport").empty().slideDown("fast").append(html);
          }
          , error: function () {
            $("#formport").empty().slideDown("fast").append("<div class='alert alert-danger'>Ha ocurrido algún error, pruebe otra vez.</div>").removeClass("hidden");
          }
          , complete: function () {
            $(".alert-success").remove();
            $("#loader").slideUp();
          }
        });
      }, 500);
    });
    $("[name=login]").click(function () {
      $("#formport").slideUp("fast");
      clearInterval(interval);
      $("#forms-portada").css("background-color", "rgba(224, 224, 224, 0.9)");
      setTimeout(function () {
        $.ajax({
          url: "login.html"
          , async: true
          , success: function (html) {
            $("#formport").empty().slideDown("fast").append(html);
          }
          , error: function () {
            $("#formport").empty().slideDown("fast").append("<div class='alert alert-danger'>Ha ocurrido algún error, pruebe otra vez.</div>").removeClass("hidden");
          }
          , complete: function () {
            $(".alert-success").remove();
            $("#loader").slideUp();
          }
        });
      }, 500);
    });
  }