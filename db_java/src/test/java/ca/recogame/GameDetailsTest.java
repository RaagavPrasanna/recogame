package ca.recogame;

import static org.junit.Assert.assertEquals;
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
        assertEquals(35004, game.getSourceId());
        assertEquals("<Demon Horde Master>", game.getName());
        assertEquals("steam", game.getSourceName());
        assertEquals("Valve", game.getDevelopers().get(0));
        assertEquals("Valve", game.getPublishers().get(0));
        assertEquals("PvP", game.getCategories().get(1));
        assertEquals("https://cdn.akamai.steamstatic.com/steam/apps/10/header.jpg?t=1666823513", 
                      game.getImageHeader());
        assertEquals("https://cdn.akamai.steamstatic.com/steam/apps/10/page_bg_generated.jpg?t=1666823513", 
                      game.getImageBackground());              
        assertEquals("Action", game.getGenres().get(0));
        assertEquals("https://store.steampowered.com/app/10", game.getStoreUrl());
        assertEquals("Play the world's number 1 online action game.", game.getDetailedDescription());
        assertEquals("Play the world's number 1 online action game.", game.getShortDescription());
        assertEquals("English", game.getSupportedLanguages().get(0));
        assertEquals("Windows", game.getPlatforms().get(0));
        assertEquals("https://store.steampowered.com/app/10", game.getMetacritic());
        assertEquals("https://cdn.akamai.steamstatic.com/steam/apps/10/0000002539.600x338.jpg?t=1666823513", 
                      game.getScreenshots().get(0));
        assertEquals("https://cdn.akamai.steamstatic.com/steam/apps/10/0000002539.600x338.jpg?t=1666823513", 
                      game.getMovies().get(0));       
        assertEquals(5, game.getRecommendations());
        assertEquals("https://cdn.akamai.steamstatic.com/steam/apps/10/page_bg_generated_v6b.jpg?t=1666823513", 
                      game.getBackground());
        assertEquals("Includes intense violence and blood.", game.getContentDescriptors());
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
      List<String> developers = new ArrayList<String>();
      developers.add("Valve");  
      game.setDevelopers(developers);
      assertEquals("Valve", game.getDevelopers().get(0));
    }

    @Test
    public void TestSetPublishers(){
      GameDetails game = new GameDetails();        
      List<String> publishers = new ArrayList<String>();
      publishers.add("Valve");
      game.setPublishers(publishers);
      assertEquals("Valve", game.getPublishers().get(0));
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
      List<String> category = new ArrayList<String>();
      category.add("Multi-player");
      category.add("PvP");
      category.add("Online PvP");
      game.setCategories(category);;
      assertEquals("Online PvP", game.getCategories().get(2));
    }

    @Test
    public void TestSetGenres(){
      GameDetails game = new GameDetails(); 
      List<String> genres = new ArrayList<String>();
      genres.add("Action");
      game.setGenres(genres);
      assertEquals("Action", game.getGenres().get(0));
    }
    
    @Test
    public void TestSetLanguages(){
      GameDetails game = new GameDetails(); 
      List<String> languages = new ArrayList<String>();
      languages.add("English");
      languages.add("Italian");
      game.setSupportedLanguages(languages);
      assertEquals("Italian", game.getSupportedLanguages().get(1));
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
      List<String> plateforms = new ArrayList<String>();
      plateforms.add("Windows");
      game.setPlatforms(plateforms);
      assertEquals("Windows", game.getPlatforms().get(0));
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
      List<String> screenshots = new ArrayList<String>();
      screenshots.add(
        "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002539.600x338.jpg?t=1666823513");
      game.setScreenshots(screenshots);
      assertEquals("https://cdn.akamai.steamstatic.com/steam/apps/10/0000002539.600x338.jpg?t=1666823513", 
            game.getScreenshots().get(0));
    }

    @Test
    public void TestSetMovies(){
      GameDetails game = new GameDetails();
      List<String> movies = new ArrayList<String>();
      movies.add(
        "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002539.600x338.jpg?t=1666823513");
      game.setMovies(movies);
      assertEquals("https://cdn.akamai.steamstatic.com/steam/apps/10/0000002539.600x338.jpg?t=1666823513",
        game.getMovies().get(0));
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
