var collection = "db/music";

var transformMovementsListFile = "./xslt/transformMovementsList.xsl";
var transformMovementTitleFile = "./xslt/transformMovementTitle.xsl";
var transformMovementSummaryFile = "./xslt/transformMovementSummary.xsl";
//var transformPlayPartsFile = "./xslt/transformPlayParts.xsl";
//var transformPlayTocFile = "./xslt/transformPlayToc.xsl";

//var transformPlayRoleFile = "./xslt/transformPlayRole.xsl";
//
var elementMovements = "div_movements";
var elementMovementTitle = "div_movement_title"
var elementMovementContents = "div_movement_contents";
var elementSheetMusic = "div_sheetmusic";

function loadMovements()
{
	query =
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
             "</movement>";

	var movements = queryExist(query);
	var transformMovementsList = loadXMLDoc(transformMovementsListFile);
	displayResult(movements, transformMovementsList, elementMovements);

}

function showTitle(title){
    var query =
        "for $movement in collection('/db/music')/score-partwise " +
            "let $movement-title := $movement/movement-title/text(), " +
             "    $work-title := concat($movement/work/work-number, ' ', $movement/work/work-title) " +
             "where $movement-title = '" + title + "' or " +
                 "$work-title = '" + title + "' " +
             "return " +
                 "<title>{ " +
                      "if (fn:string($movement-title) != '')" +
                         "then fn:data($movement-title) " +
                         "else $work-title " +
                 "}</title> ";

    var play = queryExist(query);
    var transformMovementTitle = loadXMLDoc(transformMovementTitleFile);

    displayResult(play, transformMovementTitle, elementMovementTitle);
}

function showSheetMusic(title)
{
    var query =
        "for $movement in collection('/db/music')/score-partwise " +
            "let $movement-title := $movement/movement-title/text(), " +
             "    $work-title := concat($movement/work/work-number, ' ', $movement/work/work-title) " +
             "where $movement-title = '" + title + "' or " +
                 "$work-title = '" + title + "' " +
             "return " +
                 "<score-partwise>{ " +
                      "$movement" +
                 "}</score-partwise> ";

    var sheetMusicXMLText = queryExist(query, true);
    
    //console.debug(sheetMusicXMLText);
    
    var sheetMusicPNG = musicXML2PNG(sheetMusicXMLText);
    
    console.debug(sheetMusicPNG);
    
    document.getElementById(elementSheetMusic).innerHTML = "";
    document.getElementById(elementSheetMusic).appendChild( sheetMusicPNG );
    
}

function showSummary(title)
{

    showTitle(title);
    //showSheetMusic(title); // ENABLE THIS TO SEE RESULT OF PHP SCRIPT

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
}

//function showParts(title)
//{
//    showTitle(title);
//
//    var query =
//        "for $play in collection('/db/shakespeare/plays') " +
//        "where $play/PLAY/TITLE/text() = '"  + title + "' " +
//        "return <PLAY> " +
//        "<ACTS>{ " +
//            "for $act in $play/PLAY/ACT/TITLE " +
//            "order by $act " +
//            " return <ACT>{$act/text()}</ACT> " +
//        "}</ACTS> " +
//        "<SCENES>{ " +
//            "for $scene in $play/PLAY/ACT/SCENE/TITLE " +
//            "order by $scene " +
//            "return <SCENE>{$scene/text()}</SCENE> " +
//            "}</SCENES> " +
//            "<CHARACTERS>{ " +
//                "for $persona in distinct-values($play/PLAY/ACT/SCENE/SPEECH/SPEAKER) " +
//                "order by $persona " +
//                "return <CHARACTER>{$persona}</CHARACTER> " +
//            "}</CHARACTERS> " +
//        "</PLAY>";
//
//    var play = queryExist(query);
//    var transformPlayContents = loadXMLDoc(transformPlayPartsFile);
//
//    displayResult(play, transformPlayContents, elementPlayContents);
//}
//
//function showToc(title)
//{
//    showTitle(title);
//
//    var query =
//        "for $play in collection('/db/shakespeare/plays') " +
//        "where $play/PLAY/TITLE/text() = '" + title + "' " +
//        "return " +
//            "<ToC>{ " +
//                "for $act in $play/PLAY/ACT " +
//                "return " +
//                    "<ACT> " +
//                        "{$act/TITLE} " +
//                            "{for $scene in $act/SCENE " +
//                            "return " +
//                                "<SCENE> " +
//                                    "{$scene/TITLE} " +
//                                    "{for $actor in distinct-values($scene/SPEECH/SPEAKER/text()) " +
//                                    "order by $actor " +
//                                    "return <ACTOR>{$actor}</ACTOR> } " +
//                                "</SCENE>} " +
//                    "</ACT> } " +
//            "</ToC> ";
//
//
//    var play = queryExist(query);
//    var transformPlayContents = loadXMLDoc(transformPlayTocFile);
//
//    displayResult(play, transformPlayContents, elementPlayContents);
//}
//
//
//function searchParts(form){
//    var act = document.forms["form_parts"]["select_act"].value;
//    var scene = document.forms["form_parts"]["select_scene"].value;
//    var persona = document.forms["form_parts"]["select_persona"].value;
//
//    var query =
//
//        "for $play in collection('/db/shakespeare/plays') " +
//        "let $act := $play/PLAY/ACT, " +
//        "$scene := $act/SCENE " +
//        "where $act/TITLE/text() = '" + act + "' " +
//        "and $scene/TITLE/text() = '" + scene + "' " +
//        "return <ROLE> " +
//        "<ACT>" + act + "</ACT> " +
//        "<SCENE>" + scene + "</SCENE> " +
//        "<SPEAKER>" + persona + "</SPEAKER> " +
//        "{ " +
//        "for $speech in $scene/SPEECH " +
//        "where $speech/SPEAKER/text() = '" + persona + "' " +
//        "return $speech/LINE " +
//        "}</ROLE>";
//
//    var play = queryExist(query);
//    var transformPlayContents = loadXMLDoc(transformPlayRoleFile);
//
//    displayResult(play, transformPlayContents, elementPlayContents);
//}

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
	xhttp.send("ws_path=exist/rest/music" + "&_query=" + query);

	if (typeof responseText == 'undefined')
	{
		return xhttp.responseXML;
	}
	else
	{
		return xhttp.responseText;
	}
}

function musicXML2PNG( xmlString )
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
	
	xhttp.open("POST", "./php/musicxml2png.php", false);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.setRequestHeader("Content-length", xmlString.length);
	xhttp.send("musicxml=" + xmlString);

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

