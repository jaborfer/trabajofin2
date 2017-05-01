<?php
require_once 'BBDD.php';

if (isset($_POST['usuario'])) {
    $nombre = $_POST['usuario'];
    $respuesta = NULL;
    $dato = [
        'usuario' => $nombre,
    ];
    $respuesta = BBDD::existe("cuidador", $dato);

    if (is_null($respuesta)) {
        echo("valido");
    } else {
        echo("invalido");
    }
} elseif (isset($_POST['jugador'])) {
    $nombre = $_POST['jugador'];
    $respuesta = NULL;
    $dato = [
        'jugador' => $nombre,
    ];
    $respuesta = BBDD::existe("jugador", $dato);

    if (is_null($respuesta)) {
        echo("valido");
    } else {
        echo("invalido");
    }
}
