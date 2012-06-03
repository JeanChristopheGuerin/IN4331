var file = "db/movies/movies.xml";
var transform2movielistFile = "./xslt/transform2movielist.xsl";
var transform2movieFile = "./xslt/transform2movie.xsl";
var transform2inputsFile = "./xslt/transform2inputs.xsl";
var elementMovies = "div_movies";
var elementMovie = "div_movie";
var elementGenre = "select_genre";
var elementYear = "select_year";

function loadDynamicContent()
{
	loadGenres();
	loadYears();
}

function loadGenres()
{
	var query = "for $g in distinct-values(/movies/movie/genre) return <genre> {$g} </genre>";
	var genres = queryEXist(file, query);
	var transform2inputs = loadXMLDoc(transform2inputsFile);
	
	displayResult(genres, transform2inputs, elementGenre);
}

function loadYears()
{
	var query = "for $y in distinct-values(/movies/movie/year) return <year> {$y} </year>";
	var genres = queryEXist(file, query);
	var transform2inputs = loadXMLDoc(transform2inputsFile);
	
	displayResult(genres, transform2inputs, elementYear);
}

function buildSearchQuery(title, genre, director, actor, year, keywords)
{
	var query = 
	
   	"for $m in /movies/movie " + 
	"where (string-length('" + title + "') > 0 and contains($m/title, '" + title + "')) " +
	"or (string-length('" + director + "') > 0 and (some $d in $m/director satisfies  contains(concat($d/first_name/text(), ' ' ,$d/last_name/text()), '" + director + "'))) " +
	"or (string-length('" + actor + "') > 0 and (some $a in $m/actor satisfies  contains(concat($a/first_name/text(), ' ' ,$a/last_name/text()), '" + actor + "'))) " +
	"or (some $k in tokenize(normalize-space('" + keywords + "'), '\s+') satisfies contains($m/summary/text(), $k)) " +
	"and $m/genre='" + genre + "' " + 
	"and $m/year='" + year + "' " +
	"return $m";
	return query;
}

function search(form) 
{
	var title = document.forms["form_movie"]["input_title"].value;
	var genre = document.forms["form_movie"]["select_genre"].value;
	var director = document.forms["form_movie"]["input_director"].value;
	var actor = document.forms["form_movie"]["input_actor"].value;
	var year = document.forms["form_movie"]["select_year"].value;
	var keywords = document.forms["form_movie"]["input_keywords"].value;
	
	var query = buildSearchQuery(title, genre, director, actor, year, keywords);
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

// for $m in doc('/db/movies/movies.xml')/movies/movie where title="A History of Violence" return $m
// for $g in distinct-values(doc('/db/movies/movies.xml')/movies/movie/genre) return <genre> {$g} </genre>
// for $m in doc('/db/movies/movies.xml')/movies/movie where contains($m/title, "bla") or (some $d in $m/director satisfies  contains(concat($d/first_name/text(), " " ,$d/last_name/text()), "bar")) or (some $a in $m/actor satisfies  contains(concat($a/first_name/text(), " " ,$a/last_name/text()), "bar")) or (some $k in tokenize(normalize-space("foo bar family"), "\s+") satisfies contains($m/summary/text(), $k)) and $m/genre="Crime" and $m/year="2005" return $m
// Query above misses check for strings of length zero.
