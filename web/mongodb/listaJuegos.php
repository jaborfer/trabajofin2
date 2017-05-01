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

//$uri="mongodb://recuerdameclient:mu0056as@ds157500.mlab.com:57500/recuerdame";
//$client = new MongoDB\Client($uri);
//$mibase = $client->recuerdame;

$lacoleccion = $mibase->juego;
$listadoc =$lacoleccion->find();
foreach ($listadoc as $doc) {
    echo '<pre>';
    var_dump($doc);
    echo '</pre>';
}
