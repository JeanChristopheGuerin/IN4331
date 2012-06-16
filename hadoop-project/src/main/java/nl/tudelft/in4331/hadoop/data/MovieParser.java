package nl.tudelft.in4331.hadoop.data;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class MovieParser {

    private static final Log LOGGER = LogFactory.getLog(MovieParser.class);

    private MovieParser(){}

    public static Movie parseMovie(Document doc){
        LOGGER.info("Parsing movie");
        Movie movie = new Movie();

        Element root = doc.getDocumentElement();
        movie.setTitle(getTagValue("title", root));
        movie.setCountry(getTagValue("country", root));
        movie.setGenre(getTagValue("genre", root));
        movie.setSummary(getTagValue("summary", root));
        movie.setYear(getTagValue("year", root));

        NodeList nList = doc.getElementsByTagName("director");

        for (int i = 0; i < nList.getLength(); i ++){
            Node node = nList.item(i);
            if (node.getNodeType() == Node.ELEMENT_NODE){
                Element directorElement = (Element) node;
                Person director = parsePerson(directorElement);
                movie.setDirector(director);
            }
        }

        nList = doc.getElementsByTagName("actor");

        for (int i = 0; i < nList.getLength(); i ++){
            Node node = nList.item(i);
            if (node.getNodeType() == Node.ELEMENT_NODE){
                Element actorElement = (Element) node;
                Person actor = parsePerson(actorElement);
                String role = getTagValue("role", actorElement);
                movie.addActor(actor, role);
            }
        }

        return movie;
    }

    public static Person parsePerson(Element root){
        Person person = new Person();
        person.setFirstName(getTagValue("first_name", root));
        person.setLastName(getTagValue("last_name", root));
        person.setYearOfBirth(getTagValue("birth_date", root));
        return person;
    }

    public static String getTagValue(String sTag, Element eElement) {
        NodeList nList = eElement.getElementsByTagName(sTag);

        if (nList != null && nList.getLength() != 0){
            nList = nList.item(0).getChildNodes();
            return nList.item(0).getNodeValue();
        } else {
            return "";
        }
    }



}
