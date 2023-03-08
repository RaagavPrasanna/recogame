package ca.recogame;

// Dotenv
import io.github.cdimascio.dotenv.*;
import java.util.List;
// MongoDB
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.model.Filters;
// BSON and POJO
import org.bson.codecs.configuration.*;
import org.bson.codecs.pojo.*;

/**
 * Connection to mongodb with Queries
 */
public class Connection {
  MongoClientSettings clientSettings;
  String database;

  public Connection(String database) {
    this.database = database;
    getDatabase();
  }
  /**
   * Create connection to mongodb
   */
  public void getDatabase() {
    Dotenv dotenv = Dotenv.load();
    ConnectionString connectionString =
      new ConnectionString(dotenv.get("MONGO_CONNECTION_URI"));

    // Next 2 lines configure the POJO codec provider, and create the settings to
    // use (instead of the URI directly)
    CodecRegistry codecRegistry = CodecRegistries.fromRegistries(
      MongoClientSettings.getDefaultCodecRegistry(),
      CodecRegistries.fromProviders(
        PojoCodecProvider
          .builder()
          .automatic(true)
          .build()
      )
    );
    this.clientSettings = MongoClientSettings
      .builder()
      .applyConnectionString(connectionString)
      .codecRegistry(codecRegistry)
      .build();
    System.out.println("Connection successful");
  }

  /**
   * Query to insert many GameDetails
   * @param games   List<GameDetails>
   */
  public void insertManyGameDetails(List<GameDetails> games) {
    try (MongoClient mongoClient = MongoClients.create(this.clientSettings)) {
      // configure database to use the codec
      MongoDatabase database = mongoClient.getDatabase(this.database);
      MongoCollection<GameDetails> allgames =
        database.getCollection("game-details", GameDetails.class);
      allgames.insertMany(games);
    } catch (Exception E) {
      System.err.println(" List of gameDetails can't be add in database");
    }
  }

  /**
   * Query to delete many GameDetails
   */
  public void deleteManyGameDetails() {
    try (MongoClient mongoClient = MongoClients.create(this.clientSettings)) {
      // Configure database to use the codec
      MongoDatabase database = mongoClient.getDatabase(this.database);
      MongoCollection<GameDetails> gameDetails =
        database.getCollection("game-details", GameDetails.class);
      gameDetails.deleteMany(Filters.gte("sourceId", 0));
    } catch (Exception E) {
      System.err.println("List of gameDetails cannot be removed in database");
    }
  }

}
