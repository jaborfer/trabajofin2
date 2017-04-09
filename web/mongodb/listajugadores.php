<?php
/**
 * Created by PhpStorm.
 * User: jabor
 * Date: 27/03/2017
 * Time: 6:05
 */

require 'vendor/autoload.php';
$client = new MongoDB\Client;
$mibase = $client->recuerdaMongo;
$lacoleccion = $mibase->jugador;
$listadoc =$lacoleccion->find();

echo ("Lista de jugadores:<br>");
foreach ($listadoc as $doc) {
    echo"<pre>";
    print_r($doc);
    echo "</pre>";
}
