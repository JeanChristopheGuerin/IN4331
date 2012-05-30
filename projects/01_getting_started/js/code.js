function search(form) 
{
	var title = document.forms["form_movie"]["input_title"].value;
	var genre = document.forms["form_movie"]["select_genre"].value;
	var director = document.forms["form_movie"]["input_director"].value;
	var actor = document.forms["form_movie"]["input_actor"].value;
	var year = document.forms["form_movie"]["select_year"].value;
	var keywords = document.forms["form_movie"]["input_keywords"].value;

	alert ("You submit: " + title + " " + genre + " " + director + " " + actor + " " + year + " " + keywords);
}

// not finished
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
	
	xhttp.open("GET",dname,false);
	xhttp.send("");
	return xhttp.responseXML;
}

// not finished
function displayResult()
{
	xml=loadXMLDoc("cdcatalog.xml");
	xsl=loadXMLDoc("./xslt/transform.xsl");
	
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
