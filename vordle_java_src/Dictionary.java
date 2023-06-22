import java.util.ArrayList;

/**
 * @author vnagpal
 *         Dictionary class, implemented using Trie class, allows for
 *         logarithmic time complexity lookups
 */
public class Dictionary {
  private Trie root; // The root node of the trie
  private ArrayList<String> dictionaryList; // list of 5 letter dictionary words

  /**
   * Constructor
   * 
   * @param dictionaryList array list of dictionary words, coming from
   *                       dictionary.JSON
   */
  public Dictionary(ArrayList<String> dictionaryList) {
    root = new Trie(); // Initialize the root node of the trie
    this.dictionaryList = dictionaryList;
    populateDictionary(); // populates trie defined by root using list
  }

  /**
   * Helper method to populate the Trie
   */
  private void populateDictionary() {
    // iterates over all dictionary words and effectively creates a
    // linked list type path in the trie for each word
    for (String word : dictionaryList)
      this.addWord(word); // Add each word to the trie
  }

  /**
   * Adds a given word in the Trie
   * 
   * @param word to be added in the Trie
   */
  private void addWord(String word) {
    Trie node = root;// starts path at root, all words added from root

    // for loop iterates over the characters in a string, subsequently storing them
    // in the trie based on the previous character (prefix)
    for (char c : word.toCharArray()) {
      if (!node.hasChild(c))
        node.setChild(c);
      node = node.getChild(c); // goes to the following letter
    }
    node.setWordValidity(true);// after word is stored in trie completely, it is a valid english word
  }

  /**
   * Checks if a given word is a valid word by performing a lookup in the
   * Dictionary main Trie. Asympotitcally equivalent operation to addWord()
   * 
   * @param word word being looked up
   * @return true if the word exists in the dictionary, false otherwise
   */
  public boolean hasWord(String word) {
    Trie node = root; // starts lookup at root

    // iterates over each character in the sring
    for (char c : word.toCharArray()) {
      // if the words next character doesn't exist in the tree, then its not a valid
      // word
      if (!node.hasChild(c))
        return false;
      node = node.getChild(c); // traverses to the child
    }
    return node.isWord(); // Check if the final child node represents a complete word
  }
}
