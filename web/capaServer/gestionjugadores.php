<?php
/**
 * Created by PhpStorm.
 * User: jabor
 * Date: 03/04/2017
 * Time: 5:45
 */
//error_reporting(E_ERROR);

require 'BBDD.php';
require '../vendor/autoload.php';
session_start();
$mibase = new BBDD();
//
//LINEAS DE PRUEBAS BORRAR AL FINAL
//$_POST['funcion']="recuperapass";
//$_POST['tipo']="cuidador";
//$_POST['opciones']="juegos";
//$_POST['usuario']="pruebapass";
//$_SESSION['usuarioactivo']="pepito";
//$_POST['jugador']="manolito";
//$_POST['rutina']="rutina1";
//$_POST['mail']="jaborfer@gmail.com";
//HASTA AQUI
//
function creaRutinasBase($usuario,$mibase){
    $dato = ['nombre' => "Total", 'usuario' => $usuario, 'juegos' => '["atrapala","cuadrados01","parejas01","simon","mahjong01","monedas01","operaciones01","sudoku01","secuencia01"]'];
    $coleccion="rutina";
    $mibase->inserta($coleccion, $dato);
    $dato = ['nombre' => "Memoria", 'usuario' => $usuario, 'juegos' => '["cuadrados01","cuadrados01","parejas01","parejas01"]'];
    $coleccion="rutina";
    $mibase->inserta($coleccion, $dato);
}
if (isset($_POST['funcion'])) {
    $funcion = $_POST['funcion'];
    switch ($funcion) {
        case "listado": //devuelve un array con los nombres de los jugadores del usuario activo
            $envio = [];
            $usuarioactivo = $_SESSION['usuarioactivo'];
            $objeto = ['usuario' => $usuarioactivo];
            if (isset($_POST['rutina'])) {
                $rutinabuscada = $_POST['rutina'];
                $objeto = ['usuario' => $usuarioactivo, 'rutina' => $rutinabuscada];
            } else { //aqui se meterían con else las distintas opciones de consultas
                $objeto = ['usuario' => $usuarioactivo];
            }
            $respuesta = $mibase->busca('jugador', $objeto);

            foreach ($respuesta as $doc) {
                array_push($envio, $doc['jugador']);
            }
            sort($envio);
            echo json_encode($envio);
            break;
        case "guardar": //comprueba si es un usuario o un jugador y lo guarda en la colección correspondiente
            if (isset($_POST['usuario']) && isset($_POST['pass1']) && isset($_POST['pass2']) && isset($_POST['mail'])) {
                $usuario = $_POST['usuario'];
                $pass1 = $_POST['pass1'];
                $pass2 = $_POST['pass2'];
                $mail = $_POST['mail'];
                $dato = [
                    'usuario' => $usuario,
                ];
                if (is_null($mibase->existe("cuidador", $dato)) && (strcmp($pass1, $pass2) == 0) && (strlen($pass1) > 5) && (strlen($mail) > 5)) {
                    $dato = [
                        'usuario' => $usuario,
                        'pass' => $pass1,
                        'mail' => $mail
                    ];
                    $comprueba = $mibase->inserta("cuidador", $dato);
                    if ($comprueba = 1) {
                        $_SESSION['usuarioactivo'] = $usuario;
                        creaRutinasBase($usuario,$mibase);
                        echo("ok");
                    } else {
                        if (isset($_SESSION['usuarioactivo'])) {
                            unset($_SESSION['usuarioactivo']);
                        }
                        echo("error en la base de datos, lo estamos investigando, pruebe más tarde");
                    }
                } else {
                    echo("error en la transmisión de los datos, pulse otra vez enviar");
                }
            } elseif (isset($_POST['jugador']) && $_POST['edad'] && $_POST['enfermedad'] && $_POST['notas']) {
                $usuarioactivo = $_SESSION['usuarioactivo'];
                $jugador = $_POST['jugador'];
                $edad = $_POST['edad'];
                $enfermedad = $_POST['enfermedad'];
                $notas = $_POST['notas'];
                $usuario = $_SESSION['usuarioactivo'];
                $dato = [
                    'jugador' => $jugador,
                    'usuario' => $usuario
                ];
                if (is_null($mibase->existe("jugador", $dato)) && (strlen($edad) > 0) && (strlen($enfermedad) > 0) && (strlen($notas) > 0)) {
                    $dato = [
                        'jugador' => $jugador,
                        'edad' => $edad,
                        'enfermedad' => $enfermedad,
                        'notas' => $notas,
                        'usuario' => $usuarioactivo
                    ];
                    $comprueba = $mibase->inserta("jugador", $dato);
                    if ($comprueba = 1) {
                        echo("ok");
                    } else {
                        echo("error en la base de datos, lo estamos investigando, pruebe más tarde");
                    }
                } else {
                    echo("error en la transmisión de los datos, pulse otra vez enviar");
                }
            } else {
                echo("Error al recibir los datos, recargue la página y pruebe de nuevo");
            }
            break;
        case "traedocumento": //devuelve un array con un documento completo
            $coleccion = $_POST['tipo'];
            $usuarioactivo = $_SESSION['usuarioactivo'];
            $respuesta = [];
            if ($coleccion == "jugador") {
                $jugador = $_POST['jugador'];
                $objeto = ['usuario' => $usuarioactivo, 'jugador' => $jugador];
                $cursor = $mibase->busca('jugador', $objeto);

            } else { // si no es un jugador, es un usuario
                $objeto = ['usuario' => $usuarioactivo];
                $cursor = $mibase->busca('cuidador', $objeto);

            }
            $dato = $cursor->toArray();//lo convertimos en array para que sea más facil su manejo

            unset($dato[0]["_id"]);//le quitamos el id interno
            echo json_encode($dato[0]);
            break;
        case "comprobar"://detecta si se pide un usuario o un jugador y SOLO comprueba si existe en la colección.
            if (isset($_POST['usuario'])) { //caso de querer comprobar si ya existe un usuario/cuidador
                $nombre = $_POST['usuario'];
                $respuesta = NULL;
                $dato = [
                    'usuario' => $nombre,
                ];
                $respuesta = $mibase->existe("cuidador", $dato);

                if (is_null($respuesta)) {
                    echo("valido");
                } else {
                    echo("invalido");
                }
            } elseif (isset($_POST['jugador'])) { //caso de querer comprobar s1 existe un jugador del usuario activo
                $nombre = $_POST['jugador'];
                $usuario = $_SESSION['usuarioactivo'];
                $respuesta = NULL;
                $dato = [
                    'jugador' => $nombre,
                    'usuario' => $usuario
                ];
                $respuesta = $mibase->existe("jugador", $dato);

                if (is_null($respuesta)) {
                    echo("valido");
                } else {
                    echo("invalido");
                }
            }
            break;
        case "login": // comprueba el usuario y la clave
            $nombre = $_POST['usuario'];
            $pass = $_POST['pass1'];
            $respuesta = NULL;
            $dato = [
                'usuario' => $nombre,
                'pass' => $pass
            ];
            $respuesta = $mibase->existe("cuidador", $dato);

            if (!is_null($respuesta)) {
                echo("ok");
                $_SESSION['usuarioactivo'] = $nombre;
            } else {
                echo("autentificación incorrecta");
                if (isset($_SESSION['usuarioactivo'])) {
                    unset($_SESSION['usuarioactivo']);
                }
            }
            break;
        case "actualizar":
            if (isset($_POST['jugador'])) { //opción para cambiar los datos de un jugador
                $jugador = $_POST['jugador'];
                $enfermedad = $_POST['enfermedad'];
                $edad = $_POST['edad'];
                $notas = $_POST['notas'];
                $usuarioactivo = $_SESSION['usuarioactivo'];
                $condicion = ['jugador' => $jugador, 'usuario' => $usuarioactivo];
                $modificacion = [
                    'edad' => $edad,
                    'enfermedad' => $enfermedad,
                    'notas' => $notas
                ];
                $comprueba = $mibase->modifica("jugador", $condicion, $modificacion);

            } else {
                $mail = $_POST['mail'];
                $pass = $_POST['pass1'];
                $usuarioactivo = $_SESSION['usuarioactivo'];
                $condicion = ['usuario' => $usuarioactivo];
                $modificacion = [
                    'mail' => $mail,
                    'pass' => $pass
                ];
                $comprueba = $mibase->modifica("cuidador", $condicion, $modificacion);
            }
            if ($comprueba == 1) {
                echo("ok");
            } else {
                echo("Se produjo un error al actualizar, inténtelo más tarde");
            }
            break;
        case "borrar":
            if (isset($_POST['jugador'])) { //opción para borrar los datos de un jugador
                $jugador = $_POST['jugador'];
                $usuario = $_SESSION['usuarioactivo'];
                $condicion = ['jugador' => $jugador, 'usuario' => $usuario];
                $borra = $mibase->borrar("jugador", $condicion);

                if ($borra == 1) {
                    echo("ok");
                } else {
                    echo("Se produjo un error al actualizar, inténtelo más tarde");
                }
            }//aqui va el código para borrar los usuarios
            break;
        case "acceso":

            $opcion = $_POST['opciones'];
            if ($opcion == "standard") {
                if (isset($_POST['jugador'])) {
                    $_SESSION['jugadorseleccionado'] = $_POST['jugador'];
                }
                setcookie('autojuego', "no", time() + 60 * 60 * 24 * 30, "/"); // esta es la banderia para que vaya directamente a jugar o a la principal
                echo("ok");
            } else if ($opcion == "juegos") {
                $usuario = $_SESSION['usuarioactivo'];
                $jugador = $_POST['jugador'];

                setcookie('usuario', $usuario, time() + 60 * 60 * 24 * 30, "/");
                setcookie('jugador', $jugador, time() + 60 * 60 * 24 * 30, "/");
                setcookie('autojuego', "si", time() + 60 * 60 * 24 * 30, "/");// esta es la banderia para que vaya directamente a jugar o a la principal
                echo("ok");
            } else {
                echo("Error en la transmisión");
            }
            break;
        case "actualizarrutina": //este metodo se saca de actualizar para minimizar el consumo de red
            $jugador = $_POST['jugador'];
            $usuarioactivo = $_SESSION['usuarioactivo'];
            $rutina = $_POST['rutina'];
            $condicion = ['jugador' => $jugador, 'usuario' => $usuarioactivo];
            $modificacion = ['rutina' => $rutina];
            $comprueba = $mibase->modifica("jugador", $condicion, $modificacion);
            if ($comprueba == 1) {
                echo("ok");
            } else {
                echo("Se produjo un error al actualizar, inténtelo más tarde");
            }
            break;
        case "recuperapass":
            $usuario = $_POST['usuario'];
            $direccion = $_POST['mail'];
            $dato = ['usuario' => $usuario, 'mail' => $direccion];
            $existe = $mibase->existe("cuidador", $dato);
            if ($existe) {
                $cursor = $mibase->busca("cuidador", $dato);
                $dato = $cursor->toArray();
                $clave = $dato[0]["pass"];

                $mail = new PHPMailer;

                //$mail->SMTPDebug = 1;                               // Enable verbose debug output
                $mail->isSMTP();                                      // Set mailer to use SMTP
                $mail->Host = 'smtp.sendgrid.net';  // Specify main and backup SMTP servers
                $mail->SMTPAuth = true;                               // Enable SMTP authentication
                $mail->Username = 'app68737128@heroku.com';                 // SMTP username
                $mail->Password = '7ycgogiz6168';                           // SMTP password
                $mail->SMTPSecure = 'plain';                            // Enable TLS encryption, `ssl` also accepted
                $mail->Port = 587;                                    // TCP port to connect to

                $mail->setFrom('dawgrupo@gmail.com', 'Recuerdos web');
                $mail->addAddress($direccion, 'Usuario Olvidadizo');     // Add a recipient
                $mail->isHTML(true);                                  // Set email format to HTML

                $mail->Subject = 'Envio de contraseñas';
                $mail->Body    = "La contraseña que nos ha solicitado es <b>".$clave."</b>";
                $mail->AltBody = 'La contraseña que nos ha solicitado es '.$clave;

                if (!$mail->send()) {
                    echo "Error: " . $mail->ErrorInfo;
                } else {
                    echo "ok";
                }

            } else {
                echo "No existe ningún usuario con ese correo";
            }
            break;

    }
}