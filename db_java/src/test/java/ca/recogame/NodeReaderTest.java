package ca.recogame;

import static org.junit.Assert.assertEquals;
import java.io.IOException;
import java.util.List;
import org.junit.Test;

public class NodeReaderTest {
  /**
   * Test validateName() with GetallGames() with wrong string input
   * @throws IOException
   * @throws InterruptedException
   */
  @Test
  public void getAllGamesTest1() throws IOException, InterruptedException{
      NodeReader nReader = new NodeReader();
      List<Game> games = nReader.getAllGames("abc");
      assertEquals(null, games);  
  }
}
 