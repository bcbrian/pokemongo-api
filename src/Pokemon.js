import "babel-polyfill";
import pokedex from '../pokedex.json'

var pokedexMap = new Map();

for(let p of pokedex.pokemon)
  pokedexMap.set(p.id, p)

class Pokemon{
  constructor(props) {
    Object.assign(this, props, pokedexMap.get(props.pokemon_id))
    delete this.id
    console.log(`[i] found ${this.name}. Direction: ${this.direction}`)
  }

  get direction(){
    let google = 'https://www.google.com/maps/dir/Current+Location/'
    return google + `${this.latitude},${this.longitude}`
  }

  Catch() {

  }

}
export default Pokemon
