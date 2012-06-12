package nl.tudelft.in4331.hadoop.data;

import java.util.HashMap;
import java.util.Map;

public class Movie {

    private String title;
    private String year;
    private String summary;
    private String country;
    private String genre;
    private Person director;
    private Map<String, Person> actors = new HashMap<String, Person>();

    public Movie(){}

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Map<String, Person> getActors() {
        return actors;
    }

    public void addActor(Person person, String role){
        actors.put(role, person);
    }

    public Person getDirector() {
        return director;
    }

    public void setDirector(Person director) {
        this.director = director;
    }
}
