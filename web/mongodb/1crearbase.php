<?php
/**
 * Created by PhpStorm.
 * User: jabor
 * Date: 25/03/2017
 * Time: 05:45
 */

require_once 'vendor/autoload.php';
$uri="mongodb://recuerdameclient:mu0056as@ds157500.mlab.com:57500/recuerdame";

$client = new MongoDB\Client($uri);
$mibase = $client->recuerdame;
$resul=$recuerdaMongo->createCollection('cuidador');
$resul=$recuerdaMongo->createCollection('jugador'); //dentro de jugador irá un objeto con las jugadas y puntuaciones
$resul=$recuerdaMongo->createCollection('rutina');// dentro de rutina irá un objeto con los juegos que contiene
$resul=$recuerdaMongo->createCollection('juego');

echo 'Despues de crear, listamos colecciones:<br>';
foreach ($recuerdaMongo->listCollections() as $coleccion){
    echo'<pre>';
    print_r($coleccion);
    echo'</pre>';
}
