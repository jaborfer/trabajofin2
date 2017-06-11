<?php
/**
 * Created by PhpStorm.
 * User: jabor
 * Date: 10/06/2017
 * Time: 6:16
 */
require_once '../vendor/phpexcel/Classes/PHPExcel.php';
$objPHPExcel = new PHPExcel();
$hoy = date("Y_m_d") ;
$jugador= $_POST["jugador"];

$filename="$jugador_$hoy.xls";

$tabla = $_POST["tabla"];

$objPHPExcel->getProperties()->setCreator("JO-JO Software")
    ->setLastModifiedBy("JO-JO")
    ->setTitle("Puntuaciones de ".$jugador)
    ->setSubject("Office 2007 XLSX Test Document")
    ->setDescription("resultados de los juegos de la web recuerdame");

$objPHPExcel->setActiveSheetIndex(0)
    ->setCellValue('A1', $tabla);
// Miscellaneous glyphs, UTF-8

$tmpfile = tempnam(sys_get_temp_dir(), 'html');
file_put_contents($tmpfile, $tabla);

// Rename worksheet
$objPHPExcel->getActiveSheet()->setTitle($filename);
// Set active sheet index to the first sheet, so Excel opens this as the first sheet
$objPHPExcel->setActiveSheetIndex(0);
// Redirect output to a client’s web browser (Excel2007)
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="'.$filename.'"');
header('Cache-Control: max-age=0');
// If you're serving to IE 9, then the following may be needed
header('Cache-Control: max-age=1');
// If you're serving to IE over SSL, then the following may be needed
header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
header ('Pragma: public'); // HTTP/1.0
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$objWriter->save('php://output');
exit;