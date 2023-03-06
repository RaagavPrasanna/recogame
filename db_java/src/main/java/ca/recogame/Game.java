
package ca.recogame;

//mongo objects all have ObjectID types
import org.bson.types.*;

/**
 * Game Oject use InputValidation class to verify string input
 */
public class Game {
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
    if (InputValidation.normalizedString(name)){
      this.name = name;
    }else{
      System.out.println("Not valide 'name' !");
    }
  }

  @Override
  public String toString() {
    return "Game [id=" + id + ", appid=" + appid + ", name=" + name + "]";
  }
 
}
