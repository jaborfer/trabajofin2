<?php
require_once 'BBDD.php';

$nombre=$_POST['usuario'];
$respuesta=NULL;
$dato=[
    'usuario'=>$nombre,
];
$respuesta= BBDD::existe("cuidador", $dato);

if (is_null($respuesta)){
    echo("valido");
} else {
    echo("invalido");
}
