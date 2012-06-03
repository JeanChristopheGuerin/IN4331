var collection = "db/shakespeare/plays";

var transformPlaysListFile = "./xslt/transformPlaysList.xsl";
var transformPlayTitleFile = "./xslt/transformPlayTitle.xsl";
var transformPlayPartsFile = "./xslt/transformPlayParts.xsl";
var transformPlayTocFile = "./xslt/transformPlayToc.xsl";

var elementPlays = "div_plays";
var elementPlayTitle = "div_play_title"
var elementPlayContents = "div_play_contents";

function loadPlays()
{
	query =
        "for $play in collection('/db/shakespeare/plays') " +
        "order by $play/PLAY/TITLE/text() " +
        "return $play/PLAY/TITLE";
		
	var titles = queryExist(query);
	var transformPlaysList = loadXMLDoc(transformPlaysListFile);
	displayResult(titles, transformPlaysList, elementPlays);
	
}

function showTitle(title){
    var query =
        "for $play in collection('/db/shakespeare/plays') " +
        "where $play/PLAY/TITLE/text() = '" + title + "'" +
        "return $play/PLAY/TITLE";

    var play = queryExist(query);
    var transformPlayTitle = loadXMLDoc(transformPlayTitleFile);

    displayResult(play, transformPlayTitle, elementPlayTitle);
}

function showParts(title)
{
    showTitle(title);

    var query =
        "for $play in collection('/db/shakespeare/plays') " +
            "where $play/PLAY/TITLE/text() = '" + title + "'" +
            "return <PLAY>" +
                        "<ACTS>{$play/PLAY/ACT/TITLE}</ACTS>" +
                        "<SCENES>{$play/PLAY/ACT/SCENE/TITLE}</SCENES>" +
                        "<CHARACTERS>{$play/PLAY/PERSONAE/PERSONA}</CHARACTERS>" +
                   "</PLAY>";
    var play = queryExist(query);
    var transformPlayContents = loadXMLDoc(transformPlayPartsFile);

    displayResult(play, transformPlayContents, elementPlayContents);
}

function showToc(title)
{
    showTitle(title);

    var query =
        "for $play in collection('/db/shakespeare/plays') " +
        "where $play/PLAY/TITLE/text() = '" + title + "' " +
        "return " +
            "<ToC>{ " +
                "for $act in $play/PLAY/ACT " +
                "return " +
                    "<ACT> " +
                        "{$act/TITLE} " +
                            "{for $scene in $act/SCENE " +
                            "return " +
                                "<SCENE> " +
                                    "{$scene/TITLE} " +
                                    "{for $actor in distinct-values($scene/SPEECH/SPEAKER/text()) " +
                                    "order by $actor " +
                                    "return <ACTOR>{$actor}</ACTOR> } " +
                                "</SCENE>} " +
                    "</ACT> } " +
            "</ToC> ";


    var play = queryExist(query);
    var transformPlayContents = loadXMLDoc(transformPlayTocFile);

    displayResult(play, transformPlayContents, elementPlayContents);
}

function showSummary(title)
{
    var query = "for $play in /movies/movie where title='" + title + "' return $m";
    var play = queryExist(file, query);
    var transformPlay = loadXMLDoc(transformPlayFile);

    displayResult(play, transformPlay, elementPlayContents);
}

function queryExist(query)
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
	xhttp.send("ws_path=exist/rest/shakespeare" + "&_query=" + query);

	return xhttp.responseXML;
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

