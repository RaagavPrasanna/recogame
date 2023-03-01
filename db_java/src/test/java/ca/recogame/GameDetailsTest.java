package ca.recogame;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

public class GameDetailsTest {
  
   /**
     * test setName()
     */
    @Test
    public void testSetName()
    {
        List<String> developers = new ArrayList<String>();
        developers.add("Valve");  
        List<String> publishers = new ArrayList<String>();
        publishers.add("Valve");
        List<String> category = new ArrayList<String>();
        category.add("Multi-player");
        category.add("PvP");
        category.add("Online PvP");
        List<String> genres = new ArrayList<String>();
        genres.add("Action");
        List<String> languages = new ArrayList<String>();
        languages.add("English");
        languages.add("Italian");
        List<String> plateforms = new ArrayList<String>();
        plateforms.add("Windows");
        List<String> screenshots = new ArrayList<String>();
        screenshots.add(
          "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002539.600x338.jpg?t=1666823513");
        List<String> movies = new ArrayList<String>();
        movies.add(
          "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002539.600x338.jpg?t=1666823513");
        
        GameDetails game = new GameDetails(
          35004,
          "steam",
          "<Demon Horde Master>", 
          developers, 
          publishers,
          "https://cdn.akamai.steamstatic.com/steam/apps/10/header.jpg?t=1666823513",
          "https://cdn.akamai.steamstatic.com/steam/apps/10/page_bg_generated.jpg?t=1666823513",
          category, 
          genres, 
          "https://store.steampowered.com/app/10",
          "Play the world's number 1 online action game.", 
          "Play the world's number 1 online action game.",
          languages,
          plateforms, 
          "https://store.steampowered.com/app/10",
          screenshots,
          movies,
          5,
          "https://cdn.akamai.steamstatic.com/steam/apps/10/page_bg_generated_v6b.jpg?t=1666823513",
          "Includes intense violence and blood."
        );

        assertEquals(5, game.getRecommendations());
        // assertEquals(null, game.getName());
        assertEquals("Valve", game.getDevelopers().get(0));
        assertEquals("PvP", game.getCategories().get(1));
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
