package ca.recogame;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
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

  /**
   * Test validateName() with GetallGames() with valide string input
   * @throws IOException
   * @throws InterruptedException
   */
  @Test
  public void getAllGamesTest2() throws IOException, InterruptedException{
    // try{
    //   NodeReader nReader = new NodeReader();
    //   List<Game> games = nReader.getAllGames("Steam");
    //   int id = games.get(100).getAppid();
    //   assertEquals( 2318753, id);  
    // }catch(Exception e){
    //     System.out.println("can not data shown : "+e);
    //     Assert.fail("Exception" + e);
    // }

  }

  @Test
  public void getAllGamesTest3() throws IOException, InterruptedException{
    // try{
    //   NodeReader nReader = new NodeReader();
    //   List<Game> games = nReader.getAllGames("IGDB");
    //   System.out.println(games.get(100).getAppid());
    //   assertEquals( 2318753, games.get(100).getAppid());  
    // }catch(Exception e){
    //     System.out.println("can not data shown : "+e);
    // }
  }
}
