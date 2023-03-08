package ca.recogame;

import java.text.Normalizer;
import java.text.Normalizer.Form;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
   * validate string
   * 
   * @param input a string
   * @return boolean the result of normalized string
   */

public final class InputValidation {
   
  public static boolean normalizedString(String input) {
    boolean isValide = false;
    String checkText = Normalizer.normalize(input, Form.NFKC);
    Pattern pattern = Pattern.compile("[<>]");
    // Search for occurance "<" or "<" within the string str
    Matcher matcher = pattern.matcher(checkText);
    if (matcher.find() == false) {
      isValide = true;
    }
    return isValide;
  }
  
  /**
   * validate List of String
   * 
   * @param input a list of string
   * @return true if all the string are vnormlized, else return false.
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
   * use NormalizedString() and normalizedList() to
   * valide the input string and return the value of input , or null.
   * 
   * @param input List<String>
   * @param field String for error on normalization of this field.
   * @return the same input as List<String> or null
   */
  public static List<String> getNormalizedList(List<String> input, String field) {
    if (input == null) {
      return null;
    } else if (normalizedList(input) == true) {
      return input;
    } else {
      System.err.println("Not valide in " + field + " !");
      return null;
    }
  }

  /**
   * use NormalizedString() to valide the input string and return the value of
   * input , or null.
   * 
   * @param input String
   * @param field String for error message on specific field
   * @return input or null
   */
  public static String getNormalizedString(String input, String field) {
    if (input == null) {
      return null;
    } else if (normalizedString(input) == true) {
      return input;
    } else {
      System.err.println("Not valide in " + field + " !");
      return null;
    }
  }

}
