<?php
session_start();
//Este bloque es solo para hacer las pruebas con sesiones
/*$prueba=[
    "usuario"=>"pepito",
    "jugador"=>"juanito",
    "autojuego"=>"no" // esta es la banderia para que vaya directamente a jugar o a la principal
];
$_SESSION['recuerdame']=$prueba;*/
//unset($_SESSION['recuerdame']);


if (!isset($_SESSION['recuerdame'])||$_SESSION['recuerdame']['autojuego']=="no") {
  header('Location: ./capaCliente/principal.html');
} else {
  $datosInicio=$_SESSION['recuerdame'];
    $_SESSION['usuarioactivo']=$datosInicio['usuario'];
    $_SESSION['jugadorseleccionado']=$datosInicio['jugador'];
  header('Location: ./capaCliente/juego.html');;
}
?>
