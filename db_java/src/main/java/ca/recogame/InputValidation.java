package ca.recogame;

import java.text.Normalizer;
import java.text.Normalizer.Form;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class InputValidation {
  public static boolean normalizedString(String input) {
    boolean isValide = false;
    String checkText = Normalizer.normalize(input, Form.NFKC);
    Pattern pattern = Pattern.compile("[<>]");
    // Search for occurrence "<" or "<" within the string str
    Matcher matcher = pattern.matcher(checkText);
    if (matcher.find() == false) {
      isValide = true;
    }
    return isValide;
  }

  /**
   * Validate List of String
   *
   * @param input a list of string
   * @return `true` if all the string are normalized, else return `false`.
   */
  public static boolean normalizedList(List<String> input) {
    for (String x : input) {
      if (normalizedString(x) == false) {
        return false;
      }
    }
    return true;
  }

   /**
   * Use NormalizedString() and normalizedList() to
   * Valid the input string and return the value of input , or null.
   *
   * @param input
   * @param field for error on normalization of this field.
   * @return the same input as List<String> or null
   */
  public static List<String> getNormalizedList(List<String> input, String field) {
    if (input == null) {
      return null;
    } else if (normalizedList(input) == true) {
      return input;
    } else {
      System.err.println("Not valid in " + field + " !");
      return null;
    }
  }

  /**
   * use NormalizedString() to valid the input string and return the value of
   * input , or null.
   *
   * @param input
   * @param field For error message on specific field
   * @return input or null
   */
  public static String getNormalizedString(String input, String field) {
    if (input == null) {
      return null;
    } else if (normalizedString(input) == true) {
      return input;
    } else {
      System.err.println("Not valid in " + field + " !");
      return null;
    }
  }

}
