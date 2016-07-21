import GeoLib from 'geolib'

import PokemonList from './pokemons.json'

class Pokemon{
  constructor(props) {
  }
  Catch(){

  }
  Find(){
    
  }
  
  GetPokemonName(id){
    var pokemons = JSON.parse(PokemonList)
    pokemons.map( pok => {
      if (pok.id == id) return pok
    })
  }
}
export default Pokemon