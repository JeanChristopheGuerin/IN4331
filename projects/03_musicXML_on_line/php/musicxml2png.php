<?php
// Coverts a musicXML string to a PNG file.
// Responds to HTTP POST requests.

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
$fileLY = tempnam(sys_get_temp_dir(), "musicly"); 		// this creates the LY file
$filePNG = tempnam(sys_get_temp_dir(), "musicPNG"); 		// this creates the PNG file


//echo "Maximum post size is ".(ini_get('post_max_size'));

echo $_POST['musicxml']; // Only for testing.

$handleMusicXML = fopen($fileMusicXML, "w");
fwrite($handleMusicXML, $_POST['musicxml'] );
fclose($handleMusicXML);

exec("musicxml2ly -o " + $fileLY + " " + $fileMusicXML);
exec("lilypond --png -o" + $filePNG + " " + $fileLY);

//header("Content-type: application/PNG");			// set a header to tell the browser what kind of file I'm about to send
//$PNG = file_get_contents($filePNG);				// then read in the .PNG file
//echo $PNG;							// and the file out to the browser

echo base64_encode_image( $filePNG, 'png' );

//unlink($fileMusicXML);						// this removes the XML file
//unlink($fileLY); 						// this removes the LY file
//unlink($filePNG); 						// this removes the LY file


function base64_encode_image ($filename = null, $filetype) 
{
    if ($filename) 
    {
        $imgbinary = fread(fopen($filename, "r"), filesize($filename));
        return '<img src="data:image/' . $filetype . ';base64,' . base64_encode($imgbinary) . '"/>';
    }
}

?>
