package ca.recogame;

//mongo objects all have ObjectID types
import org.bson.types.*;
//for the List type
import java.util.*;
import java.text.Normalizer;
import java.text.Normalizer.Form;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Game 
{
  private ObjectId id;

  private int appid;
  private String name;

  // empty constructor for POJO
  public Game() {
  }

  public Game(int id, String name) {
    this.appid = id;
    this.name = name;
  }

  public ObjectId getId() {
    return id;
  }

  public void setId(ObjectId id) {
    this.id = id;
  }

  public int getAppid() {
    return appid;
  }

  public void setAppid(int appid) {
    this.appid = appid;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    if (normalizedString(name)){
      this.name = name;
    }else{
      System.out.println("Not valide 'name' !");
    }
  }

  private boolean normalizedString(String input){
    boolean isValide = false;
    String checkText = Normalizer.normalize(input, Form.NFKC);
    Pattern pattern = Pattern.compile("[<>]");
   //Search for occurance "<" or "<" within the string str 
    Matcher matcher = pattern.matcher(checkText);
   if (matcher.find()) {         
        System.out.println("Input string is not acceptable");
   } else {
       System.out.println("Input string is acceptable");
       isValide = true;
   }  
   return isValide;
}
  @Override
  public String toString() {
    return "{id:" + id + ", appid:" + appid + ", name:" + name + "}";
  }
}

