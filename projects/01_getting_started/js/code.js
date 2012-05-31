function search(form) 
{
	var title = document.forms["form_movie"]["input_title"].value;
	var genre = document.forms["form_movie"]["select_genre"].value;
	var director = document.forms["form_movie"]["input_director"].value;
	var actor = document.forms["form_movie"]["input_actor"].value;
	var year = document.forms["form_movie"]["select_year"].value;
	var keywords = document.forms["form_movie"]["input_keywords"].value;

	//alert ("You submit: " + title + " " + genre + " " + director + " " + actor + " " + year + " " + keywords);
	
	var result = queryEXist("for $m in /movies/movie where year>2003 return $m");
	transform=loadXMLDoc("./xslt/transform2movielist.xsl");
	//document.getElementById("div_result").innerHTML=result;
	displayResult(result, transform);
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
	xhttp.send("ws_path=exist/rest/db/movies/movies.xml&_query="+query);

	return xhttp.responseXML;
	//return xhttp.responseText;
}

function displayResult(xml, xsl)
{		
	// code for IE
	if (window.ActiveXObject)
	{
		ex=xml.transformNode(xsl);
		document.getElementById("div_result").innerHTML=ex;
	}
	// code for Mozilla, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument)
	{
		xsltProcessor=new XSLTProcessor();
		xsltProcessor.importStylesheet(xsl);
		resultDocument = xsltProcessor.transformToFragment(xml,document);
		document.getElementById("div_result").appendChild(resultDocument);
	}
}
