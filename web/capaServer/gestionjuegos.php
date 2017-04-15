<?php
/**
 * Created by PhpStorm.
 * User: jabor
 * Date: 11/04/2017
 * Time: 5:45
 */
require 'BBDD.php';
session_start();
$mibase = new BBDD();
//
//LINEAS DE PRUEBAS BORRAR AL FINAL
//$_SESSION['usuarioactivo']="pepito";
//$_POST['funcion']="comprobar";
//$_POST['nombre']="rutina1";
//

$usuario = $_SESSION['usuarioactivo']; //las rutinas son propias de los usuarios


if (isset($_POST['funcion'])) {
    $funcion = $_POST['funcion'];
    switch ($funcion) {
        case "listado":
            $coleccion = $_POST['coleccion'];
            if ($coleccion == "juegos") {
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
        case "comprobar": //en este caso sólo se puede comprobar si existe una rutina, no tiene sentido el caso de juego
            $nombre = $_POST['nombre'];
            $respuesta = NULL;
            $dato = [
                'nombre' => $nombre,
                'usuario' => $usuario
            ];
            $respuesta = $mibase->existe("rutina", $dato);

            if (is_null($respuesta)) {
                echo("valido");
            } else {
                echo("invalido");
            }

            break;
        case "guardar":
            $nombre=$_POST['nombre'];
            $juegos= $_POST['juegos']; //lo guardo directamente como objeto json
            $dato =['nombre' => $nombre, 'usuario' =>$usuario, 'juegos'=>$juegos];
            $comprobacion=$mibase->inserta("rutina",$dato);
            if($comprobacion==1){echo('correcto');}else{echo('error al guardar en la base de datos');}
    };
}