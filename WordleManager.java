import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;
import java.util.HashMap;
import java.util.Map;

public class WordleManager {
  public static final int MAX_GUESSES = 6;

  private ArrayList<String> wordList = new ArrayList<String>();
  private static ArrayList<String> guesses = new ArrayList<String>();
  private static HashMap<Character, Integer> letterCounts;
  private int randomIndex;
  private static String correctWord;
  private Random generator;
  private Scanner input;

  public WordleManager() {
    wordList = DataLoader.loadWords();
    generator = new Random();
    randomIndex = -1;
    correctWord = "";
    input = new Scanner(System.in);
    letterCounts = new HashMap<Character, Integer>();
  }

  public void run() {
    randomIndex = generator.nextInt(wordList.size() + 1);
    correctWord = wordList.get(randomIndex);

    // following segment of code adds to the hashmap the occurences of each letter
    // in the word, the getOrDefault method is only for the first occurence of a
    // letter, then it returns 0, otherwise the method would return a value greater
    // than 1
    for (char c : correctWord.toCharArray())
      letterCounts.put(c, letterCounts.getOrDefault(c, 0) + 1);

    // entry set is the set of key value pairs
    // for (Map.Entry<Character, Integer> entry : letterCounts.entrySet())
    // System.out.println(entry.getKey() + ": " + entry.getValue());

    int count = 0;
    System.out.println("Welcome to Wordle!");

    while (count < MAX_GUESSES) {
      String guess = input.next().toLowerCase();
      String outputWord = "";

      if (guess.equalsIgnoreCase(correctWord)) {
        printGuesses();
        print(guess + "\tCORRECT!", ConsoleColor.GREEN);
        break;
      }

      // the problem now is we need to somehow keep track of multiple of the same
      // letters in a guess, it should not show up in yellow if the letter is in the
      // correct spot in another location and also if it is the only occurrence of
      // that letter in the word

      // make hashmap of word, each letter as the key, for value create a class called
      // guess or number of occurences in word
      if (wordList.contains(guess)) {
        for (int i = 0; i < correctWord.length(); i++) {
          // if the letter is in the correct spot
          if (inCorrectSpot(guess.charAt(i), i)) {
            outputWord += color(guess.charAt(i), ConsoleColor.GREEN);
            letterCounts.put(guess.charAt(i), letterCounts.get(guess.charAt(i)) - 1);
          }
          // if the letter is in the word, but in the wrong spot
          else if (inWrongSpot(guess.charAt(i), i)) {
            outputWord += color(guess.charAt(i), ConsoleColor.YELLOW);
          }
          // if the letter is not in the word
          else {
            outputWord += guess.charAt(i);
          }
        }
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
      print(correctWord, ConsoleColor.GREEN);
    }

  }

  private static void printGuesses() {
    // clears the screen
    System.out.print("\033[H\033[2J");
    System.out.flush();
    for (int i = 0; i < guesses.size(); i++)
      System.out.println(guesses.get(i));
  }

  private static void print(String message, ConsoleColor color) {
    System.out.println(color + message + ConsoleColor.RESET);
  }

  private static String color(char c, ConsoleColor color) {
    return (color.toString() + c + ConsoleColor.RESET);
  }

  private static boolean inCorrectSpot(char c, int index) {
    return c == correctWord.charAt(index);
  }

  private static boolean inWrongSpot(char c, int index) {
    // if its in the wrong spot it should be in the word, and it should also not be
    // the only occurence of the letter, aka count > 0
    return correctWord.contains(Character.toString(c)) && (letterCounts.get(c) > 0);
  }
}
