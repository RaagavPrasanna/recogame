package ca.recogame;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;

public class NodeReader {

    private Gson gson ;

    public NodeReader(){
        this.gson = new Gson();
    }
    /**
     * ProcessBuilder run node command, take the standout as json data, convert to List<Game>
     * @return List<Game> of game in Game Object
     * @throws IOException
     * @throws InterruptedException
     */
    public List<Game> getAllGames() throws IOException, InterruptedException {
        // setup Gson for List<Game> 
        Type gameListType = new TypeToken<List<Game>>(){}.getType();
        List<Game> allgames = new ArrayList<Game>();
        // set/start ProcessBuilder
        ProcessBuilder processBuilder = new ProcessBuilder("node", "./server/bin/fetch.js", "steam", "all");
        Process process = processBuilder.start();
        // get the output stream of the process
        InputStream stdout = process.getInputStream();
        try(BufferedReader reader = new BufferedReader(
            new InputStreamReader(stdout))){
            Thread task = new Thread(()->{
                String line;
                try {
                    while ((line = reader.readLine()) != null) {
                    // convert json data to List<Game>
                    List<Game> games = this.gson.fromJson(line, gameListType);
                        for (Game g : games){
                            allgames.add(g);
                        
                        }
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
            task.start();
            task.join();
        // wait for the process to finish
        int exitCode = process.waitFor();
        System.out.println("Process exited with code " + exitCode);
        System.out.println(allgames.get(100).getAppid());
        return allgames;
      }
    }

    
}