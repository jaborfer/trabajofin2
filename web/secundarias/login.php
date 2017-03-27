<?php
require_once 'BBDD.php';

$nombre=$_POST['usuario'];
$respuesta=NULL;
$respuesta= BBDD::existe("cuidador", "usuario", $nombre);

if (is_null($respuesta)){
    echo("valido");
} else {
    echo("invalido");
}
