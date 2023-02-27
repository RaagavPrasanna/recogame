package ca.recogame;

/**
 * This app will connect to a MongoDB instance and insert a document
 *
 */
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.net.NoRouteToHostException;
import java.util.ArrayList;
import java.util.List;



public class App 
{
    //this code is terrible! Always code in OO style with Java
    public static void main( String[] args ) throws IOException, InterruptedException
    {
        // Game newGame = new Game(8891, "testJava4")
        // Connection connect = new Connection();
        // connect.insertOneGame(newGame);
        // -------------------test for get all Games from node console-----------------------------------
        // try{
        //     NodeReader nReader = new NodeReader();
        //     List<Game> games = nReader.getAllGames("IGDB");
        //     System.out.println(games.get(5).getAppid());
        // }catch(Exception e){
        //     System.out.println("can not data shown : "+e);
        // }
        // ---------------test for get 1 game details----
        try{
            NodeReader nReader = new NodeReader();
            GameDetails game = nReader.getOneGameDetails("IGDB", 440);
            System.out.println(game.getName());
        }catch(Exception e){
            System.out.println("can not data shown : "+e);
        }        

    }
}
      
      