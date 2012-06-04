var collection = "db/shakespeare/plays";

var transformPlaysListFile = "./xslt/transformPlaysList.xsl";
var transformPlayTitleFile = "./xslt/transformPlayTitle.xsl";
var transformPlayPartsFile = "./xslt/transformPlayParts.xsl";
var transformPlayTocFile = "./xslt/transformPlayToc.xsl";
var transformPlaySummaryFile = "./xslt/transformPlaySummary.xsl";
var transformPlayRoleFile = "./xslt/transformPlayRole.xsl";

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
        "where $play/PLAY/TITLE/text() = '"  + title + "' " +
        "return <PLAY> " +
        "<ACTS>{ " +
            "for $act in $play/PLAY/ACT/TITLE " +
            "order by $act " +
            " return <ACT>{$act/text()}</ACT> " +
        "}</ACTS> " +
        "<SCENES>{ " +
            "for $scene in $play/PLAY/ACT/SCENE/TITLE " +
            "order by $scene " +
            "return <SCENE>{$scene/text()}</SCENE> " +
            "}</SCENES> " +
            "<CHARACTERS>{ " +
                "for $persona in distinct-values($play/PLAY/ACT/SCENE/SPEECH/SPEAKER) " +
                "order by $persona " +
                "return <CHARACTER>{$persona}</CHARACTER> " +
            "}</CHARACTERS> " +
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

    showTitle(title);

    var query =
        "for $play in collection('/db/shakespeare/plays') " +
        "where $play/PLAY/TITLE/text() = '" + title + "' " +
        "return " +
            "<SUMMARY> " +
            "<AUTHOR>W. Shakespeare</AUTHOR> " +
            "{$play/PLAY/TITLE} " +
            "<PERSONAE> { " +
                "for $prs in $play/PLAY/PERSONAE/PERSONA " +
                "return $prs } " +
            "</PERSONAE> " +
            "</SUMMARY>";

    var play = queryExist(query);
    var transformPlayContents = loadXMLDoc(transformPlaySummaryFile);

    displayResult(play, transformPlayContents, elementPlayContents);
}

function searchParts(form){
    var act = document.forms["form_parts"]["select_act"].value;
    var scene = document.forms["form_parts"]["select_scene"].value;
    var persona = document.forms["form_parts"]["select_persona"].value;

    var query =

        "for $play in collection('/db/shakespeare/plays') " +
        "let $act := $play/PLAY/ACT, " +
        "$scene := $act/SCENE " +
        "where $act/TITLE/text() = '" + act + "' " +
        "and $scene/TITLE/text() = '" + scene + "' " +
        "return <ROLE> " +
        "<ACT>" + act + "</ACT> " +
        "<SCENE>" + scene + "</SCENE> " +
        "<SPEAKER>" + persona + "</SPEAKER> " +
        "{ " +
        "for $speech in $scene/SPEECH " +
        "where $speech/SPEAKER/text() = '" + persona + "' " +
        "return $speech/LINE " +
        "}</ROLE>";

    var play = queryExist(query);
    var transformPlayContents = loadXMLDoc(transformPlayRoleFile);

    displayResult(play, transformPlayContents, elementPlayContents);
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

