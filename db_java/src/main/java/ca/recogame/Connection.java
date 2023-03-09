package ca.recogame;

import java.util.ArrayList;
import java.util.List;
// Dotenv
import io.github.cdimascio.dotenv.*;
// MongoDB
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.BasicDBObject;
import com.mongodb.ConnectionString;
import com.mongodb.MongoBulkWriteException;
import com.mongodb.MongoClientSettings;
import com.mongodb.MongoException;
import com.mongodb.client.model.BulkWriteOptions;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.InsertOneModel;
import com.mongodb.client.model.WriteModel;
// BSON and POJO
import org.bson.codecs.configuration.*;
import org.bson.codecs.pojo.*;
import org.bson.conversions.Bson;

/**
 * Connection to mongodb with Queries
 */
public class Connection {
  private MongoClientSettings clientSettings;
  private String databaseName;
  private MongoDatabase database;

  public Connection(String database) {
    this.databaseName = database;
    getDatabaseName();
    System.out.println("Connection successful");
    MongoClient client = MongoClients.create(this.clientSettings);
    this.database = client.getDatabase(this.databaseName);
  }
  /**
   * Create connection to mongodb
   */
  public void getDatabaseName() {
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
  }

  public boolean checkGameExists(String source, int id) {
    try {
      // Configure database to use the codec
      MongoCollection<GameDetails> gameDetails =
        database.getCollection("game-details", GameDetails.class);
      Bson query = new BasicDBObject()
        .append("sourceName", source)
        .append("sourceId", id);
      long count = gameDetails.countDocuments(query);
      return count > 0;
    } catch (MongoException e) {
      System.err.println("gameDetails cannot be checked in database");
      e.printStackTrace();
      return false;
    }
  }

  public void insertGameDetails(GameDetails game) {
    try {
      // Configure database to use the codec
      MongoCollection<GameDetails> gameDetails =
        database.getCollection("game-details", GameDetails.class);
      gameDetails.insertOne(game);
    } catch (MongoException e) {
      System.err.println("List of gameDetails cannot be added in database");
      e.printStackTrace();
    }
  }

  /**
   * Query to insert many GameDetails
   * @param games
   */
  public void insertManyGameDetails(List<GameDetails> games) {
    try {
      // Configure database to use the codec
      MongoCollection<GameDetails> gameDetails =
        database.getCollection("game-details", GameDetails.class);

      // Write skipping duplicates
      List<WriteModel<GameDetails>> writes = new ArrayList<>();
      for (GameDetails g : games) {
        writes.add(new InsertOneModel<GameDetails>(g));
      }
      BulkWriteOptions options = new BulkWriteOptions().ordered(false);
      try {
        gameDetails.bulkWrite(writes, options);
      } catch (MongoBulkWriteException e) {
        for (var ee : e.getWriteErrors()) {
          if (ee.getCode() != 11000) {
            throw e;
          }
        }
      }
    } catch (MongoException e) {
      System.err.println("List of gameDetails cannot be added in database");
      e.printStackTrace();
    }
  }

  /**
   * Query to delete many GameDetails
   */
  public void deleteManyGameDetails() {
    try {
      // Configure database to use the codec
      MongoCollection<GameDetails> gameDetails =
        database.getCollection("game-details", GameDetails.class);
      gameDetails.deleteMany(Filters.gte("sourceId", 0));
    } catch (MongoException e) {
      System.err.println("List of gameDetails cannot be removed in database");
      e.printStackTrace();
    }
  }
}

