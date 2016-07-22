import Player from '~/Player'
import API from '~/API'
import PlayerMap from '~/PlayerMap'

class PokemonGOAPI {

  constructor(props) {
    this.player = new Player()
    this.api = new API()
    this.map = new PlayerMap()
    this.logged = false
    this.debug = true
    this.useHartBeat = false
  }

  async login(username, password, location, provider) {

    if (provider !== 'ptc' && provider !== 'google') {
      throw new Error('Invalid provider')
    }

    this.player.provider = provider

    await this.player.setLocation(location)
    await this.player.Login(username, password)
    await this.api.setEndpoint(this.player.playerInfo)

    return this
  }

  //
  //This calls the API direct
  //
  Call(req) {
    return this.api.Request(req, this.player.playerInfo)
  }

  GetInventory(){
    return this.Call([{ request: 'GET_INVENTORY' }])
  }

  GetPlayer(){
    return this.Call([{ request: 'GET_PLAYER' }])
  }

  //
  // HeartBeat
  //
  async ToggleHartBeat(){
    this.useHartBeat = !this.useHartBeat
    this._loopHartBeat()
    return this.useHartBeat
  }

  async _loopHartBeat(){
    while(this.useHartBeat){
      var finalWalk = this.map.getNeighbors(this.player.playerInfo)
      var nullarray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

      let res = await this.Call[{
        request: 'GET_MAP_OBJECTS',
        message: {
          cell_id: finalWalk,
          since_timestamp_ms: nullarray,
          latitude: this.player.playerInfo.latitude,
          longitude: this.player.playerInfo.longitude,
        }
      }]
    }
  }

  async FortSearch(fort){
    // TODO 
    // add checks for input 
    // fort = should be object with (fort_id,fort_latitude,fort_longitude)

    let res = await this.Call[{
      request: 'FORT_SEARCH',
      message: {
        fort_id: fort.fort_id
        latitude: this.player.playerInfo.latitude,
        longitude: this.player.playerInfo.longitude,
        fort_latitude: fort.fort_latitude
        fort_longitude: fort.fort_longitude
      }
    }]
    return res
  }

  async CatchPokemon(pokemon){
    // TODO 
    // add checks for input 
    // pokemon = should be object with (encounter_id and spawn_point_id)

    var spin_modifier 0.85 + Math.random() * 0.15 

    let res = await this.Call[{
      request: 'CATCH_POKEMON',
      message: {
        encounter_id: pokemon.encounter_id,
        pokeball: 1,
        normalized_reticle_size: 1.95,
        spawn_point_guid: pokemon.spawn_point_id,
        hit_pokemon: true,
        spin_modifier: spin_modifier,
        normalized_hit_position: 1.0,
      }
    }]
    return res
  }

  async EncounterPokemon(enc_id, spawn_id){
    // TODO 
    // add checks for input 
    // enc_id = integer
    // spawn_id = string

    let res = await this.Call[{
      request: 'ENCOUNTER',
      message: {
        encounter_id: enc_id,
        spawn_point_id: spawn_id,
        latitude: this.player.playerInfo.latitude,
        longitude: this.player.playerInfo.longitude,
      }
    }]
    return res
  }

  async EncounterPokemon(enc_id, spawn_id){
    // TODO 
    //add checks for input 

    let res = await this.Call[{
      request: 'ENCOUNTER',
      message: {
        encounter_id: enc_id,
        spawn_point_id: spawn_id,
        latitude: this.player.playerInfo.latitude,
        longitude: this.player.playerInfo.longitude,
      }
    }]
    return res
  }

}

export default PokemonGOAPI
