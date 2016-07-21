import PokeAPI from '../src'

//todo

//
// Poke.UpdateProfile()
// Poke.player.getCreatedDate()


const Poke = new PokeAPI()
Poke.login(USERNAME, PASSWORD, LOGINLOCATION, PROVIDER)
.then( res => {
  res.Request(['GET_PLAYER']) //get profile
  res.Request(['GET_PLAYER']) //get profile
  
})
.catch(err => console.log(err))

