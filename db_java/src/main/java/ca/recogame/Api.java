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
    this.importMultiGameDetails();
  }

  private void importMultiGameDetails() {
    ReadFile read = new ReadFile(this.path);
    List<GameDetails> games = new ArrayList<GameDetails>();
    try {
      for (int id : read.getlistId()) {
        GameDetails game = nodeReader.getOneGameDetails("steam", id);
        games.add(game);
      }
      connect.insertManyGameDetails(games);
    } catch (Exception e) {
      System.err.println("Cannot import list of game details: " + e);
    }
  }

  public void deleteAllGameDetails() {
    try {
      this.connect.deleteManyGameDetails();
    } catch (Exception e) {
      System.err.println("Cannot delete all game-Details data: " + e);
    }
  }
}
