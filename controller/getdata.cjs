const api = require("./api.cjs")

async function getdata1(){
  let data = await api.fetchAllSteamApps();
  return data;
}

async function getdata2(){
  let data = await api.fetchGameInfo(2286800);
  return data;
}
async function main() {
  const info = await getdata2();
  console.log(await getdata2());
}

main()
// check for json
// https://store.steampowered.com/api/appdetails?appids=440