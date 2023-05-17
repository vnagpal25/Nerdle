
/**
 * @author vnagpal
 * JSONManager classes manages reading and writing to JSON files for word list and dictionary list
 */
import java.util.ArrayList;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class JSONManager {
  // list of nerdle playable words and dictionary words
  private static ArrayList<String> nerdleList, dictionaryList;

  /**
   * Helper method reads a json file and populates a particular word list (nerdle list or dictionary list)
   * @param list list being populated
   * @param fileName JSON file being read
   */
  private static void loadFile(ArrayList<String> list, String fileName) {
    try {
      // opens file for reading and initializes a json parser
      FileReader reader = new FileReader(fileName);
      JSONParser parser = new JSONParser();

      // creates json array of all the words in the file
      JSONArray wordsJSON = (JSONArray) parser.parse(reader);

      // adds each proper length and alphabetic word to the arraylist
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

  /**
   * Helper method reads words.json and populates dictionaryList
   */
  private static void loadWords() {
    nerdleList = new ArrayList<String>();
    loadFile(nerdleList, "words.json");
  }

  /**
   * Helper method reads dictionary.json and populates dictionaryList
   */
  private static void loadDictionary() {
    dictionaryList = new ArrayList<String>();
    loadFile(dictionaryList, "dictionary.json");
  }

  /**
   * Getter method for Nerdle word list
   * @return array list of 5 letter words for nerdle game
   */
  public static ArrayList<String> getWords() {
    loadWords();
    return nerdleList;
  }

  /**
   * Getter method for DictionaryList
   * 
   * @return array list of all 5 letter words in dictionary.json
   */
  public static ArrayList<String> getDictionary() {
    // populates by reading JSON, then returns the arraylist
    loadDictionary();
    return dictionaryList;
  }

  /**
   * Saves nerdleList to JSON
   * 
   * @param words updated nerdleList coming from NerdleManager
   */
  public static void saveWords(ArrayList<String> words) {
    // to be written to JSON
    JSONArray wordsJSON = new JSONArray();
    for (String word : words)
      wordsJSON.add(word);

    // writes JSONArray to JSON file
    try (FileWriter file = new FileWriter("words.json")) {
      file.write(wordsJSON.toJSONString());
      file.flush();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  /**
   * Helper method checks if a word contains all alphabetic characters
   * 
   * @param word string being checked
   * @return true if all alphabetic characters, false otherwise
   */
  private static boolean isAlphabetic(String word) {
    for (char c : word.toCharArray())
      if (!Character.isLetter(c))
        return false;
    return true;
  }

}
