package ca.recogame;

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
        System.out.println("- " + id);
        if (!connect.checkGameExists("steam", id)) {
            System.out.println("  Is not in the DB, inserting");
            GameDetails game = nodeReader.getOneGameDetails("steam", id);
            connect.insertGameDetails(game);
        } else {
            System.out.println("  Is already in DB, ignoring");
        }
      }
    } catch (Exception e) {
      System.err.println("Cannot import list of game details: " + e);
    }
  }
}
