package nl.tudelft.in4331.hadoop.commons;

import java.util.*;
import java.util.regex.Pattern;

/**
 * A simple normalizer that removes non-alphanumeric symbols, lowercases and tokenizes the text.
 */
public class Normalizer {

    private static final Pattern trash = Pattern.compile("[^\\p{Alnum}]");

    private Normalizer(){}

    public static Map<String, List<String>> normalize(String text) {
        StringTokenizer st = new StringTokenizer(text);
        int positionCounter = 0;
        Map<String, List<String>> result = new HashMap<String, List<String>>();

        while (st.hasMoreTokens()) {
            String word = st.nextToken();
            word = removeTrashSymbols(word);

            if (!result.containsKey(word)) {
                result.put(word, new ArrayList<String>());
            }

            result.get(word).add(String.valueOf(positionCounter));
            positionCounter++;
        }

        return result;
    }

    private static String removeTrashSymbols(String word){
        return trash.matcher(word).replaceAll("").toLowerCase();
    }

}
