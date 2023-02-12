/**
 * test for steamapi only 
 */
import * as api from "./steam_api.js";
// const api = require("./steam_api.js")

async function getdata1(){
  let data = await api.fetchAllSteamApps();
  return data;
}

async function getdata2(){
  let data = await api.fetchGameInfo(440);
  return data;
}
async function main() {  
  console.log(await getdata2());
}

main()

//test data
// check for json
// https://store.steampowered.com/api/appdetails?appids=440
// https://store.steampowered.com/api/appdetails?appids=2286800&&cc==us
// 588730, 1118314--> null, 583590, 440 -->full, 2286800