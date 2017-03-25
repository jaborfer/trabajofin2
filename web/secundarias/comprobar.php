<?php
require '../mongodb/vendor/autoload.php';
$client = new MongoDB\Client;
$mibase = $client->recuerdaMongo;
$coleCuida=$mibase->cuidador;

//$nombre=$_POST['usuario'];
$nombre="fad";
$respuesta=$coleCuida->findOne(
    ['usuario'=>$nombre]
);

if (is_null($respuesta)) {
    echo 'si';
} else {
    echo 'no';
}
