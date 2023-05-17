import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;
import java.util.HashMap;
import java.util.Map;

/**
 * @author vnagpal
 *         NerdleManager class runs the Nerdle game
 */
public class NerdleManager {
  public static final int MAX_GUESSES = 6; // can be increased

  private static ArrayList<String> nerdleList = new ArrayList<String>();// araylist of 5 letter words from which Nerdle
                                                                        // word is to be chosen from
  private Dictionary dictionary; // dictionary containing all valid 5 letter english words

  // array list of user guesses
  private static ArrayList<String> guesses = new ArrayList<String>();

  // Nerdle Word Attributes
  private int randomIndex;// index of Nerdle word
  private static String nerdleWord;// randomly chosen Nerdle word
  private Random generator; // pseudo random generator
  private static HashMap<Character, Integer> letterCounts; // HashMap contains the counts of each letter in the Nerdle
                                                           // word

  private Scanner input; // takes in user input

  /**
   * Constructor
   */
  public NerdleManager() {
    nerdleList = JSONManager.getWords();
    dictionary = new Dictionary(JSONManager.getDictionary());

    randomIndex = -1;
    nerdleWord = "";
    generator = new Random();
    letterCounts = new HashMap<Character, Integer>();

    input = new Scanner(System.in);
  }

  /**
   * Run method, used in Nerdle.java main entry point
   */
  public void run() {
    // Chooses randomly an index in the list and gets the nerdle word
    randomIndex = generator.nextInt(nerdleList.size());
    nerdleWord = nerdleList.get(randomIndex);

    // following segment of code adds to the hashmap the occurences of each letter
    // in the word, the getOrDefault method is only for the first occurence of a
    // letter, then it returns 0, otherwise the method would return a value greater
    // than 1
    for (char c : nerdleWord.toCharArray())
      letterCounts.put(c, letterCounts.getOrDefault(c, 0) + 1);

    // entry set is the set of key value pairs
    // for (Map.Entry<Character, Integer> entry : letterCounts.entrySet())
    // System.out.println(entry.getKey() + ": " + entry.getValue());

    int count = 0;// number of guesses
    System.out.println("Welcome to Wordle! You have 6 guesses to guess the correct 5-letter word");

    while (count < MAX_GUESSES) {
      // user guess
      String guess = input.next().toLowerCase();
      String outputWord = "";

      // following is analyzing guess and changing color of letters based on the
      // correctness of each letter
      // 1. if the letter in the guess is in the same spot it will be printed as green
      // 2. if the letter in the guess is in the word but in the incorrect spot, it
      // will be printed as yellow
      // 3. if the letter in the guess is not in the word, it is left uncolored

      // correct guess by user!
      if (guess.equalsIgnoreCase(nerdleWord)) {
        printGuesses();
        print(guess + "\tCORRECT!", ConsoleColor.GREEN);
        break;
      }

      // checks if the guess is in the nerdleList or the dictionary
      if (nerdleList.contains(guess) || dictionary.hasWord(guess)) {

        // if its a new word to the nerdleList but its a valid english word, then that
        // word is added to the nerdleList, which will later be saved to JSON
        // the rationale for this is if the user makes a guess and its a valid word,
        // then its considered "modern" enough to be selected as nerdle word later on
        if (!nerdleList.contains(guess) && dictionary.hasWord(guess))
          nerdleList.add(guess);

        //itertaes through characters of guess
        for (int i = 0; i < nerdleWord.length(); i++) {
          // if the letter is in the correct spot, then green
          if (inCorrectSpot(guess.charAt(i), i)) {
            outputWord += color(guess.charAt(i), ConsoleColor.GREEN);
            letterCounts.put(guess.charAt(i), letterCounts.get(guess.charAt(i)) - 1);//decrements amount of possible yellow characters in a subsequent guesses
          }
          // if the letter is in the word, but in the wrong spot, then yellow
          else if (inWrongSpot(guess.charAt(i), i)) {
            outputWord += color(guess.charAt(i), ConsoleColor.YELLOW);
          }
          // if the letter is not in the word, then unchanged color wise
          else {
            outputWord += guess.charAt(i);
          }
        }

        //adds manipulated guess to the guesses, and prints
        guesses.add(outputWord); 
        printGuesses();
        count++;
      } else {
        print("Word not found in word list\nGuess Again", ConsoleColor.RED);
        try {
          Thread.sleep(1000);
        } catch (InterruptedException e) {
          e.printStackTrace();
        }
        printGuesses();
      }
    }

    if (count == 6) {
      print("You're out of luck!", ConsoleColor.RED);
      System.out.print("The correct word was: ");
      print(nerdleWord, ConsoleColor.GREEN);
    }

    //saves to JSON
    saveWords();
  }

  /**
   * Helper method prints the guessed words on the screen
   */
  private static void printGuesses() {
    // clears the screen
    System.out.print("\033[H\033[2J");
    System.out.flush();

    //prints each of the guesses
    for (int i = 0; i < guesses.size(); i++)
      System.out.println(guesses.get(i));
  }

  /**
   * Helper method to print a message in a certain color
   * @param message to print
   * @param color desired color of message
   */
  private static void print(String message, ConsoleColor color) {
    System.out.println(color + message + ConsoleColor.RESET);
  }

  /**
   * Helper method to color a character
   * @param c to color
   * @param color desired color of character
   * @return colored character
   */
  private static String color(char c, ConsoleColor color) {
    return (color.toString() + c + ConsoleColor.RESET);
  }

  /**
   * Helper method to check if a letter is at the correct spot in the nerdle word
   * @param c character in guess
   * @param index index in word
   * @return true if in the correct spot, false otherwise
   */
  private static boolean inCorrectSpot(char c, int index) {
    return c == nerdleWord.charAt(index);
  }

  /**
   * Helper method to check if a letter in the guess is in the nerdle word but is in the wrong spot
   * @param c character in guess
   * @param index index in word
   * @return true if in wrong spot, false otherwise
   */
  private static boolean inWrongSpot(char c, int index) {
    // if its in the wrong spot it should be in the word, and it should also not be
    // the only occurence of the letter, aka count > 0
    return nerdleWord.contains(Character.toString(c)) && (letterCounts.get(c) > 0);
  }

  /**
   * Saves nerdle list to JSON file
   */
  private static void saveWords() {
    JSONManager.saveWords(nerdleList);
  }
}
