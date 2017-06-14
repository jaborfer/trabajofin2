<?php
session_start();
if (!isset($_COOKIE['autojuego'])){
    setcookie('usuario', "",time()+60*60*24*30,"/");
    setcookie('jugador', "",time()+60*60*24*30,"/");
    setcookie('autojuego', "no", time()+60*60*24*30,"/");
     echo "<script language='javascript'>window.location='./capaCliente/inicio.php'</script>";
} elseif ($_COOKIE['autojuego'] == "si") {
    $_SESSION['usuarioactivo'] = $_COOKIE['usuario'];
    $_SESSION['jugadorseleccionado'] = $_COOKIE['jugador'];
    header('Location: ./capaCliente/juego.html');
}else{
       echo "<script language='javascript'>window.location='./capaCliente/inicio.php'</script>";
}
