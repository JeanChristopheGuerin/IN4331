package nl.tudelft.in4331.hadoop.ex19_5_4;

import nl.tudelft.in4331.hadoop.commons.TextArrayWritable;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;

import java.io.IOException;

/**
 * Reducer for movies.xml normalization
 */
public class NormalizationReducer extends Reducer<Text, TextArrayWritable, Text, IntWritable> {
    public void reduce(Text key, Iterable<TextArrayWritable> values, Context context)
            throws IOException, InterruptedException {
        int sum = 0;
        for (TextArrayWritable tw : values) {
            sum += tw.toStrings()[1].split(",").length;
        }
        context.write(key, new IntWritable(sum));
    }
    
}
