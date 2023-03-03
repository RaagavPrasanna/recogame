package ca.recogame;

/**
 * This app will connect to a MongoDB instance and insert a document
 *
 */
import java.io.IOException;

public class App 
{
    public static void main( String[] args ) 
        throws IOException, InterruptedException
    {            
       Api api = new Api("620-reco-test2", "file.txt");
       api.run();      
    }
}

      
      