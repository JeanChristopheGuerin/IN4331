package nl.tudelft.in4331.hadoop.ex19_5_2;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;

import java.io.IOException;

public class MoviesReducer extends Reducer<IntWritable, Text, IntWritable, Text>{

    public void reduce(IntWritable key, Iterable<Text> values, Reducer.Context context)
            throws IOException, InterruptedException{
        for (Text v : values){
            context.write(key, v);
        }

    }

}
