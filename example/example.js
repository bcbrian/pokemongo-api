import env from 'node-env-file'
import PokeAPI from '../src'

env(__dirname + '/.env');

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
  let res = await api.GetPlayer() //get profile
  console.log(res)
}

init()
