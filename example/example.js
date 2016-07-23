import env from 'node-env-file'
import PokeAPI from '../src'

env(__dirname + '/.env');

//Set environment variables or replace placeholder text
var location = {
    type: 'name',
    name: process.env.PGO_LOCATION || 'Times Square'
};

// var location = {
//     type: 'coords',
//     coords: {
//       latitude: 40.759211,
//       longitude: -73.984472,
//       altitude: 0,
//     }
// };

var username = process.env.PGO_USERNAME || 'USER'
var password = process.env.PGO_PASSWORD || 'PASS'
var provider = process.env.PGO_PROVIDER || 'ptc'

const Poke = new PokeAPI()

async function init() {
  const api = await Poke.login(username, password, location, provider)

  let res = await Poke.GetPlayer()
  console.log(res)
  let res2 = await Poke.GetInventory()
  console.log(res2)
  let res3 = await Poke.GetMapObjects()
  console.log(res3)

  //walk a little..
  Poke.player.WalkAround()
}

init().catch(console.log)
