var collection = "db/music";

var transformMovementsListFile = "./xslt/transformMovementsList.xsl";
var transformMovementSummaryFile = "./xslt/transformMovementSummary.xsl";
var transform2lyricsFile = "./xslt/transform2lyrics.xsl";

var elementMovements = "div_movements";
var elementMovementContents = "div_movement_contents";
var elementMovementLyrics = "div_movement_lyrics";
var elementMovementSheetmusic = "div_movement_sheetmusic";

function loadMovements()
{
	query =
	"<movements>{" + 
		"for $movement in collection('/db/music')/score-partwise " +
		 "let $movement-title := $movement/movement-title/text(), " +
		 "    $work-title := concat($movement/work/work-number, ' ', $movement/work/work-title) " +
		 "return " +
		     "<movement> " +
			 "<title>{ " +
			      "if (fn:string($movement-title) != '')" +
			         "then fn:data($movement-title) " +
			         "else $work-title " +
			 "}</title> " +
			 "<composer>{$movement/identification/creator[@type=\"composer\"]/text()}</composer> " +
			 "<lyricist>{$movement/identification/creator[@type=\"lyricist\"]/text()}</lyricist> " +
		     "</movement>" + 
	"}</movements>";

	var movements = queryExist(query);
	var transformMovementsList = loadXMLDoc(transformMovementsListFile);
	displayResult(movements, transformMovementsList, elementMovements);
}

function showSummary(title)
{
    var query =
         "for $movement in collection('/db/music')/score-partwise " +
         "let $movement-title := $movement/movement-title/text(), " +
         "    $work-title := concat($movement/work/work-number, ' ', $movement/work/work-title) " +
         "where $movement-title = '" + title + "' or " +
                 "$work-title = '" + title + "' " +
         "return " +
             "<movement> " +
                 "<title>{ " +
                      "if (fn:string($movement-title) != '')" +
                         "then fn:data($movement-title) " +
                         "else $work-title " +
                 "}</title> " +
                 "<composer>{$movement/identification/creator[@type=\"composer\"]/text()}</composer> " +
                 "<lyricist>{$movement/identification/creator[@type=\"lyricist\"]/text()}</lyricist> " +
             "</movement>";

    var movement = queryExist(query);
    var transformMovementContents = loadXMLDoc(transformMovementSummaryFile);

    displayResult(movement, transformMovementContents, elementMovementContents);
    
    showLyrics(title);
    
    showSheetMusic(title);
}

function showLyrics(title)
{
	var query =
		"<lyrics>" + 
    			"{for $movement in collection('/db/music')/score-partwise " + 
        			"let 	$movement-title := $movement/movement-title/text()," +
    					"$work-title := concat($movement/work/work-number, ' ', $movement/work/work-title) " +
    				"where $movement-title = '" + title + "' or $work-title = '" + title + "' " +
    				"return " + 
            			"$movement/part/measure/note/lyric}" + 
		"</lyrics>";
	var lyrics = queryExist(query);
    	var transform2lyrics = loadXMLDoc(transform2lyricsFile);

    	displayResult(lyrics, transform2lyrics, elementMovementLyrics);
}

function showSheetMusic(title)
{
    var query =
        "for $movement in collection('/db/music')/score-partwise " +
            "let $movement-title := $movement/movement-title/text(), " +
             "    $work-title := concat($movement/work/work-number, ' ', $movement/work/work-title) " +
             "where $movement-title = '" + title + "' or " +
                 "$work-title = '" + title + "' " +
             "return $movement";

    var sheetMusicXMLText = queryExist(query, true);    
    var  sheetMusicPDFURL = musicXML2PDF(sheetMusicXMLText);
    
    //console.debug( sheetMusicPDFURL);
    
    //window.open( sheetMusicPDFURL, "_blank");
    document.getElementById(elementMovementSheetmusic).innerHTML = "";
    document.getElementById(elementMovementSheetmusic).innerHTML = "<h2> Music Sheet </h2> <iframe src='" + sheetMusicPDFURL + "'> </iframe>";
    
}

function queryExist(query, responseText)
{
	// code for Mozilla, Firefox, Opera, etc.
	if (window.XMLHttpRequest)
	{
		xhttp=new XMLHttpRequest();
	}
	// code for IE
	else
	{
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xhttp.open("POST", "./php/proxy.php", false);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("ws_path=exist/rest/music" + "&_wrap=no&_query=" + query);

	if (typeof responseText == 'undefined')
	{
		return xhttp.responseXML;
	}
	else
	{
		return xhttp.responseText;
	}
}

function musicXML2PDF( xmlString )
{
	// code for Mozilla, Firefox, Opera, etc.
	if (window.XMLHttpRequest)
	{
		xhttp=new XMLHttpRequest();
	}
	// code for IE
	else
	{
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	//console.log(xmlString);
	
	xhttp.open("POST", "./php/musicxml2pdf.php", false);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.setRequestHeader("Content-length", xmlString.length);
	xhttp.send("musicxml=" + encodeURIComponent(xmlString));

	return xhttp.responseText;
}

function displayResult(xml, xsl, elementID)
{		
	// code for IE
	if (window.ActiveXObject)
	{
		ex=xml.transformNode(xsl);
		document.getElementById(elementID).innerHTML=ex;
	}
	// code for Mozilla, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument)
	{
		xsltProcessor=new XSLTProcessor();
		xsltProcessor.importStylesheet(xsl);
		resultDocument = xsltProcessor.transformToFragment(xml,document);
		document.getElementById(elementID).innerHTML = "";
		document.getElementById(elementID).appendChild(resultDocument);
	}
}

function loadXMLDoc(dname)
{
    if (window.XMLHttpRequest)
    {
        xhttp=new XMLHttpRequest();
    }
    else
    {
        xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", dname, false);
    xhttp.send();

    return xhttp.responseXML;
}

