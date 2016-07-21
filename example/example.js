import PokeAPI from '../src'
import _ from 'lodash'

//todo

//user account
const USERNAME ='knuths'
const PASSWORD ='knuths123'
const PROVIDER ='ptc'
const LOGINLOCATION ={
  type: 'name',
  name: 'Strandboulevarden 89, 2100 København Ø'
}

const Poke = new PokeAPI()
Poke.login(USERNAME, PASSWORD, LOGINLOCATION, PROVIDER)
.then( api => {
  api.Call(['GET_PLAYER']) //get profile
  
})
.catch(err => console.log(err))
