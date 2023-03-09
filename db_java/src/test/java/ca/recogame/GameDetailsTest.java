package ca.recogame;

import static org.junit.Assert.assertEquals;
import java.util.ArrayList;
import java.util.List;
import org.junit.Test;

public class GameDetailsTest {
  @Test
  public void testConstructorAndGetters()
  {
    GameDetails game = new GameDetails(
      35004,
      "steam",
      "<Demon Horde Master>",
      List.of("Valve dev"),
      List.of("Valve pub"),
      "https://cdn.akamai.steamstatic.com/steam/apps/10/header.jpg?t=1666823513",
      "https://cdn.akamai.steamstatic.com/steam/apps/10/page_bg_generated.jpg?t=1666823513",
      List.of("Multi-player", "PvP", "Online PvP"),
      List.of("Action"),
      "https://store.steampowered.com/app/10",
      "Play the world's number 1 online action game.",
      "Play the world's number 2 online action game.",
      List.of("English", "Italian"),
      List.of("Windows"),
      "https://www.metacritic.com/game/pc/team-fortress-2?ftag=MCD-06-10aaa1f",
      List.of(
        "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002539.600x338.jpg?t=1666823513",
        "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002539.600x338.jpg?t=1666823513"
      ),
      List.of(
        "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002539.600x338.jpg?t=1666823513"
      ),
      5,
      "https://cdn.akamai.steamstatic.com/steam/apps/10/page_bg_generated_v6b.jpg?t=1666823513",
      "Includes intense violence and blood."
    );

    assertEquals(
      35004,
      game.getSourceId()
    );
    assertEquals(
      "<Demon Horde Master>",
      game.getName()
    );
    assertEquals(
      List.of("Valve dev"),
      game.getDevelopers()
    );
    assertEquals(
      List.of("Valve pub"),
      game.getPublishers()
    );
    assertEquals(
      List.of("Multi-player", "PvP", "Online PvP"),
      game.getCategories()
    );
    assertEquals(
      "https://cdn.akamai.steamstatic.com/steam/apps/10/header.jpg?t=1666823513",
      game.getImageHeader()
    );
    assertEquals(
      "https://cdn.akamai.steamstatic.com/steam/apps/10/page_bg_generated.jpg?t=1666823513",
      game.getImageBackground()
    );
    assertEquals(
      List.of("Action"),
      game.getGenres()
    );
    assertEquals(
      "https://store.steampowered.com/app/10",
      game.getStoreUrl()
    );
    assertEquals(
      "Play the world's number 1 online action game.",
      game.getDetailedDescription()
    );
    assertEquals(
      "Play the world's number 2 online action game.",
      game.getShortDescription()
    );
    assertEquals(
      List.of("English", "Italian"),
      game.getSupportedLanguages()
    );
    assertEquals(
      List.of("Windows"),
      game.getPlatforms()
    );
    assertEquals(
      "https://www.metacritic.com/game/pc/team-fortress-2?ftag=MCD-06-10aaa1f",
      game.getMetacritic()
    );
    assertEquals(
      List.of(
        "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002539.600x338.jpg?t=1666823513",
        "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002539.600x338.jpg?t=1666823513"
      ),
      game.getScreenshots()
    );
    assertEquals(
      List.of(
        "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002539.600x338.jpg?t=1666823513"
      ),
      game.getMovies()
    );
    assertEquals(
      5,
      game.getRecommendations()
    );
    assertEquals(
      "https://cdn.akamai.steamstatic.com/steam/apps/10/page_bg_generated_v6b.jpg?t=1666823513",
      game.getBackground()
    );
    assertEquals(
      "Includes intense violence and blood.",
      game.getContentDescriptors()
    );
  }


  @Test
  public void TestSetSourceId(){
    GameDetails game = new GameDetails();
      game.setSourceId(10);
      assertEquals(10, game.getSourceId());
  }

  @Test
  public void TestSetSourceName(){
    GameDetails game = new GameDetails();
    game.setSourceName("game");
    assertEquals("game", game.getSourceName());
  }

  @Test
  public void TestSetName(){
    GameDetails game = new GameDetails();
    game.setName("game");
    assertEquals("game", game.getName());
  }

  @Test
  public void TestSetDevelopers(){
    GameDetails game = new GameDetails();
    game.setDevelopers(List.of("Valve"));
    assertEquals(
      List.of("Valve"),
      game.getDevelopers()
    );
  }

