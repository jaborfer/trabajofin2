<?php

$hoy = date("Y_m_d") ;


$filename = $_POST["jugador"];
$filename.="_$hoy.xls";

$tabla = $_POST["tabla"];

require_once '../vendor/phpexcel/Classes/PHPExcel.php';

print $filename;
print $tabla;

$tmpfile = tempnam(sys_get_temp_dir(), 'html');
file_put_contents($tmpfile, $tabla);

print "aqui1";

$objPHPExcel = new PHPExcel();
print "crea el objeto...";
$excelHTMLReader = PHPExcel_IOFactory::createReader('HTML');
print "crea el reader de html";
$excelHTMLReader->loadIntoExisting($tmpfile, $objPHPExcel);
print "pues eso";
//$objPHPExcel->getActiveSheet()->setTitle('any name you want');

print "aqui2";

unlink($tmpfile); 

print "aqui3";

header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); 
header('Content-Disposition: attachment;filename='.$filename); 
header('Cache-Control: max-age=0');

print "aqui4";

$writer = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$writer->save('php://output');
print "Descargando excel de resultados, espere un momento...";
