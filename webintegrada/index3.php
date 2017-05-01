<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Memories</title>
  <script src="https://code.jquery.com/jquery-3.2.1.js" integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE=" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="css/estilo.css"> </head>

<body>
  <section id="capa"></section>
  <section id="forms-portada">
    <div id="formport">Formulario de registro/inicio de sesion del cuidador cargado con Ajax</div>
  </section>
  <section id="capax">
    <div id="logopport">LOGO</div>
    <div id="descripcionport">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</div>
    <div class="botonera">
      <input type="button" value="registrate">
      <input type="button" value="inicia sesion" name="login"> </div>
  </section>
  <script>
    $(document).ready(init);

    function init() {
      var body = $('#capa');
      var backgrounds = new Array('url(img/01.jpg)', 'url(img/03.jpg)', 'url(img/05.jpg)');
      var cont = 0;

      function nextBackground() {
        cont++;
        cont = cont % backgrounds.length;
        body.css('background-image', backgrounds[cont]);
      }
      var interval = setInterval(nextBackground, 10000);
      $("[value=registrate]").click(function () {
        clearInterval(interval);
        $("#forms-portada").css("background-color", "white");
        $.ajax({
          url: "capaCliente/crear.html"
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
      });
      $("[name=login]").click(function () {
        clearInterval(interval);
        $("#forms-portada").css("background-color", "white");
        $.ajax({
          url: "capaCliente/login.html"
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
      });
    }
  </script>
</body>

</html>