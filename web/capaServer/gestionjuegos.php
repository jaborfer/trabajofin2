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

setlocale(LC_ALL,"es_ES");

//
//LINEAS DE PRUEBAS BORRAR AL FINAL
//$_SESSION['usuarioactivo'] = "manolito";
//$_SESSION['jugadorseleccionado'] = "jugador1";
//$_POST['funcion'] = "puntuacion";
//$_POST['coleccion'] = "rutina";
//$_POST['nombre']="rutina1";
//$_POST['juegos']='["Juego1","Juego2","Juego3"]';
// funcion: "actualizar", nombre: "rutina1", juegos: "["Juego5","Juego6","Juego7"]"

$usuario = $_SESSION['usuarioactivo']; //las rutinas son propias de los usuarios

if (isset($_POST['funcion'])) {
    $funcion = $_POST['funcion'];
    switch ($funcion) {
        case "listado":
            $coleccion = $_POST['coleccion'];
            if ($coleccion == "rutina") { //las rutinas pertenecen a un usuario, los juegos a todos
                $objeto = ['usuario' => $usuario];
            } else {
                $objeto = [];
            }
            $envio = [];
            $respuesta = $mibase->busca($coleccion, $objeto);

            foreach ($respuesta as $dato) {
                unset($dato["_id"]);
                array_push($envio, $dato);
            }
            sort($envio);
            echo json_encode($envio);

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
            if(isset($_POST['juegos'])){
            $nombre = $_POST['nombre'];
            $juegos = $_POST['juegos']; //lo guardo directamente como objeto json
            $dato = ['nombre' => $nombre, 'usuario' => $usuario, 'juegos' => $juegos];
            $coleccion="rutina";
            } else {
                $jugador=$_SESSION['jugadorseleccionado'];
                $juego=$_POST['juego'];
                $puntuacion=$_POST['puntuacion'];
                $coleccion="puntuacion";
                ini_set('date.timezone','Europe/Madrid');
                $fecha= date( "d-M-Y H:i:s");
                $dato=['jugador'=>$jugador, 'usuario'=>$usuario, 'juego'=>$juego, 'fecha'=>$fecha, 'resultado'=>$puntuacion];
            }

            $comprobacion = $mibase->inserta($coleccion, $dato);
            if ($comprobacion == 1) {
                echo('correcto');
            } else {
                echo('error al guardar en la base de datos');
            }
            break;
        case "actualizar":
            $nombre = $_POST['nombre'];
            $juegos = $_POST['juegos']; //lo guardo directamente como objeto json
            $condicion = ["nombre" => $nombre, "usuario" => $usuario];
            $modificacion = ['juegos' => $juegos];
            $comprobacion = $mibase->modifica("rutina", $condicion, $modificacion);
            if ($comprobacion != 1) {
                echo("Error al actualizar la rutina " . $nombre . "  codigo " . $comprobacion);
            } else {
                echo("correcto");
            }
            break;
        case "borrar":
            $rutina = $_POST['rutina'];
            $control = $_POST['control'];
            $comprobacion = 0;

            if ($control > 0) { //al menos hay un jugador con esa rutina que hay que borrar
                $condicion = ["rutina" => $rutina, "usuario" => $usuario];
                $modificacion = ['rutina' => ""];
                $comprobacion = $mibase->modifica("jugador", $condicion, $modificacion);
                if ($comprobacion != $control) {//comprobamos que NO se han "desasignado"correctamente todos los jugadores
                    echo ("hubo un error en el proceso, intentelo más tarde  codigo " . $comprobacion);
                }
                if ($control == 0 || $comprobacion == $control) {
                    $condicion = ['nombre' => $rutina, 'usuario' => $usuario];
                    $borra = $mibase->borrar("rutina", $condicion);
                    if ($borra == 1) {
                        echo("Rutina borrada correctamente");
                    } else {

                        echo("Error al actualizar la rutina " . $nombre );
                    }
                }
            }
            break;
        case "traejuegos":
            $jugador=$_SESSION['jugadorseleccionado']; //primero recupero la rutina que tiene asignada ese jugador
            $objeto = ['usuario' => $usuario, 'jugador' => $jugador];
            $cursor = $mibase->busca('jugador', $objeto);
            $dato = $cursor->toArray();
            $rutina=$dato[0]["rutina"];
            $objeto = ['usuario' => $usuario, 'nombre' => $rutina];//segundo me traigo la lista de juegos
            $cursor = $mibase->busca('rutina', $objeto);
            $dato = $cursor->toArray();
            $juegos=$dato[0]["juegos"];
            echo($juegos);
            break;
        case "puntuacion":
            $coleccion="puntuacion";
            $jugador=$_POST['jugador'];
            $consulta= array('usuario'=>$usuario, 'jugador'=>$jugador);
            $projection= array("_id"=>false,"sort"=>array("juego"=>1));
            $respuesta = $mibase->proyecta($coleccion, $consulta,$projection);

            $envio=[];
            foreach ($respuesta as $dato){
                $partida['juego']=$dato['juego'];
                $partida['fecha']=$dato['fecha'];
                $partida['resultado']=$dato['resultado'];
                array_push($envio,$partida);
            }
            echo(json_encode($envio));
            break;

    };
}