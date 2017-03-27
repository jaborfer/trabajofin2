<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of BBDD
 *
 * @author jabor
 */
require '../mongodb/vendor/autoload.php';
class BBDD {
    
        
    


    static function existe($coleccion,$campo,$dato){
     $client = new MongoDB\Client;     
     $mibase = $client->recuerdaMongo;
     
    $miColeccion=$mibase->$coleccion;
    $respuesta=$miColeccion->findOne(
    [$campo=>$dato]
);


return($respuesta);
    }

    static function inserta($coleccion,$dato){
     $client = new MongoDB\Client;     
     $mibase = $client->recuerdaMongo;
     
    $miColeccion=$mibase->$coleccion;
    $insertauno=$miColeccion->insertOne($dato);
    return($insertauno->getInsertedCount());


    }
}
