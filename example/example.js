import PokeAPI from '../src'

//Set environment variables or replace placeholder text
var location = {
    type: 'name',
    name: process.env.PGO_LOCATION || 'Times Square'
};

var username = process.env.PGO_USERNAME || 'USER'
var password = process.env.PGO_PASSWORD || 'PASS'
var provider = process.env.PGO_PROVIDER || 'ptc'

const Poke = new PokeAPI()

async function init() {
  const api = await Poke.login(username, password, location, provider)
  // let player = await Poke.GetPlayer() //get profile
  // Poke.ToggleHartBeat() //get inventory
  let res = await Poke.test()
  console.log(res)
  setInterval(()=>{}, 50000)
  // console.log(new Date(player.GetPlayerResponse.player_data.creation_timestamp_ms.toNumber()))
  // console.log(JSON.stringify(res, null, '  '))
}

init().catch(console.log)
