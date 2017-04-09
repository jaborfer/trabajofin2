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

$nombre="cuidador";
$micoleccion=$recuerdaMongo->$nombre;
$micoleccion->createIndex(array('usuario' => 1));

$nombre="jugador";
$micoleccion=$recuerdaMongo->$nombre;
$micoleccion->createIndex(array('usuario' => 1,'jugador'=>1));

echo 'Despues de crear, listamos colecciones:<br>';
foreach ($recuerdaMongo->listCollections() as $coleccion){
    echo'<pre>';
    print_r($coleccion);
    echo'</pre>';
}
