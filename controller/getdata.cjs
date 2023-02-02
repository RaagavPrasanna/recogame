/**
 * test for steamapi only 
 */
const api = require("./api.cjs")

async function getdata1(){
  let data = await api.fetchAllSteamApps();
  return data;
}

async function getdata2(){
  let data = await api.fetchGameInfo(587910);
  return data;
}
async function main() {  
  console.log(await getdata2());
}

main()
// check for json
// https://store.steampowered.com/api/appdetails?appids=440
// https://store.steampowered.com/api/appdetails?appids=2286800&&cc==us