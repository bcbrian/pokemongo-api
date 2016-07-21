import PokeAPI from '../src'
import _ from 'lodash'

//todo


const Poke = new PokeAPI()
Poke.login(USERNAME, PASSWORD, LOGINLOCATION, PROVIDER)
.then( api => {
  api.Call(['GET_PLAYER']) //get profile
  
})
.catch(err => console.log(err))
