package ca.recogame;

import static org.junit.Assert.assertEquals;
import org.junit.Test;

public class GameTest {
  
  @Test
  public void testSetGetName(){
    Game game = new Game(630, "Alien Swarm" );
    game.setName("Swarm");
    assertEquals("Swarm", game.getName());
  }

  @Test
  public void testValideName1(){
    Game game = new Game();
    game.setName("Swarm>");
    assertEquals(null, game.getName());
  }

  @Test
  public void testValideName2(){
    Game game = new Game();
    game.setName("tes[t>");
    assertEquals(null, game.getName());
  }

  @Test
  public void testSetGetAppid(){
    Game game = new Game();
    game.setAppid(2555);
    assertEquals(2555, game.getAppid());
  }
}
