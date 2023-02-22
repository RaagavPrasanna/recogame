package ca.recogame;

/**
 * This app will connect to a MongoDB instance and insert a document
 *
 */
public class App 
{
    //this code is terrible! Always code in OO style with Java
    public static void main( String[] args )
    {
        Game newGame = new Game(8891, "testJava4");
        Connection connect = new Connection();
        connect.insertOneGame(newGame);
    }
}
      
      