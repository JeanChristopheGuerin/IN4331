package nl.tudelft.in4331.hadoop.commons;

import org.apache.hadoop.io.ArrayWritable;
import org.apache.hadoop.io.Text;

public class TextArrayWritable extends ArrayWritable {
	public TextArrayWritable() {
		super(Text.class);
	}
}
