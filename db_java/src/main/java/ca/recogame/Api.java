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
  for (int id : read.getlistId()) {
    System.out.println("- " + id);
    if (!connect.checkGameExists("steam", id)) {
      System.out.println("  Is not in the DB, inserting");
      try {
        GameDetails game = nodeReader.getOneGameDetails("steam", id);
        connect.insertGameDetails(game);
      } catch (Exception e) {
        System.err.println("  Could not fetch, skipping");
        e.printStackTrace();
      }
    } else {
        System.out.println("  Is already in DB, ignoring");
    }
  }
  }
}
