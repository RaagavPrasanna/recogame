const api = require("./api.cjs")

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
