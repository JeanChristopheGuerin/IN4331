package nl.tudelft.in4331.hadoop.ex19_5_2;

import nl.tudelft.in4331.hadoop.data.Movie;
import nl.tudelft.in4331.hadoop.data.MovieParser;
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
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.*;
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
        InputStream inputStream = new ByteArrayInputStream(stringValue.getBytes());
        Reader reader = new InputStreamReader(inputStream,"UTF-8");
        InputSource is = new InputSource(reader);
        is.setEncoding("UTF-8");
        Document doc;

        try {
            doc = parser.parse(is);
            doc.getDocumentElement().normalize();

        } catch (SAXException e){
            LOGGER.error("Caught " + e);
            throw new RuntimeException(e);
        }

        Movie movie = MovieParser.parseMovie(doc);
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

}
