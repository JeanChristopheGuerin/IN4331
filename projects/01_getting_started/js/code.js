function search(form) 
{
	var title = document.forms["form_movie"]["input_title"].value;
	var genre = document.forms["form_movie"]["select_genre"].value;
	var director = document.forms["form_movie"]["input_director"].value;
	var actor = document.forms["form_movie"]["input_actor"].value;
	var year = document.forms["form_movie"]["select_year"].value;
	var keywords = document.forms["form_movie"]["input_keywords"].value;

	//alert ("You submit: " + title + " " + genre + " " + director + " " + actor + " " + year + " " + keywords);
	
	
	//queryEXist("");
	document.getElementById("div_result").innerHTML=queryEXist("");
	
	/*
	document.getElementById("div_result").innerHTML=queryEXist(
		'let 	$ms:=doc("movies/movies_alone.xml"),\
	   		 $as:=doc("movies/artists_alone.xml")\
	    							\
		for $aid in distinct-values($ms/movies/movie/actor/@id)\
		return   \
		    for $m in $ms/movies/movie\
		    where $m/actor/@id/string() = $aid\
		    return \
			<actor>\
			    {$aid},\
			    {$m/title}\
			</actor>'
	);
	*/
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

function queryEXist(query)
{
	if (window.XMLHttpRequest)
	{
		xhttp=new XMLHttpRequest();
	}
	else
	{
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xhttp.open("POST", "./php/proxy.php", false);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("ws_path=exist/rest/db/movies&_query=/");

	//return xhttp.responseXML;
	return xhttp.responseText;
}

// not finished
function displayResult()
{	
	xsl=loadXMLDoc("./xslt/transform.xsl");
	xml=loadXMLDoc("cdcatalog.xml");
	
	// code for IE
	if (window.ActiveXObject)
	{
		ex=xml.transformNode(xsl);
		document.getElementById("example").innerHTML=ex;
	}
	// code for Mozilla, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument)
	{
		xsltProcessor=new XSLTProcessor();
		xsltProcessor.importStylesheet(xsl);
		resultDocument = xsltProcessor.transformToFragment(xml,document);
		document.getElementById("example").appendChild(resultDocument);
	}
}
