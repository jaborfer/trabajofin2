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
$lacoleccion = $mibase->cuidador;
$listadoc =$lacoleccion->find();
foreach ($listadoc as $doc) {
    echo '<pre>';
    var_dump($doc);
    echo '</pre>';
}
