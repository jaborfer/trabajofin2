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
require '../vendor/autoload.php';

class BBDD{
    private $client;
    private $mibase;

   public function __construct()//CONEXION PARA SERVIDOR MLAB
    {
        if(!isset($conexion)){
            $uri="AQUI VA LA URI";

            $this->client = new MongoDB\Client($uri);
            $this->mibase = $this->client->recuerdame;
        }
    }

   /* public function __construct() //CONEXION PARA LOCAL
    {
        if(!isset($conexion)){
            $this->client= new MongoDB\Client;
            $this->mibase= $this->client->recuerdaMongo;
        }
    }*/


     function existe($coleccion, $dato)
    {
        //$client = new MongoDB\Client;
        //$mibase = $client->recuerdaMongo;
        $miColeccion=$this->mibase->$coleccion;
        $respuesta = $miColeccion->findOne($dato);


        return ($respuesta);
    }
    function busca($coleccion, $dato){
        //$client = new MongoDB\Client;
        //$mibase = $client->recuerdaMongo;
        $lacoleccion = $this->mibase ->$coleccion;
        $respuesta =$lacoleccion->find($dato);
        return ($respuesta);
    }

    function proyecta($coleccion, $query, $projection){
        //$client = new MongoDB\Client;
        //$mibase = $client->recuerdaMongo;
        $lacoleccion = $this->mibase ->$coleccion;
        $respuesta =$lacoleccion->find($query,$projection);
        return ($respuesta);
    }

    function inserta($coleccion, $dato)
    {
        //$client = new MongoDB\Client;
        //$mibase = $client->recuerdaMongo;

        $miColeccion = $this->mibase->$coleccion;
        $insertauno = $miColeccion->insertOne($dato);
        return ($insertauno->getInsertedCount());

    }

    function modifica($coleccion, $condicion, $modificacion){
        //$client = new MongoDB\Client;
        //$mibase = $client->recuerdaMongo;
        $miColeccion = $this->mibase->$coleccion;
        $modificacion= $miColeccion->updateMany(
            $condicion,
            ['$set'=>$modificacion]);
            return ($modificacion->getModifiedCount());

    }
    function borrar($coleccion, $condicion){
        //$client = new MongoDB\Client;
        //$mibase = $client->recuerdaMongo;
        $miColeccion = $this->mibase->$coleccion;
        $borrado= $miColeccion->deleteOne($condicion);
        return ($borrado->getDeletedCount());

    }

}