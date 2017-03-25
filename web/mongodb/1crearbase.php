<?php
/**
 * Created by PhpStorm.
 * User: jabor
 * Date: 25/03/2017
 * Time: 05:45
 */

require_once 'vendor/autoload.php';
$client = new MongoDB\Client;
$recuerdaMongo = $client->recuerdaMongo;
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
