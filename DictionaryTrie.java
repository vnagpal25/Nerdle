public class DictionaryTrie {
  private DictionaryTrie[] children;
  private boolean validWord;

  public DictionaryTrie() {
    this.children = new DictionaryTrie[26];// 26 letters
    this.validWord = false;
  }

  public boolean hasChild(char c) {
    return this.children[c - 'a'] != null; // Check if a child node exists for the given character
  }

  public DictionaryTrie getChild(char c) {
    return this.children[c - 'a'];
  }

  public void setChild(char c, DictionaryTrie newChild) {
    this.children[c - 'a'] = newChild;
  }

  public boolean isWord() {
    return this.validWord;
  }

  public void setWordValidity(boolean validWord) {
    this.validWord = validWord;
  }
}
