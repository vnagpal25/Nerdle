import java.util.ArrayList;
import org.json.simple.JSONArray;
// import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class JSONManager {
  private static ArrayList<String> wordList, dictionary;

  private static void loadFile(ArrayList<String> list, String fileName) {
    try {
      // opens file for reading and initializes a json parser
      FileReader reader = new FileReader(fileName);
      JSONParser parser = new JSONParser();

      // creates json array of all the words in the file
      JSONArray wordsJSON = (JSONArray) parser.parse(reader);

      // adds each word to the arraylist
      for (int i = 0; i < wordsJSON.size(); i++) {
        String word = ((String) wordsJSON.get(i)).toLowerCase();
        if (word.length() == 5 && isAlphabetic(word))
          list.add(word);
      }
    } catch (Exception e) {
      // exception handling
      e.printStackTrace();
    }
  }

  private static void loadWords() {
    wordList = new ArrayList<String>();
    loadFile(wordList, "words.json");
  }

  private static void loadDictionary() {
    dictionary = new ArrayList<String>();
    loadFile(dictionary, "dictionary.json");
  }

  public static ArrayList<String> getWords() {
    loadWords();
    return wordList;
  }

  public static ArrayList<String> getDictionary() {
    loadDictionary();
    return dictionary;
  }

  public static void saveWords(ArrayList<String> words) {
    JSONArray wordsJSON = new JSONArray();
    for (String word : words)
      wordsJSON.add(word);

    try (FileWriter file = new FileWriter("words.json")) {

      file.write(wordsJSON.toJSONString());
      file.flush();

    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  private static boolean isAlphabetic(String word) {
    for (char c : word.toCharArray())
      if (!Character.isLetter(c))
        return false;
    return true;
  }

}
