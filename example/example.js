import PokeAPI from '../src'
import _ from 'lodash'

//todo

//user account
//
// Poke.UpdateProfile()
// Poke.player.getCreatedDate()


const Poke = new PokeAPI()
Poke.login(USERNAME, PASSWORD, LOGINLOCATION, PROVIDER)
.then( api => {
  api.Call(['GET_PLAYER', 'GET_INVENTORY']) //get profile
  
})
.catch(err => console.log(err))
