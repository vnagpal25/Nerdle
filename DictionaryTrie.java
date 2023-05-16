/**
 * @author Vnagpal
 *         Trie class, defines a prefix based 26-ary tree
 *         Needed to implement dictionary for efficient lookups for logarithmic
 *         time complexity
 */
public class DictionaryTrie {
  private DictionaryTrie[] childNodes;// children nodes/sub-tries
  private boolean validWord;// describing whether the path of nodes leading to it define a valid english
                            // word

  /**
   * Constructor
   */
  public DictionaryTrie() {
    this.childNodes = new DictionaryTrie[26];// 26 letters
    this.validWord = false; // by default false
  }

  /**
   * Method checks existence of child sub-trie
   * 
   * @param c the next character in the word
   * @return true if there is another letter after c, false otherwise
   */
  public boolean hasChild(char c) {
    return this.childNodes[c - 'a'] != null;
  }

  /**
   * Getter method for child node
   * 
   * @param c the next character in the word
   * @return a sub-Trie with c as the root node
   */
  public DictionaryTrie getChild(char c) {
    return this.childNodes[c - 'a'];
  }

  /**
   * Setter method for child node, used when adding the following letter of a word
   * 
   * @param c next char in the word
   */
  public void setChild(char c) {
    // giving the next character 26 children
    this.childNodes[c - 'a'] = new DictionaryTrie();
  }

  /**
   * Getter method for word validity
   * 
   * @return whether the word is valid or not
   */
  public boolean isWord() {
    return this.validWord;
  }

  /**
   * Setter method for word validity
   * 
   * @param validWord boolean describing whether the word is valid by english
   *                  grammatical rules
   */
  public void setWordValidity(boolean validWord) {
    this.validWord = validWord;
  }
}
