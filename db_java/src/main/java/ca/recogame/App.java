package ca.recogame;

/**
 * This app will connect to a MongoDB instance and insert a document
 *
 */
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;



public class App 
{
    //this code is terrible! Always code in OO style with Java
    public static void main( String[] args ) throws IOException, InterruptedException
    {
        // Game newGame = new Game(8891, "testJava4");
        Connection connect = new Connection("620-reco-test2");
        // connect.insertOneGame(newGame);
    // // remove all data in all-games
        // connect.deleteManyGame();
     // // -------------------test for get all Games from node console-----------------------------------
        // try{
        //     NodeReader nReader = new NodeReader();
        //     List<Game> games = nReader.getAllGames("steam");
        //     System.out.println(games.get(5).getAppid());
        //     // connect.insertOneGame(games.get(5));
        //     connect.insertManyGame(games);
        // }catch(Exception e){
        //     System.out.println("can not data shown : "+e);
        // }
     // // ---------------test for get 1 game details----
        // try{
        //     NodeReader nReader = new NodeReader();
        //     GameDetails game = nReader.getOneGameDetails("steam", 440);
        //     System.out.println(game.getName());
        //     connect.insertOneGameDetails(game);
        // }catch(Exception e){
        //    System.out.println("can not data shown : "+e);
        // }      
        // ----------------test of multi gameDetails-----------        
        try{
            NodeReader nReader = new NodeReader();
            GameDetails game1 = nReader.getOneGameDetails("steam", 440);
            GameDetails game2 = nReader.getOneGameDetails("steam", 10);
            List<GameDetails> games = new ArrayList<GameDetails>();
            games.add(game1);
            
            System.out.println(game1.getName());
            connect.insertManyGameDetails(games);
        }catch(Exception e){
            System.out.println("can not data shown : "+e);
        }      

    }
}
      
      