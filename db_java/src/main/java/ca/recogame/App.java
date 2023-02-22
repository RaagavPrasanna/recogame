package ca.recogame;

//for dotenv - look at the pom.xml for the package
import io.github.cdimascio.dotenv.*;

import java.util.Arrays;

//the import below are for connecting with Atlas and the collection
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
//search filters
import com.mongodb.client.model.Filters;

//The codec import are needed to convert from BSON to POJO
import org.bson.codecs.configuration.*;
import org.bson.codecs.pojo.*;

/**
 * This app will connect to a MongoDB instance and insert a document
 *
 */
public class App 
{
    //this code is terrible! Always code in OO style with Java
    public static void main( String[] args )
    {
        Dotenv dotenv = Dotenv.load();
        ConnectionString connectionString = new ConnectionString(dotenv.get("MONGO_CONNECTION_URI"));

        //Next 2 lines configure the POJO codec provider, and create the settings to use (instead of the URI directly)
        CodecRegistry codecRegistry = CodecRegistries.fromRegistries(
            MongoClientSettings.getDefaultCodecRegistry(),
            CodecRegistries.fromProviders(PojoCodecProvider.builder().automatic(true).build())
        );
        MongoClientSettings clientSettings = MongoClientSettings.builder().applyConnectionString(connectionString).codecRegistry(codecRegistry).build();
        System.out.println("connection sucessfuly");
        //try-with-resources
        try (MongoClient mongoClient = MongoClients.create(clientSettings)) {
            //configure database to use the codec
            MongoDatabase database = mongoClient.getDatabase("620-recogame");

            MongoCollection<Game> allgames = database.getCollection("all-games", Game.class);
            // //create a new flower
            // Flower daisy = new Flower("Daisy", true, 1.2, Arrays.asList("white and yellow"));
            // flora.insertOne(daisy);

            //create a game
            // Game newGame = new Game(8888, "testJava1");
            // allgames.insertOne(newGame);
            /*
            Flower rose = new Flower();
            rose.setName("Rose");
            rose.setIsBlooming(true);
            rose.setHeight(1.5);
            rose.setColors(Arrays.asList("red", "pink", "white"));
            //insert the flower
            flora.insertOne(rose);
            */
           
            // flora.find(Filters.gte("height", 1)).forEach(System.out::println);
            // flora.find().forEach(System.out::println);
            allgames.find().forEach(System.out::println);
            // allgames.find(Filters.eq("appid", 8888 )).forEach(System.out::println);
        }catch(Exception e){
            System.out.println(e);
        }
    }
}
      
      