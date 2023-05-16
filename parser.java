import java.io.FileReader;
import java.io.File;
import java.util.Scanner;
import java.util.Arrays;
import java.util.ArrayList;
import java.io.FileWriter;

public class parser {

  public static void main(String[] args) {
    ArrayList<String> allWords = new ArrayList<String>();
    try {
      File inFile = new File("dictionary.txt");
      FileReader reader = new FileReader(inFile);
      Scanner scanner = new Scanner(reader);

      while (scanner.hasNextLine()) {
        String line = scanner.nextLine();
        String[] lineWords = line.split(" ");
        ArrayList<String> lineWordsList = new ArrayList<String>(Arrays.asList(lineWords));

        allWords.addAll(lineWordsList);
      }

      scanner.close();
    } catch (Exception e) {
      e.printStackTrace();
    }

    try {
      File outFile = new File("dictionary.json");
      FileWriter writer = new FileWriter(outFile);

      writer.write("[");
      for (int i = 0; i < allWords.size() - 1; i++)
        writer.write("\"" + allWords.get(i) + "\",");
      writer.write("\"" +allWords.get(allWords.size() - 1) + "\"]");
      writer.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
