package nl.tudelft.in4331.hadoop.ex19_5_2;

import nl.tudelft.in4331.hadoop.data.Movie;
import nl.tudelft.in4331.hadoop.data.Person;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.Set;

public class MoviesMapper extends Mapper<Object, Text, IntWritable, Text> {

    private static final Log LOGGER = LogFactory.getLog(MoviesMapper.class);

    private DocumentBuilder parser;

    public MoviesMapper(){
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        try{
            parser = factory.newDocumentBuilder();
        } catch (ParserConfigurationException e){
            LOGGER.error("Caught " + e);
            throw new RuntimeException(e);
        }
    }

    public void map(Object key, Text value, Context context) throws IOException, InterruptedException{
        String stringValue = value.toString();
        InputStream is = new ByteArrayInputStream(stringValue.getBytes());
        Document doc;

        try {
            doc = parser.parse(is);
            doc.getDocumentElement().normalize();

        } catch (SAXException e){
            LOGGER.error("Caught " + e);
            throw new RuntimeException(e);
        }

        Movie movie = parseMovie(doc);
        String directorOutput =
                movie.getDirector().getFirstName() + " " +
                movie.getDirector().getLastName() + "\t" +
                movie.getTitle() + "\t" +
                movie.getYear();

        context.write(new IntWritable(1), new Text(directorOutput));

        for (Map.Entry<String,Person> entry : movie.getActors().entrySet()){
            String actorOutput =
                    movie.getTitle() + "\t" +
                    entry.getValue().getFirstName() + " " +
                    entry.getValue().getLastName() + "\t" +
                    entry.getValue().getYearOfBirth() + "\t" +
                    entry.getKey();
            context.write(new IntWritable(2), new Text(actorOutput));
        }
    }

    private Movie parseMovie(Document doc){
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

    private Person parsePerson(Element root){
        Person person = new Person();
        person.setFirstName(getTagValue("first_name", root));
        person.setLastName(getTagValue("last_name", root));
        person.setYearOfBirth(getTagValue("birth_date", root));
        return person;
    }

    private static String getTagValue(String sTag, Element eElement) {
        NodeList nList = eElement.getElementsByTagName(sTag);

        if (nList != null && nList.getLength() != 0){
            nList = nList.item(0).getChildNodes();
            return nList.item(0).getNodeValue();
        } else {
            return "";
        }
    }


}
