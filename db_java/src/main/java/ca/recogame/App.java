package ca.recogame;

/**
 * This app will connect to a MongoDB instance and insert a document
 *
 */
import java.io.IOException;

public class App 
{
    //this code is terrible! Always code in OO style with Java
    public static void main( String[] args ) 
        throws IOException, InterruptedException
    {            
       Api api = new Api("620-reco-test2");
       api.run();
    }
}

      
      