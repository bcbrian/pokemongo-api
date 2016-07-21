import PokeAPI from '../src'

//user account
//todo

//
// Poke.UpdateProfile()
// Poke.player.getCreatedDate()


const Poke = new PokeAPI()
Poke.login(USERNAME, PASSWORD, LOGINLOCATION, PROVIDER)
.then( res => {
  res.Request(2) //get profile
  res.Request(2)
  
})
.catch(err => console.log(err))

