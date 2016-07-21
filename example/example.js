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
Poke.login(username, password, location, provider)
.then( api => {
  api.Call(['GET_PLAYER']) //get profile
  
})
.catch(err => console.log(err))
