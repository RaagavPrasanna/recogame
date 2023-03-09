package ca.recogame;

import java.io.IOException;

/**
 * This app will connect to a MongoDB instance, and insert data
 */
public class App {
    public static void main( String[] args )
      throws IOException, InterruptedException
    {
      System.out.println("Fetching games");
      Api api = new Api("620-recogame", "starting-games.json");
      api.run();
      System.out.println("Done");
    }
}

