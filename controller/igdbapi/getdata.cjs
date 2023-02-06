/**
 * test for steamapi only 
 */
const api = require("./igdb_api.cjs");
const axios = require('axios');
require("dotenv").config();
const id = process.env.client_id;
const auth = process.env.Authorization;


async function getdata1(){
  let data = await api.fetchAllIGDBApps();
  return data;
}

async function getdata2(){
  let data = await api.fetchGameInfoId(35004);
  return data;
}
async function getdata3(){
  let data = await api.fetchGameInfoWord("race");
  return data;
}
async function main() {  
  console.log(await getdata2());
}
main()


// function igdb(){
//   axios({
//     url: "https://api.igdb.com/v4/games",
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Client-ID': id,
//         'Authorization': auth,
//     },
//     data: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots.*,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;",

//   })
//     .then(response => {
//         console.log(response.data);
//     })
//     .catch(err => {
//       console.log("something wrong ************");
//       // console.error(err);
//     });
// }
// function screenshot(){
//   axios({
//     url: "https://api.igdb.com/v4/screenshots",
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Client-ID':id ,
//         'Authorization': auth,
//     },
//     data: "fields alpha_channel,animated,checksum,game,height,image_id,url,width;",
//   })
//     .then(response => {
//         console.log(response.data);
//     })
//     .catch(err => {
//         console.error(err);
//     });

// }

// check for json
// https://store.steampowered.com/api/appdetails?appids=440
// https://store.steampowered.com/api/appdetails?appids=2286800&&cc==us