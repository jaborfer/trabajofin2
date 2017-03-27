<?php
/**
 * Created by PhpStorm.
 * User: jabor
 * Date: 27/03/2017
 * Time: 4:28
 */

require_once 'BBDD.php';

if ($_POST['usuario'] && $_POST['pass1'] && $_POST['pass2'] && $_POST['mail']) {
    $usuario = $_POST['usuario'];
    $pass1 = $_POST['pass1'];
    $pass2 = $_POST['pass2'];
    $mail = $_POST['mail'];

    if (is_null(BBDD::existe("cuidador", "usuario", $usuario)) && (strcmp($pass1, $pass2)== 0) && (strlen($pass1)>5) && (strlen($mail)>5)) {
        $dato = [
            'usuario' => $usuario,
            'pass' => $pass1,
            'mail' => $mail
        ];
        $comprueba = BBDD::inserta("cuidador", $dato);
        if ($comprueba = 1) {
            echo("ok");
        } else {
            echo("error en la base de datos, lo estamos investigando, pruebe más tarde");
        }
    } else {
        echo("error en la transmisión de los datos, pulse otra vez enviar");
    }
} else {
    echo("Error al recibir los datos, recargue la página y pruebe de nuevo");
}