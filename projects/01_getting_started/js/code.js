var file = "db/movies/movies.xml";
var transform2movielistFile = "./xslt/transform2movielist.xsl";
var transform2movieFile = "./xslt/transform2movie.xsl";
var elementMovies = "div_movies";
var elementMovie = "div_movie";

function search(form) 
{
	var title = document.forms["form_movie"]["input_title"].value;
	var genre = document.forms["form_movie"]["select_genre"].value;
	var director = document.forms["form_movie"]["input_director"].value;
	var actor = document.forms["form_movie"]["input_actor"].value;
	var year = document.forms["form_movie"]["select_year"].value;
	var keywords = document.forms["form_movie"]["input_keywords"].value;

	//alert ("You submit: " + title + " " + genre + " " + director + " " + actor + " " + year + " " + keywords);
	
	var query = "for $m in /movies/movie where year>2003 return $m";
	var movies = queryEXist(file, query);
	var transform2movielist = loadXMLDoc(transform2movielistFile);
	
	displayResult(movies, transform2movielist, elementMovies);
}

function selectMovie(title)
{
	var query = "for $m in /movies/movie where title='" + title + "' return $m";
	var movie = queryEXist(file, query);
	var transform2movie = loadXMLDoc(transform2movieFile);
	
	displayResult(movie, transform2movie, elementMovie);
}

function queryEXist(file, query)
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
	xhttp.send("ws_path=exist/rest/" + file + "&_query=" + query);

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
