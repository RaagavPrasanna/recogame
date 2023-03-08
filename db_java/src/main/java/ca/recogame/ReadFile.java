package ca.recogame;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import org.json.JSONArray;

/**
 * read json string from a file 
 */
public class ReadFile {
  private String data;

  public ReadFile(String path) {
    read(path);
  }

  private void read(String path) {
    try {
      File myObj = new File(path);
      Scanner myReader = new Scanner(myObj);
      String data = "";
      while (myReader.hasNextLine()) {
        data += myReader.nextLine();
      }
      this.data = data;
      myReader.close();
    } catch (FileNotFoundException e) {
      System.err.println("can not read file in : "+path);
    }
  }

  public String getData() {
    return this.data;
  }
/**
 * convert read json data to List<Integer>
 * @return list   typeof List<Integer>
 */
  public List<Integer> getlistId() {
    List<Integer> list = new ArrayList<>();
    JSONArray jsonArray = new JSONArray(this.data);
    for (int i = 0; i < jsonArray.length(); i++) {
      list.add(jsonArray.getInt(i));
    }
    return list;
  }
}