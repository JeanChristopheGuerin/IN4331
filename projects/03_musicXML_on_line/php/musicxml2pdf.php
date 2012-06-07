<?php
// Coverts a musicXML string to a PDF file.
// Responds to HTTP POST requests.

$tmp_url_path ='http://localhost/in4331/03/tmp/';
$tmp_path = dirname(dirname($_SERVER['SCRIPT_FILENAME']))."/tmp/";

//Stripping slasses from quotes
if (get_magic_quotes_gpc()) {
        function stripslashes_deep($value) {
            $value = is_array($value) ?
                     array_map('stripslashes_deep', $value) :
                     stripslashes($value);
            return $value;
        }

        $_POST = array_map('stripslashes_deep', $_POST);
        $_GET = array_map('stripslashes_deep', $_GET);
        $_COOKIE = array_map('stripslashes_deep', $_COOKIE);
        $_REQUEST = array_map('stripslashes_deep', $_REQUEST);
}

$fileMusicXML = tempnam(sys_get_temp_dir(), "musicxml"); 	// this creates the XML file

$fileLY = $fileMusicXML.".ly";					// this creates the LY filename
$filePS = $fileMusicXML.".ps";					// this creates the PS filename
$filePDF = $fileMusicXML.".pdf";				// this creates the PDF filename

$path_parts = pathinfo($filePDF);				// obtain the filename of the PDF file without the path
$filenamePDF = $path_parts['basename'];

$link_tmp = $tmp_path.$filenamePDF;


$handleMusicXML = fopen($fileMusicXML, "w");
fwrite($handleMusicXML, $_POST['musicxml'] );
fclose($handleMusicXML);

exec("musicxml2ly -o ".$fileLY." ".$fileMusicXML, $musicxml2ly_output, $musicxml2ly_return_var);
exec("lilypond --pdf -o ".$fileMusicXML." ".$fileLY, $lilypond_output, $lilypond_return_var);
exec("ln -s ".$filePDF." ".$link_tmp);

$tmp_url = $tmp_url_path.$filenamePDF;

### set a header to tell the browser what kind of file is about to be send
header("Content-type: text/plain");

echo $tmp_url;

//sleep(30);

unlink($fileMusicXML);						// this removes the XML file
unlink($fileLY); 						// this removes the LY file
unlink($filePS); 						// this removes the PDF file
//unlink($filePDF); 						// this removes the PDF file
//unlink($link_tmp);

?>
