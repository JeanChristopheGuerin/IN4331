package nl.tudelft.in4331.hadoop.ex19_5_4;

import nl.tudelft.in4331.hadoop.commons.Constants;
import nl.tudelft.in4331.hadoop.commons.TextArrayWritable;
import nl.tudelft.in4331.hadoop.commons.XmlInputFormat;
import org.apache.commons.configuration.Configuration;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

import java.io.File;

/**
 * Hadoop job to normalize movies.xml corpus
 */
public class NormalizationJob {

    /**
	 * Configures and runs the job with Hadoop
	 * @param args args
	 * @throws Exception sometimes
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

        output = propertiesConfig.getString("normalization-output");

        //configuring Hadoop and running the job
        org.apache.hadoop.conf.Configuration hadoopConfig = new org.apache.hadoop.conf.Configuration();
        hadoopConfig.set("xmlinput.start","<movie>") ;
        hadoopConfig.set("xmlinput.end","</movie>") ;

        Job job = new Job(hadoopConfig, "Normalization");
        job.setJarByClass(NormalizationJob.class);
        job.setMapperClass(NormalizationMapper.class);
        job.setReducerClass(NormalizationReducer.class);
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(TextArrayWritable.class);
        job.setInputFormatClass(XmlInputFormat.class);
        
        FileInputFormat.addInputPath(job, new Path(input));
        Path outputPath = new Path(output);
        FileOutputFormat.setOutputPath(job, outputPath);
        
        FileSystem dfs = FileSystem.get(outputPath.toUri(), hadoopConfig);
        if (dfs.exists(outputPath)) {
        	dfs.delete(outputPath, true);
        }

        System.exit(job.waitForCompletion(true) ? 0 : 1);
	}

}
