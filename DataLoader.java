import java.util.ArrayList;
import org.json.simple.JSONArray;
// import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import java.io.FileReader;

public class DataLoader {
  public static ArrayList<String> loadWords() {
    ArrayList<String> wordList = new ArrayList<String>();
    try {
      // opens file for reading and initializes a json parser
      FileReader reader = new FileReader("words.json");
      JSONParser parser = new JSONParser();

      // creates json array of all the words in the file
      JSONArray wordsJSON = (JSONArray) parser.parse(reader);

      // adds each word to the arraylist
      for (int i = 0; i < wordsJSON.size(); i++) {
        String word = (String) wordsJSON.get(i);
        wordList.add(word);
      }

      // returns arraylist of words
      return wordList;
    } catch (Exception e) {
      // exception handling
      e.printStackTrace();
      return null;
    }
  }

  // public static void main(String[] args) {
  // ArrayList<String> words = loadWords();
  // System.out.println(words);
  // }
}
