import java.util.ArrayList;

public class Dictionary {
  private DictionaryTrie root; // The root node of the trie
  private ArrayList<String> dictionaryList;

  public Dictionary(ArrayList<String> dictionaryList) {
    root = new DictionaryTrie(); // Initialize the root node of the trie
    this.dictionaryList = dictionaryList;
    populateDictionary();
  }

  private void populateDictionary() {
    for (String word : dictionaryList)
      this.addWord(word); // Add each word to the trie
  }

  public void addWord(String word) {
    System.out.println(word);
    DictionaryTrie node = root;
    for (char c : word.toCharArray()) {
      if (!node.hasChild(c))
        node.setChild(c, new DictionaryTrie());
      node = node.getChild(c);
    }
    node.setWordValidity(true);
  }

  public boolean isValidEnglishWord(String word) {
    DictionaryTrie node = root;
    for (char c : word.toCharArray()) {
      if (!node.hasChild(c))
        return false;
      node = node.getChild(c);
    }
    return node.isWord(); // Check if the final node represents a complete word
  }
}
