<?php
/**
 * Created by PhpStorm.
 * User: jabor
 * Date: 11/04/2017
 * Time: 5:45
 */
require 'BBDD.php';
require_once '../vendor/phpexcel/Classes/PHPExcel.php';
session_start();
$mibase = new BBDD();

setlocale(LC_ALL, "es_ES");

//
//LINEAS DE PRUEBAS BORRAR AL FINAL
//$_SESSION['usuarioactivo'] = "pepito";
//$_SESSION['jugadorseleccionado'] = "pruebafamilia";
//$_POST['jugador']="manolito";
//$_POST['funcion'] = "recuperafamilia";
//$_POST['coleccion'] = "rutina";
//$_POST['nombre']="rutina1";
//$_POST['juegos']='["Juego1","Juego2","Juego3"]';
// funcion: "actualizar", nombre: "rutina1", juegos: "["Juego5","Juego6","Juego7"]"

$usuario = $_SESSION['usuarioactivo']; //las rutinas son propias de los usuarios
if (!isset($envio)){$envio=[];}
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
            if (isset($_POST['juegos'])) {
                $nombre = $_POST['nombre'];
                $juegos = $_POST['juegos']; //lo guardo directamente como objeto json
                $dato = ['nombre' => $nombre, 'usuario' => $usuario, 'juegos' => $juegos];
                $coleccion = "rutina";
            } else {
                $jugador = $_SESSION['jugadorseleccionado'];
                $juego = $_POST['juego'];
                $puntuacion = $_POST['puntuacion'];
                $coleccion = "puntuacion";
                ini_set('date.timezone', 'Europe/Madrid');
                $fecha = date("d-M-Y H:i:s");
                $dato = ['jugador' => $jugador, 'usuario' => $usuario, 'juego' => $juego, 'fecha' => $fecha, 'resultado' => $puntuacion];
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
            if ($comprobacion == 1) {
                echo("correcto");
            } else if ($comprobacion == 0) {
                echo("No se realizó ningún cambio en la rutina");
            } else {
                echo("Error al actualizar la rutina " . $nombre . "  codigo " . $comprobacion);
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
                    echo("hubo un error en el proceso, intentelo más tarde  codigo " . $comprobacion);
                }
                if ($control == 0 || $comprobacion == $control) {
                    $condicion = ['nombre' => $rutina, 'usuario' => $usuario];
                    $borra = $mibase->borrar("rutina", $condicion);
                    if ($borra == 1) {
                        echo("Rutina borrada correctamente");
                    } else {

                        echo("Error al actualizar la rutina " . $nombre);
                    }
                }
            }
            break;
        case "traejuegos":
            $jugador = $_SESSION['jugadorseleccionado']; //primero recupero la rutina que tiene asignada ese jugador
            $objeto = ['usuario' => $usuario, 'jugador' => $jugador];
            $cursor = $mibase->busca('jugador', $objeto);
            $dato = $cursor->toArray();
            $rutina = $dato[0]["rutina"];
            $objeto = ['usuario' => $usuario, 'nombre' => $rutina];//segundo me traigo la lista de juegos
            $cursor = $mibase->busca('rutina', $objeto);
            $dato = $cursor->toArray();
            $juegos = $dato[0]["juegos"];
            echo($juegos);
            break;
        case "puntuacion":
            $coleccion = "puntuacion";
            $jugador = $_POST['jugador'];
            $consulta = array('usuario' => $usuario, 'jugador' => $jugador);
            $projection = array("_id" => false, "sort" => array("juego" => 1));
            $respuesta = $mibase->proyecta($coleccion, $consulta, $projection);

            $envio = [];
            foreach ($respuesta as $dato) {
                $partida['juego'] = $dato['juego'];
                $partida['fecha'] = $dato['fecha'];
                $partida['resultado'] = $dato['resultado'];
                array_push($envio, $partida);
            }
            echo(json_encode($envio));
            break;
        case "guardafamilia":
            $jugador = $_POST['jugador'];
            $foto11 = $_POST['foto11'];
            $foto12 = $_POST['foto12'];
            $foto21 = $_POST['foto21'];
            $foto22 = $_POST['foto22'];
            $foto31 = $_POST['foto31'];
            $foto32 = $_POST['foto32'];
            $foto41 = $_POST['foto41'];
            $foto42 = $_POST['foto42'];
            $colección = "juegofamilia";
            $dato = ['usuario' => $usuario,
                'jugador' => $jugador,
                'foto11' => $foto11,
                'foto12' => $foto12,
                'foto21' => $foto21,
                'foto22' => $foto22,
                'foto31' => $foto31,
                'foto32' => $foto32,
                'foto41' => $foto41,
                'foto42' => $foto42,
            ];
            $comprobacion = $mibase->inserta('juegofamilia', $dato);
            if ($comprobacion == 1) {
                echo('Guardado correctamente');
            } else {
                echo('error al guardar en la base de datos');
            }


            break;
        case "recuperafamilia":
            $jugador = $_SESSION['jugadorseleccionado'];
            $respuesta = [];
            $objeto = ['usuario' => $usuario, 'jugador' => $jugador];
            $cursor = $mibase->busca('juegofamilia', $objeto);
            $dato = $cursor->toArray();//lo convertimos en array para que sea más facil su manejo
            unset($dato[0]["_id"]);//le quitamos los datos que no me interesan
            unset($dato[0]["usuario"]);
            unset($dato[0]["jugador"]);
            echo json_encode($dato[0]);

            break;
        case "descargaexcel":
            $objPHPExcel = new PHPExcel();
            $hoy = date("Y_m_d");
            $jugador = $_POST["jugador"];
            $filename = $jugador . "_". $hoy.".xls";

            $coleccion = "puntuacion";
            $jugador = $_POST['jugador'];
            $consulta = array('usuario' => $usuario, 'jugador' => $jugador);
            $projection = array("_id" => false, "sort" => array("juego" => 1));
            $respuesta = $mibase->proyecta($coleccion, $consulta, $projection);

            $envio = [];
            foreach ($respuesta as $dato) {
                $partida['juego'] = $dato['juego'];
                $partida['fecha'] = $dato['fecha'];
                $partida['resultado'] = $dato['resultado'];
                array_push($envio, $partida);
            }

            $objPHPExcel->getProperties()->setCreator("JO-JO Software")
                ->setLastModifiedBy("JO-JO")
                ->setTitle("Puntuaciones de " . $jugador)
                ->setSubject("Office 2007 XLSX Test Document")
                ->setDescription("resultados de los juegos de la web recuerdame");
            $juegoaux = "";
            $numfila = 2;
            $objPHPExcel->setActiveSheetIndex(0)
                ->setCellValue('A1', "Juego")
                ->setCellValue('B1', "Fecha")
                ->setCellValue('C1', "Resultado");
            foreach ($envio as $fila) {
                if ($fila['juego'] != $juegoaux) {
                    $juegoaux = $fila['juego'];
                    $casilla = 'A' . $numfila;
                    $objPHPExcel->setActiveSheetIndex(0)
                        ->setCellValue($casilla, $juegoaux);
                    $numfila++;
                }
                $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('B' . $numfila, $fila['fecha'])
                    ->setCellValue('C' . $numfila, $fila['resultado']);
                $numfila++;

            }
            $objPHPExcel->getActiveSheet()->setTitle($filename);

            $objPHPExcel->setActiveSheetIndex(0);

            header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            header('Content-Disposition: attachment;filename="' . $filename . '"');
            header('Cache-Control: max-age=0');

            header('Cache-Control: max-age=1');

            header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
            header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
            header('Cache-Control: cache, must-revalidate');
            header('Pragma: public');
            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
            $objWriter->save('php://output');
            break;


    };
}