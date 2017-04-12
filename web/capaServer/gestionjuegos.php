<?php
/**
 * Created by PhpStorm.
 * User: jabor
 * Date: 11/04/2017
 * Time: 5:45
 */
require 'BBDD.php';
session_start();
$mibase= new BBDD();

//
//LINEAS DE PRUEBAS BORRAR AL FINAL
//$_POST['funcion']="listado";
//$_POST['coleccion']="juegos";
//

if (isset($_POST['funcion'])) {
    $funcion = $_POST['funcion'];
    switch ($funcion) {
        case "listado":
            $coleccion=$_POST['coleccion'];
            if ($coleccion=="juegos") {
                $envio = [];
                $objeto = [];
                $respuesta = $mibase->busca($coleccion, $objeto);

                foreach ($respuesta as $dato) {
                    unset($dato["_id"]);
                    array_push($envio, $dato);
                }
                sort($envio);
                echo json_encode($envio);
            }
            break;
    };}