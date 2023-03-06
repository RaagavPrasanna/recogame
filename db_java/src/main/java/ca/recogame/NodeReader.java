package ca.recogame;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;

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
     * List<Game>
     * 
     * @return List<Game> of game in Game Object
     * @throws IOException
     * @throws InterruptedException
     */
    public List<Game> getAllGames(String website) throws 
                IOException, 
                InterruptedException 
    {
        // valide input string
        String name = validateName(website);
        if (name != null) {
            // setup Gson for List<Game>
            Type gameListType = new TypeToken<List<Game>>() {}.getType();
            List<Game> allgames = new ArrayList<Game>();
            // set/start ProcessBuilder
            ProcessBuilder processBuilder = 
                new ProcessBuilder("node", "./server/bin/fetch.js", name, "all");
            Process process = processBuilder.start();
           
            try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream())
            )) {
                String line;
                while ((line = reader.readLine()) != null) {
                    List<Game> games = 
                        this.gson.fromJson(line, gameListType);
                        for (Game g : games) {
                            allgames.add(g);
                        }
                }
            }

            try {
                int code = process.waitFor();
                if (code != 0) {
                    throw new IOException("Exit code " + code);
                }
                return allgames;
            } catch (InterruptedException e) {
                throw new IOException("Process interrupted");
            }

        } else {
            return null;
        }
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
    public GameDetails getOneGameDetails(String website, int id) throws 
                IOException, 
                InterruptedException 
    {
        // valide input string
        String name = validateName(website);
        if (name != null || id > 0) {
            String idStr = Integer.toString(id);
            List<GameDetails> gameDetails = new ArrayList<GameDetails>();
            
            // set/start ProcessBuilder- all args have to be String
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
            return null;
        }
    }

    private String validateName(String website) {
        String name = website.toLowerCase();
        if (!name.equals("steam")) {
            System.out.println("Can't read from Node, no such website name : " + website);
            return null;
        }
        return name;
    }
}