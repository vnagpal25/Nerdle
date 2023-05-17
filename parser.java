
/**
 * @author vnagpal
 * Parser class converts a .txt file containing words to a .json file
 */
import java.io.FileReader;
import java.io.File;
import java.util.Scanner;
import java.util.Arrays;
import java.util.ArrayList;
import java.io.FileWriter;

public class Parser {

  public static void main(String[] args) {
    // main array list of all words read from .txt file
    ArrayList<String> allWords = new ArrayList<String>();
    try {
      // infile reader
      File inFile = new File("dictionary.txt");
      FileReader reader = new FileReader(inFile);
      Scanner scanner = new Scanner(reader);

      // reads each line, splits by space delimiter, adds it to the array list
      while (scanner.hasNextLine()) {
        String line = scanner.nextLine();
        String[] lineWords = line.split(" ");

        // converts [] to ArrayList
        ArrayList<String> lineWordsList = new ArrayList<String>(Arrays.asList(lineWords));

        // adds each line's array list to the main list
        allWords.addAll(lineWordsList);
      }

      scanner.close();
    } catch (Exception e) {
      e.printStackTrace();
    }

    try {
      // outfile writer
      File outFile = new File("dictionary.json");
      FileWriter writer = new FileWriter(outFile);

      // opening bracket
      writer.write("[");
      // writes each word, comma delimited enclosed in quotes
      for (int i = 0; i < allWords.size() - 1; i++)
        writer.write("\"" + allWords.get(i) + "\",");

      // last word and closing bracket
      writer.write("\"" + allWords.get(allWords.size() - 1) + "\"]");

      writer.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
