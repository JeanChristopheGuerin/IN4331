package nl.tudelft.in4331.hadoop.ex19_5_4;

import nl.tudelft.in4331.hadoop.commons.Normalizer;
import nl.tudelft.in4331.hadoop.commons.TextArrayWritable;
import nl.tudelft.in4331.hadoop.data.Movie;
import nl.tudelft.in4331.hadoop.data.MovieParser;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.Writable;
import org.apache.hadoop.mapreduce.Mapper;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.*;
import java.util.*;

/**
 * Normalizes corpus of XML documents.
 */
public class NormalizationMapper extends Mapper<Object, Text, Text, TextArrayWritable> {

    private static final Log LOGGER = LogFactory.getLog(NormalizationMapper.class);

    private DocumentBuilder parser;

    public NormalizationMapper() {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        try {
            parser = factory.newDocumentBuilder();
        } catch (ParserConfigurationException e) {
            LOGGER.error("Caught " + e);
            throw new RuntimeException(e);
        }
    }

    public void map(Object key, Text value, Context context) throws IOException, InterruptedException {

        String stringValue = value.toString();
        InputStream inputStream = new ByteArrayInputStream(stringValue.getBytes());
        Reader reader = new InputStreamReader(inputStream, "UTF-8");
        InputSource is = new InputSource(reader);
        is.setEncoding("UTF-8");

        Document doc;

        try {
            doc = parser.parse(is);
            doc.getDocumentElement().normalize();

        } catch (SAXException e) {
            LOGGER.error("Caught " + e);
            throw new RuntimeException(e);
        }

        Movie movie = MovieParser.parseMovie(doc);

        Map<String, List<String>> wordPositions = Normalizer.normalize(movie.getSummary());
        String movieId = String.valueOf(movie.getTitle().hashCode()).substring(0,2);

        for (String term : wordPositions.keySet()) {
            Writable[] tuples = {
                    new Text(movieId),
                    new Text(":" + StringUtils.join(wordPositions.get(term).toArray(new String[1]), ","))};
            TextArrayWritable writableArrayWritable = new TextArrayWritable();
            writableArrayWritable.set(tuples);
            context.write(new Text(term), writableArrayWritable);
        }
    }

}
