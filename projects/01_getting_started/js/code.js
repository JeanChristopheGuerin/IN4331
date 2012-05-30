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
