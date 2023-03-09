package ca.recogame;

import java.io.IOException;

import com.mongodb.MongoException;

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
    try {
      for (int id : read.getlistId()) {
        boolean exists = connect.checkGameExists("steam", id);
        if (!exists) {
          System.out.println("Inserting " + id);
          GameDetails game = nodeReader.getOneGameDetails("steam", id);
          connect.insertGameDetails(game);
        } else {
          System.out.println("Skipping (already in DB) " + id);
        }
      }
    } catch (IOException e) {
      System.err.println("Could not fetch the list of games. This may be because you fetched too much from Steam: ");
      e.printStackTrace();
    } catch (MongoException e) {
      System.err.println("Cannot import list of game details:");
      e.printStackTrace();
    } catch (InterruptedException e) {
      System.err.println("Interrupted");
    }
  }

  public void deleteAllGameDetails() {
    try {
      this.connect.deleteManyGameDetails();
    } catch (MongoException e) {
      System.err.println("Cannot delete all game-Details data:");
      e.printStackTrace();
    }
  }
}
