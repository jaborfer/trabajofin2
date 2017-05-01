<?php
require_once 'BBDD.php';

$nombre=$_POST['usuario'];
$pass=$_POST['pass1'];
$respuesta=NULL;
$dato=[
    'usuario'=>$nombre,
    'pass'=>$pass
];
$respuesta= BBDD::existe("cuidador", $dato);

if (!is_null($respuesta)){
    echo("ok");
} else {
    echo("Clave incorrecta");
}
