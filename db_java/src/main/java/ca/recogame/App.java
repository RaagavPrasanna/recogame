package ca.recogame;

import java.io.IOException;

/**
 * This app will connect to a MongoDB instance, read data from console
 * or file then upload the data to MangoDB 
 */
public class App {
    public static void main( String[] args ) 
        throws IOException, InterruptedException
    {            
       Api api = new Api("620-recogame", "file.txt");
       api.run();      
    }
}

      
      