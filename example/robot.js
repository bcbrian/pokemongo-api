import env from 'node-env-file'
import PokeAPI from '../src'

env(__dirname + '/.env');

//Set environment variables or replace placeholder text
var location = {
    type: 'coords',
    coords: {
      latitude: 40.759211,
      longitude: -73.984472,
      altitude: 0,
    }
};

var username = process.env.PGO_USERNAME || 'USER'
var password = process.env.PGO_PASSWORD || 'PASS'
var provider = process.env.PGO_PROVIDER || 'ptc'

const Poke = new PokeAPI()

async function init() {
  //yep, we do need to login..

  const api = await Poke.login(username, password, location, provider)

  // just update the profile...
  let player = await Poke.GetPlayer()

  //get map objects..
  let map = await Poke.GetMapObjects()
  map.GetMapObjectsResponse.map_cells.map( cell => {

    //catchable pokemons from here?
    if (cell.catchable_pokemons.length > 0){
      //we have wild pokemons

    }

    //wild pokemons
    if (cell.wild_pokemons.length > 0){
      //we have wild pokemons
    }

    //forts
    if (cell.forts.length > 0){
      //we have wild pokemons
    }

    console.log(cell.catchable_pokemons.length)
    //Done...
    //TODO: We need to move.. like a human..!

  });
}

init()
