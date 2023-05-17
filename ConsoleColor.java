/**
 * @author vnagpal
 *         enum containing ansi escape codes, used for colored terminal output
 */
public enum ConsoleColor {
  RESET {
    public String toString() {
      return "\u001B[0m";
    }
  },
  BLACK {
    public String toString() {
      return "\u001B[30m";
    }
  },
  RED {
    public String toString() {
      return "\u001B[31m";
    }

  },
  GREEN {

    public String toString() {
      return "\u001B[32m";
    }
  },
  YELLOW {

    public String toString() {
      return "\u001B[33m";
    }
  },
  BLUE {

    public String toString() {
      return "\u001B[34m";
    }
  },
  PURPLE {

    public String toString() {
      return "\u001B[35m";
    }
  },
  CYAN {

    public String toString() {
      return "\u001B[36m";
    }
  },
  WHITE {

    public String toString() {
      return "\u001B[37m";
    }
  },
  BLACK_BACKGROUND {

    public String toString() {
      return "\u001B[40m";
    }
  },
  RED_BACKGROUND {

    public String toString() {
      return "\u001B[41m";
    }
  },
  GREEN_BACKGROUND {

    public String toString() {
      return "\u001B[42m";
    }
  },
  YELLOW_BACKGROUND {

    public String toString() {
      return "\u001B[43m";
    }
  },
  BLUE_BACKGROUND {

    public String toString() {
      return "\u001B[44m";
    }
  },
  PURPLE_BACKGROUND {

    public String toString() {
      return "\u001B[45m";
    }
  },
  CYAN_BACKGROUND {

    public String toString() {
      return "\u001B[46m";
    }
  },
  WHITE_BACKGROUND {

    public String toString() {
      return "\u001B[47m";
    }
  }
}