package nl.tudelft.in4331.hadoop.ex19_5_2;

import nl.tudelft.in4331.hadoop.commons.Constants;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.output.MultipleOutputs;

import java.io.IOException;

public class MoviesReducer extends Reducer<IntWritable, Text, NullWritable, Text>{
    private static final Log LOGGER = LogFactory.getLog(MoviesReducer.class);

//    private MultipleOutputs<NullWritable, Text> multipleOutputs;
//
//    @Override
//    public void setup(Context context) {
//        multipleOutputs = new MultipleOutputs<NullWritable, Text>(context);
//    }

    public void reduce(IntWritable key, Iterable<Text> values, Reducer.Context context)
            throws IOException, InterruptedException{

        LOGGER.info("Reducer called");

        for (Text v : values){
            LOGGER.debug(key + " " + v);
//            if (key.get() == 1){
//                LOGGER.info("Key 1 found");
//                multipleOutputs.write(Constants.OUTPUT_DIRECTOR, NullWritable.get(), v);
//            } else if (key.get() == 2){
//                multipleOutputs.write(Constants.OUTPUT_ACTOR, NullWritable.get(), v);
//            }
            context.write(NullWritable.get(), v);
        }
    }

//    @Override
//    public void cleanup(Context context) throws IOException {
//        try{
//            multipleOutputs.close();
//        } catch (InterruptedException e){
//            throw new IOException(e);
//        }
//    }


}
