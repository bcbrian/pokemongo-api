import PokeAPI from '../src'

//todo

//
// Poke.UpdateProfile()
// Poke.player.getCreatedDate()


const Poke = new PokeAPI()
Poke.login(USERNAME, PASSWORD, LOGINLOCATION, PROVIDER)
.then( api => {
  api.Call(['GET_PLAYER']) //get profile
  api.Call(['GET_PLAYER']) //get profile
  
})
.catch(err => console.log(err))

