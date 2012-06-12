package nl.tudelft.in4331.hadoop.ex19_5_2;

import nl.tudelft.in4331.hadoop.commons.Constants;
import nl.tudelft.in4331.hadoop.commons.XmlInputFormat;
import org.apache.commons.configuration.Configuration;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.mapreduce.lib.output.MultipleOutputs;
import org.apache.hadoop.mapreduce.lib.output.TextOutputFormat;

import java.io.File;

public class MoviesJob {

    /**
     * Configures and runs the job with Hadoop
     * @param args command-line arguments
     * @throws Exception
     */
    public static void main(String[] args) throws Exception{

        //reading input and output paths from configuration file
        String propertiesPath = Constants.DEFAULT_PROPERTIES_FILE;

        if (new File(Constants.PROPERTIES_FILE).exists()){
            propertiesPath = Constants.PROPERTIES_FILE;
        }

        Configuration propertiesConfig = new PropertiesConfiguration(propertiesPath);
        String input = propertiesConfig.getString("input");
        String output;

        output = propertiesConfig.getString("output");

        //configuring Hadoop and running the job
        org.apache.hadoop.conf.Configuration hadoopConfig = new org.apache.hadoop.conf.Configuration();
        hadoopConfig.set("xmlinput.start","<movie>") ;
        hadoopConfig.set("xmlinput.end","</movie>") ;

        Job job = new Job(hadoopConfig, "Movies");
        job.setJarByClass(MoviesJob.class);
        job.setMapperClass(MoviesMapper.class);
        job.setReducerClass(MoviesReducer.class);
        job.setOutputKeyClass(IntWritable.class);
        job.setOutputValueClass(Text.class);
        job.setInputFormatClass(XmlInputFormat.class);

        FileInputFormat.addInputPath(job, new Path(input));
        Path outputPath = new Path(output);
        FileOutputFormat.setOutputPath(job, outputPath);

        MultipleOutputs.addNamedOutput(job, Constants.OUTPUT_DIRECTOR,
                TextOutputFormat.class, NullWritable.class, Text.class);
        MultipleOutputs.addNamedOutput(job, Constants.OUTPUT_ACTOR,
                TextOutputFormat.class, NullWritable.class, Text.class);

        FileSystem dfs = FileSystem.get(outputPath.toUri(), hadoopConfig);
        if (dfs.exists(outputPath)) {
            dfs.delete(outputPath, true);
        }

        System.exit(job.waitForCompletion(true) ? 0 : 1);
    }

}
