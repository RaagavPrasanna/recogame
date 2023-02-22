package ca.recogame;

//mongo objects all have ObjectID types
import org.bson.types.*;
//for the List type
import java.util.*;
import java.text.Normalizer;
import java.text.Normalizer.Form;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class GameDetails {
  private ObjectId id;
  private int steamId;
  private String name;
  private List<String> developers;
  private List<String> publishers;
  private String imageHeader;
  private String imageBackground;
  private List<String> categories;
  private List<String> genres;
  private String storeUrl;
  private String detailedDescription;
  private String shortDescription;
  private List<String> supportedLanguages;
  private List<String> platforms;
  private String metacritic;
  private List<String> screenshots;
  private List<String> movies;
  private int recommendations;
  private String background;
  private String contentDescriptors;

  //empty constructor for POJO
  public GameDetails(){} 

  public GameDetails(int steamId, String name, List<String> developers, List<String> publishers, String imageHeader,
      String imageBackground, List<String> categories, List<String> genres, String storeUrl, String detailedDescription,
      String shortDescription, List<String> supportedLanguages, List<String> platforms, String metacritic,
      List<String> screenshots, List<String> movies, int recommendations, String background,
      String contentDescriptors) {
    this.steamId = steamId;
    this.name = name;
    this.developers = developers;
    this.publishers = publishers;
    this.imageHeader = imageHeader;
    this.imageBackground = imageBackground;
    this.categories = categories;
    this.genres = genres;
    this.storeUrl = storeUrl;
    this.detailedDescription = detailedDescription;
    this.shortDescription = shortDescription;
    this.supportedLanguages = supportedLanguages;
    this.platforms = platforms;
    this.metacritic = metacritic;
    this.screenshots = screenshots;
    this.movies = movies;
    this.recommendations = recommendations;
    this.background = background;
    this.contentDescriptors = contentDescriptors;
  }

  public ObjectId getId() {
    return id;
  }

  public void setId(ObjectId id) {
    this.id = id;
  }

  public int getSteamId() {
    return steamId;
  }

  public void setSteamId(int steamId) {
    this.steamId = steamId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = getNormalizedString(name, "name");   
  }

  public List<String> getDevelopers() {
    return developers;
  }

  public void setDevelopers(List<String> developers) {
    this.developers = 
      getNormalizedList(developers, "developers");
  }

  public List<String> getPublishers() {
    return publishers;
  }

  public void setPublishers(List<String> publishers) {
    this.publishers = 
      getNormalizedList(publishers, "publisher");    
  }

  public String getImageHeader() {
    return imageHeader;
  }

  public void setImageHeader(String imageHeader) {
    this.imageHeader = 
      getNormalizedString(imageHeader, "imageHeader");   
  }

  public String getImageBackground() {
    return imageBackground;
  }

  public void setImageBackground(String imageBackground) {
    this.imageBackground = 
      getNormalizedString(imageBackground, "imageBackground");    
  }

  public List<String> getCategories() {
    return categories;
  }

  public void setCategories(List<String> categories) {
    this.categories = 
      getNormalizedList(categories, "categories");
  }

  public List<String> getGenres() {
    return genres;
  }

  public void setGenres(List<String> genres) {
    this.genres = getNormalizedList(genres, "genres");
  }

  public String getStoreUrl() {
    return storeUrl;
  }

  public void setStoreUrl(String storeUrl) {
    this.storeUrl = getNormalizedString(storeUrl, "storeUrl");
  }

  public String getDetailedDescription() {
    return detailedDescription;
  }

  public void setDetailedDescription(String detailedDescription) {
    this.detailedDescription = 
      getNormalizedString(detailedDescription, "detailedDescription");
  }

  public String getShortDescription() {
    return shortDescription;
  }

  public void setShortDescription(String shortDescription) {
    this.shortDescription = 
      getNormalizedString(shortDescription, "shortDescription");
  }

  public List<String> getSupportedLanguages() {
    return supportedLanguages;
  }

  public void setSupportedLanguages(List<String> supportedLanguages) {
    this.supportedLanguages = 
      getNormalizedList(supportedLanguages, "supportedLanguages");
  }

  public List<String> getPlatforms() {
    return platforms;
  }

  public void setPlatforms(List<String> platforms) {
    this.platforms = 
      getNormalizedList(platforms, "platforms");
  }

  public String getMetacritic() {
    return metacritic;
  }

  public void setMetacritic(String metacritic) {
    this.metacritic = 
      getNormalizedString(metacritic, "metacritic");
  }

  public List<String> getScreenshots() {
    return screenshots;
  }

  public void setScreenshots(List<String> screenshots) {
    this.screenshots = 
      getNormalizedList(screenshots, "screenshots");
  }

  public List<String> getMovies() {
    return movies;
  }

  public void setMovies(List<String> movies) {
    this.movies = getNormalizedList(movies, "movies");
  }

  public int getRecommendations() {
    return recommendations;
  }

  public void setRecommendations(int recommendations) {
    this.recommendations = recommendations;
  }

  public String getBackground() {
    return background;
  }

  public void setBackground(String background) {
    this.background = 
      getNormalizedString(background, "background");
  }

  public String getContentDescriptors() {
    return contentDescriptors;
  }

  public void setContentDescriptors(String contentDescriptors) {
    this.contentDescriptors = 
      getNormalizedString(contentDescriptors, "contentDescriptors");
  }
/**
 * validate string 
 * @param input a string 
 * @return boolean the result of normalized string
 */
  private boolean normalizedString(String input){
    boolean isValide = false;
    String checkText = Normalizer.normalize(input, Form.NFKC);
    Pattern pattern = Pattern.compile("[<>]");
   //Search for occurance "<" or "<" within the string str 
    Matcher matcher = pattern.matcher(checkText);
   if (matcher.find() == false ) {         
       isValide = true;
   }  
   return isValide;
  }
/**
 * validate List of String
 * @param input a list of string
 * @return      true if all the string are vnormlized, else return false.
 */
  private boolean normalizedList(List<String> input){   
    for ( String x : input){
      if(normalizedString(x) == false){
        return false;
      }
    }
    return true;
  }
/**
 * use NormalizedString() and normalizedList() to 
 * valide the input string and return the value of input , or null.
 * @param input List<String>
 * @param field String for error on normalization of this field. 
 * @return      the same input as List<String> or null
 */
  private List<String> getNormalizedList(List<String> input, String field){
    if (input == null){
      return null;
    }else if (normalizedList(input) == true){
      return input;
    }else{
      System.out.println("Not valide in " + field + " !");
      return null;
    }
  }

/**
 * use NormalizedString() to valide the input string and return the value of input , or null.
 * @param input String
 * @param field String for error message on specific field
 * @return input or null
 */ 
  private String getNormalizedString(String input, String field){
    if (input == null){
      return null;
    }else if ( normalizedString(input) == true ){
      return input;
    }else{
      System.out.println("Not valide in " + field + " !");
      return null;
    }
  }

@Override
public String toString() {
  return "GameDetails [id=" + id + ", steamId=" + steamId + ", name=" + name + ", developers=" + developers
      + ", publishers=" + publishers + ", imageHeader=" + imageHeader + ", imageBackground=" + imageBackground
      + ", categories=" + categories + ", genres=" + genres + ", storeUrl=" + storeUrl + ", detailedDescription="
      + detailedDescription + ", shortDescription=" + shortDescription + ", supportedLanguages=" + supportedLanguages
      + ", platforms=" + platforms + ", metacritic=" + metacritic + ", screenshots=" + screenshots + ", movies="
      + movies + ", recommendations=" + recommendations + ", background=" + background + ", contentDescriptors="
      + contentDescriptors + "]";
}
  

}
