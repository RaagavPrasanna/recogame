package ca.recogame;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import com.google.gson.Gson;

/**
 * Read data from console with node command and covert to class object
 */
public class NodeReader {
  private Gson gson;

  public NodeReader() {
    this.gson = new Gson();
  }

/**
 * ProcessBuilder run node command, take the standout as json data, convert to
 * GameDetails object
 * @param website - name
 * @param id of the game
 * @return GameDetails
 * @throws IOException
 * @throws InterruptedException
 */
  public GameDetails getOneGameDetails(String website, int id)
    throws IOException, InterruptedException
  {
    // Valid input string
    String name = website.toLowerCase();
    if (name == "steam" || id > 0) {
      String idStr = Integer.toString(id);
      List<GameDetails> gameDetails = new ArrayList<GameDetails>();

      // Set/start ProcessBuilder - all args have to be String
      ProcessBuilder processBuilder =
        new ProcessBuilder("node", "./server/bin/fetch.js", name,"info", "--id", idStr);
      Process process = processBuilder.start();

      try (BufferedReader reader = new BufferedReader(
        new InputStreamReader(process.getInputStream())
      )) {
        String line;
        while ((line = reader.readLine()) != null) {
          GameDetails newGame =
            gson.fromJson(line, GameDetails.class);
            gameDetails.add(newGame);
        }
      }

      try {
        int code = process.waitFor();
        if (code != 0) {
          throw new IOException("Exit code " + code);
        }
        return gameDetails.get(0);
      } catch (InterruptedException e) {
        throw new IOException("Process interrupted");
      }
    } else {
      System.err.println("Error on input parameters");
      return null;
    }
  }
}

