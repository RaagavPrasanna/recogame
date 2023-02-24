package ca.recogame;

/**
 * This app will connect to a MongoDB instance and insert a document
 *
 */
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;

public class App 
{
    //this code is terrible! Always code in OO style with Java
    public static void main( String[] args ) throws IOException, InterruptedException
    {
        // Game newGame = new Game(8891, "testJava4");
        // Connection connect = new Connection();
        // connect.insertOneGame(newGame);
// -------------------------------------------------------
        ProcessBuilder processBuilder = new ProcessBuilder("node", "./server/bin/fetch.js", "steam", "all");
        // start the process
         // create the process builder for the command

        Process process = processBuilder.start();
        // get the output stream of the process
        InputStream stdout = process.getInputStream();
        // create a reader to read the output stream
        // BufferedReader reader = new BufferedReader(new InputStreamReader(stdout));
        // read the output
        // String line;
        // while ((line = reader.readLine()) != null) {
        //     // System.out.println(line);          
        // }
        // StringBuilder content = new StringBuilder();
        
        // while ((line = reader.readLine()) != null) {
        //     content.append(line);            
        //     content.append(System.lineSeparator());
        // }
        // System.out.println(content.toString());
        Gson gson3 = new Gson();        

        // String x = "[{\"appid\":1442910,\"name\":\"Reign Of Dwarf\"},{\"appid\":2160220,\"name\":\"Shipwrecked 64\"}]";
        // System.out.println(x);
        

        // String line1 = lines[0].replaceAll("\"", "\\\"");
        // Create a TypeToken to specify the type of the List<Game>
        Type gameListType = new TypeToken<List<Game>>(){}.getType();
        List<Game> allgames = new ArrayList<Game>();
        // System.out.println(games.get(0).getAppid());
        // List<Game> allgames = gson3.fromJson(line, Game[].class);

        // for (Game game : games) {
        //     System.out.println(game);
        // }

        try(BufferedReader reader = new BufferedReader(
            new InputStreamReader(stdout))){
            Thread task = new Thread(()->{
                String line;
                try {
                    while ((line = reader.readLine()) != null) {
                    // System.out.println(line);  
                    List<Game> games = gson3.fromJson(line, gameListType);
                        for (Game g : games){
                            allgames.add(g);
                        }
                    }
                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            });
            task.start();
            task.join();
           System.out.println(allgames.get(50).getAppid());
           for (Game game : allgames) {
                System.out.println(game.getAppid());
                System.out.println(game.getName());

            }
        }

    
        
        // wait for the process to finish
        int exitCode = process.waitFor();
        System.out.println("Process exited with code " + exitCode);
// ------------------------------------------------------------------------------------
        // String json = "{ \"appid\": 1479290, \"name\": \"RESEARCH and DESTROY - DLC1\" }";
        // Gson gson = new Gson();
        // Game game = gson.fromJson(json, Game.class);
        // System.out.println(game.getAppid()); // Output: 1479290
        // System.out.println(game.getName()); // Output: RESEARCH and DESTROY - DLC1
        // -----------------------------------------------------------------
        // String jsObject = "{ appid: 1479290, name: 'RESEARCH and DESTROY - DLC1' }";
        // // String jsObject = "{ \"appid\": 1479290, \"name\": \"RESEARCH and DESTROY - DLC1\" }";
        // Gson gson1 = new Gson();
        // Game map =  gson1.fromJson(jsObject, Game.class);
        // String json1 = gson1.toJson(map);
        // System.out.println(json1); // Output: {"appid":1479290,"name":"RESEARCH and DESTROY - DLC1"}
        // System.out.println(map.getAppid());
    }
}
      
      