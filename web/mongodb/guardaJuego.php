<?php
/**
 * Created by PhpStorm.
 * User: jabor
 * Date: 27/03/2017
 * Time: 6:05
 */

require '../vendor/autoload.php';
/*$client = new MongoDB\Client;
$mibase = $client->recuerdaMongo;*/

$uri="mongodb://recuerdameclient:mu0056as@ds157500.mlab.com:57500/recuerdame";
$client = new MongoDB\Client($uri);
$mibase = $client->recuerdame;

$lacoleccion = $mibase->juego;
/*$insertauno=$lacoleccion->insertMany([
    ['nombre' => 'cuadrados01', 'tipo' =>'memoria', 'descripcion'=>'El juego muestra unos cuadrados encendidos que luego hay que recordar'],
    ['nombre' => 'parejas01', 'tipo' =>'memoria', 'descripcion'=>'Hay que ir descubriendo las cartas y buscar las parejas']
    ]);*/


/*$insertauno=$lacoleccion->insertMany([
    ['nombre' => 'sudoku01', 'tipo' =>'matemático', 'descripcion'=>'Rellenar las casillas con números, pero no puede haber dos iguales en su fila, columna, o sección'],
    ['nombre' => 'simon', 'tipo' =>'memoria', 'descripcion'=>'Secuencia de colores y sonidos que hay que repetir, cada turno la secuencia va aumentando'],
    ['nombre' => 'operaciones01', 'tipo' =>'matemátio', 'descripcion'=>'Se muestra los números y resultado implicados en una sencilla operación, y hay que deducir de que operación se trata'],
    ['nombre' => 'monedas01', 'tipo' =>'matemático', 'descripcion'=>'Se muestran diferentes monedas, y se debe contar cuanto dinero suman las mismas'],
    ['nombre' => 'secuencia01', 'tipo' =>'lógica', 'descripcion'=>'Se muestras los diferentes elementos de una secuencia lógica, y corresponde ordenarlos']
    ]);*/
	
$insertauno=$lacoleccion->insertMany([
    ['nombre' => 'mahjong01', 'tipo' =>'agudeza visual', 'descripcion'=>'Elimina las parejas hasta quedarte sin fichas, pero recuerda, solo podrás seleccionar las fichas que no estén atrapadas por ambos lados.'],
    ['nombre' => 'atrapala', 'tipo' =>'agilidad', 'descripcion'=>'Atrapa la pelota que bota de un lado a otro de la pantalla']
    ]);

printf("ha insertado %d elementons</br>",$insertauno->getInsertedCount());
echo'<pre>';

$listadoc =$lacoleccion->find();
foreach ($listadoc as $doc) {
    echo '<pre>';
    var_dump($doc);
    echo '</pre>';
}

/* este bloque es para hacerlo directamente desde la web
{
    "nombre": "parejas01",
    "tipo": "memoria",
    "descripcion": "Hay que ir descubriendo las cartas y buscando las parejas"
}*/