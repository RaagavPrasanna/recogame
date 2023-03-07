package ca.recogame;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Api {

  private static Scanner reader = new Scanner(System.in);
  private Connection connect;
  private NodeReader nodeReader;
  private String path;

  public Api(String database, String path) {
    this.connect = new Connection(database);
    this.path = path;
    this.nodeReader = new NodeReader();
  }

  public void run() {
    // Used to check if menu should remain open
    boolean keepMenu = true;

    do {
      System.out.println(
          "1) Import all games \n" +
          "2) Import one game details \n" +
          "3) Import mutiple game details \n" +
          "4) delete all games \n" +
          "5) delete all gameDetails \n" +
          "6) Exit\n");
      // Manage response from user
      int response = reader.nextInt();
      keepMenu = manageResponse(response);
    } while (keepMenu);

    reader.close();
  }

  private boolean manageResponse(int response) {
    // Closes menu if false
    boolean keepMenu = true;

    if (response == 1)
      importListGames();
    else if (response == 2)
      importOneGameDetails();
    else if (response == 3)
      importMulitGameDetails();
    else if (response == 4)
      deleteAllGames();
    else if (response == 5)
      deleteAllGameDetails();
    else
      keepMenu = false;
    return keepMenu;
  }

  private void importListGames() {
    try {
      List<Game> games = nodeReader.getAllGames("steam");
      connect.insertManyGame(games);
    } catch (Exception e) {
      System.err.println();
    }
  }

  private void importOneGameDetails() {
    System.out.print("enter a game id : ");
    int id = reader.nextInt();
    try {
      GameDetails game = nodeReader.getOneGameDetails("steam", id);
      connect.insertOneGameDetails(game);
    } catch (Exception e) {
      System.err.println();
    }
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
      System.err.println();
    }
  }

  private void deleteAllGames() {
    try {
      this.connect.deleteManyGame();
    } catch (Exception e) {
      System.err.println();
    }
  }

  private void deleteAllGameDetails() {
    try {
      this.connect.deleteManyGameDetails();
    } catch (Exception e) {
      System.err.println();
    }
  }

}
