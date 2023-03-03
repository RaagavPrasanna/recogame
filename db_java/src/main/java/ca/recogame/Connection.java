package ca.recogame;

//for dotenv - look at the pom.xml for the package
import io.github.cdimascio.dotenv.*;
import java.util.List;
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
 * connection to mongodb with Queries
 */
public class Connection {
  MongoClientSettings clientSettings;
  String database;

  public Connection(String database) {
    this.database = database;
    getDatabase();
  }
  /**
   * create connection to mongodb
   */
  public void getDatabase() {
    Dotenv dotenv = Dotenv.load();
    ConnectionString connectionString = 
      new ConnectionString(dotenv.get("MONGO_CONNECTION_URI"));

    // Next 2 lines configure the POJO codec provider, and create the settings to
    // use (instead of the URI directly)
    CodecRegistry codecRegistry = CodecRegistries.fromRegistries(
        MongoClientSettings.getDefaultCodecRegistry(),
        CodecRegistries.fromProviders(PojoCodecProvider
            .builder()
            .automatic(true)
            .build()));
    this.clientSettings = MongoClientSettings
        .builder()
        .applyConnectionString(connectionString)
        .codecRegistry(codecRegistry)
        .build();
    System.out.println("connection sucessfuly");
  }

  /**
   * Query to insertOne game
   * @param game  Game object
   */
  public void insertOneGame(Game game) {
    try (MongoClient mongoClient = MongoClients.create(this.clientSettings)) {
      // configure database to use the codec
      MongoDatabase database = mongoClient.getDatabase(this.database);
      MongoCollection<Game> allgames = 
        database.getCollection("all-games", Game.class);
      allgames.insertOne(game);
    } catch (Exception E) {
      System.out.println(game.getName() + " can't be add in database");
    }
  }
  /**
   * Query to insertMany games
   * @param games   List<Game>
   */
  public void insertManyGame(List<Game> games) {
    try (MongoClient mongoClient = MongoClients.create(this.clientSettings)) {
      // configure database to use the codec
      MongoDatabase database = mongoClient.getDatabase(this.database);
      MongoCollection<Game> allgames = 
        database.getCollection("all-games", Game.class);
      allgames.insertMany(games);
    } catch (Exception E) {
      System.out.println(" List of games can't be add in database");
    }
  }

  /**
   * Query to deleteMany game
   */
  public void deleteManyGame() {
    try (MongoClient mongoClient = MongoClients.create(this.clientSettings)) {
      // configure database to use the codec
      MongoDatabase database = mongoClient.getDatabase(this.database);
      MongoCollection<Game> allgames = 
        database.getCollection("all-games", Game.class);
      allgames.deleteMany(Filters.gte("appid", 0));
    } catch (Exception E) {
      System.out.println(" List of games can't be deleted in database");
    }
  }
  /**
   * Query to insertOne GameDetails
   * @param game    GameDetail object
   */
  public void insertOneGameDetails(GameDetails game) {
    try (MongoClient mongoClient = MongoClients.create(this.clientSettings)) {
      // configure database to use the codec
      MongoDatabase database = mongoClient.getDatabase(this.database);
      MongoCollection<GameDetails> gameDetails = 
        database.getCollection("game-details", GameDetails.class);
      gameDetails.insertOne(game);
    } catch (Exception E) {
      System.out.println(game.getName() + " can't be add in database of : " + this.database);
    }
  }

  /**
   * Query to insertMany GameDetails
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
      System.out.println(" List of gameDetails can't be add in database");
    }
  }

  /**
   * Query to deleteMany GameDetails
   */
  public void deleteManyGameDetails() {
    try (MongoClient mongoClient = MongoClients.create(this.clientSettings)) {
      // configure database to use the codec
      MongoDatabase database = mongoClient.getDatabase(this.database);
      MongoCollection<GameDetails> gameDetails = 
        database.getCollection("game-details", GameDetails.class);
      gameDetails.deleteMany(Filters.gte("sourceId", 0));
    } catch (Exception E) {
      System.out.println(" List of gameDetails can't be removed in database");
    }
  }

}