  @Test
  public void TestSetPublishers(){
    GameDetails game = new GameDetails();
    game.setPublishers(List.of("Valve"));
    assertEquals(
      List.of("Valve"),
      game.getPublishers()
    );
  }

  @Test
  public void TestSetImageHeader(){
    GameDetails game = new GameDetails();
    game.setImageHeader("game");
    assertEquals("game", game.getImageHeader());
  }

  @Test
  public void TestSetImageBackground(){
    GameDetails game = new GameDetails();
    game.setImageBackground("game");
    assertEquals("game", game.getImageBackground());
  }

  @Test
  public void TestSetCategories(){
    GameDetails game = new GameDetails();
    game.setCategories(List.of("Multi-player", "PvP"));
    assertEquals(
      List.of("Multi-player", "PvP"),
      game.getCategories()
    );
  }

  @Test
  public void TestSetGenres(){
    GameDetails game = new GameDetails();
    game.setGenres(List.of("Multi-player", "PvP"));
    assertEquals(
      List.of("Multi-player", "PvP"),
      game.getGenres()
    );
  }

  @Test
  public void TestSetSupportedLanguages(){
    GameDetails game = new GameDetails();
    game.setSupportedLanguages(List.of("English", "Italian"));
    assertEquals(
      List.of("English", "Italian"),
      game.getSupportedLanguages()
    );
  }

  @Test
  public void TestSetStoreUrl(){
    GameDetails game = new GameDetails();
    game.setStoreUrl("game");
    assertEquals("game", game.getStoreUrl());
  }

  @Test
  public void TestSetDetailedDescription(){
    GameDetails game = new GameDetails();
    game.setDetailedDescription("game");
    assertEquals("game", game.getDetailedDescription());
  }

  @Test
  public void TestSetShortDescription(){
    GameDetails game = new GameDetails();
    game.setShortDescription("game");
    assertEquals("game", game.getShortDescription());
  }

  @Test
  public void TestSetPlatforms(){
    GameDetails game = new GameDetails();
    game.setPlatforms(List.of("Windows"));
    assertEquals(
      List.of("Windows"),
      game.getPlatforms()
    );
  }

  @Test
  public void TestSetMetacritic(){
    GameDetails game = new GameDetails();
    game.setMetacritic("game");
    assertEquals("game", game.getMetacritic());
  }

  @Test
  public void TestSetScreenshots(){
    GameDetails game = new GameDetails();
    game.setScreenshots(List.of("Screenshot"));
    assertEquals(
      List.of("Screenshot"),
      game.getScreenshots()
    );
  }

  @Test
  public void TestSetMovies(){
    GameDetails game = new GameDetails();
    game.setMovies(List.of("Movie"));
    assertEquals(
      List.of("Movie"),
      game.getMovies()
    );
  }

  @Test
  public void TestSetRecommendations(){
    GameDetails game = new GameDetails();
    game.setRecommendations(10);
    assertEquals(10, game.getRecommendations());
  }

  @Test
  public void TestSetBackground(){
    GameDetails game = new GameDetails();
    game.setBackground("game");
    assertEquals("game", game.getBackground());
  }

  @Test
  public void TestSetContentDescription(){
    GameDetails game = new GameDetails();
    game.setContentDescriptors("game");
    assertEquals("game", game.getContentDescriptors());
  }


  @Test
  public void TestNormalizedString1(){
    GameDetails game = new GameDetails();
    game.setName("<test");
    assertEquals(null, game.getName());
  }

  @Test
  public void TestNormalizedString2(){
    GameDetails game = new GameDetails();
    game.setName("<te]st");
    assertEquals(null, game.getName());
  }

  @Test
  public void TestNormalizedString3(){
    GameDetails game = new GameDetails();
    game.setName("test");
    assertEquals("test", game.getName());
  }

  @Test
  public void TestNormalizedList1(){
    List<String> developers = new ArrayList<String>();
    developers.add("Valve");
    developers.add("test");
    GameDetails game = new GameDetails();
    game.setDevelopers(developers);
    assertEquals("Valve", game.getDevelopers().get(0));
  }

  @Test
  public void TestNormalizedListDevelopers(){
    List<String> developers = new ArrayList<String>();
    developers.add("Valve");
    developers.add("te<s]t");
    GameDetails game = new GameDetails();
    game.setDevelopers(developers);
    assertEquals(null, game.getDevelopers());
  }

  @Test
  public void TestGetNormalizedStringName(){
    GameDetails game = new GameDetails();
    game.setName("nam>e");
    assertEquals(null, game.getName());
  }
}

