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
  MongoClientSettings clientSettings;
  MongoDatabase database;
  MongoCollection<GameDetails> gameDetails;

  public Connection(String database) {
    getDatabase();
    MongoClient c = MongoClients.create(this.clientSettings);
    this.database = c.getDatabase(database);
    this.gameDetails = this.database.getCollection("game-details", GameDetails.class);
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
  }

  public boolean checkGameExists(String source, int id) {
    GameDetails g = this.gameDetails.find(Filters.and(
      Filters.eq("sourceName", source),
      Filters.eq("sourceId", id)
    )).first();
    return g != null;
  }

  public void insertGameDetails(GameDetails game) {
    this.gameDetails.insertOne(game);
  }
}

