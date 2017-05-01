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
$lacoleccion = $mibase->rutina;//poner el nombre de la coleccion a borrar
$lacoleccion->drop();
$mibase->createCollection('rutina');//porner el nombre de la coleccion a crear

