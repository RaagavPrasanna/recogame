package ca.recogame;

import java.util.ArrayList;
import java.util.List;

public class Api {

  private Connection connect;
  private NodeReader nodeReader;
  private String path;

  public Api(String database, String path) {
    this.connect = new Connection(database);
    this.path = path;
    this.nodeReader = new NodeReader();
  }

  public void run() {
      this.importMulitGameDetails();
  }

  private void importMulitGameDetails() {
    ReadFile read = new ReadFile(this.path);
    List<GameDetails> games = new ArrayList<GameDetails>();
    try {
      for (int id : read.getlistId()) {
        GameDetails game = nodeReader.getOneGameDetails("steam", id);
        games.add(game);
      }
      connect.insertManyGameDetails(games);
    } catch (Exception e) {
      System.err.println("can not import list of game details : " + e);
    }
  }

/**
 * hidden function for test and remove data from mongodb
 */
  public void deleteAllGameDetails() {
    try {
      this.connect.deleteManyGameDetails();
    } catch (Exception e) {
      System.err.println("can not delete all game-Details data : " + e);
    }
  }

}
