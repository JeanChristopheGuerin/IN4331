package nl.tudelft.in4331.hadoop;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;

import java.io.IOException;
import java.util.Scanner;

public class Authors {

    /**
     * The Mapper class -- it takes a line from the input file and
     * extracts the string before the first tab (= the author name)
     */
    public static class AuthorsMapper extends Mapper<LongWritable, Text, Text, IntWritable> {
        private final static IntWritable one = new IntWritable(1);
        private Text author = new Text();

        public void map(LongWritable key, Text value, Context context)
                throws IOException, InterruptedException {
            /* Open a Java scanner object to parse the line */
            Scanner line = new Scanner(value.toString());
            line.useDelimiter("\t");
            author.set(line.next());
            context.write(author, one);
        }
    }

    /**
     * The Reducer class -- receives pairs (author name, <list of counts>)
     * and sums up the counts to get the number of publications per author
     */
    public static class CountReducer extends Reducer<Text, IntWritable, Text, IntWritable> {
        private IntWritable result = new IntWritable();

        public void reduce(Text key, Iterable<IntWritable> values, Context context)
            throws IOException, InterruptedException {

            /* Iterate on the list to compute the count */
            int count = 0;
            for (IntWritable val : values) {
                count += val.get();
            }
                result.set(count);
                context.write(key, result);
            }
        }
    }