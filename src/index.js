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

  GetInventory() {
    return this.Call([{ request: 'GET_INVENTORY' }])
  }

  GetPlayer() {
    return this.Call([{ request: 'GET_PLAYER' }])
  }

  //
  // HeartBeat
  //
  async ToggleHartBeat() {
    this.useHartBeat = !this.useHartBeat
    this._loopHartBeat()
    return this.useHartBeat
  }

  async _loopHartBeat() {
    while(this.useHartBeat){
      setInterval(() => {
        var area = this.GetMapObjects()
      },2000);
    }
  }

  GetMapObjects(){
    var seconds = new Date().getTime();
    var finalWalk = this.map.getNeighbors(this.player.playerInfo).sort()
    var nullarray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var res = this.Call([{
      request: 'GET_MAP_OBJECTS',
      message: {
        cell_id: finalWalk,
        since_timestamp_ms: nullarray,
        latitude: this.player.playerInfo.latitude,
        longitude: this.player.playerInfo.longitude
      }
    }])
    return res
  }

  FortRecallPokemon(fort_id, pokemon_id) {
    if (!fort_id > 0) throw new Error('FortRecallPokemon: Fort id missing')
    if (!pokemon_id > 0) throw new Error('FortRecallPokemon: Pokemon id missing')

    return this.Call([{
      request: 'FORT_RECALL_POKEMON',
      message: {
        fort_id: fort_id,
        pokemon_id: pokemon_id,
        player_latitude: this.player.playerInfo.latitude,
        player_longitude: this.player.playerInfo.longitude,
      }
    }])
  }

  FortDeployPokemon(fort_id, pokemon_id) {
    if (!fort_id > 0) throw new Error('FortDeployPokemon: Fort id missing')
    if (!pokemon_id > 0) throw new Error('FortDeployPokemon: Pokemon id missing')

    return this.Call([{
      request: 'FORT_DEPLOY_POKEMON',
      message: {
        fort_id: fort_id,
        pokemon_id: pokemon_id,
        player_latitude: this.player.playerInfo.latitude,
        player_longitude: this.player.playerInfo.longitude,
      }
    }])
  }

  FortDetails(fort) {
    if (fort.length > 0) throw new Error('FortDetails: Fort input not set')

    return this.Call([{
      request: 'FORT_DETAILS',
      message: {
        fort_id: fort.fort_id,
        latitude: fort.latitude,
        longitude: fort.longitude,
      }
    }])
  }

  FortSearch(fort) {
    if (fort.length > 0) throw new Error('FortSearch: Fort input not set')

    return this.Call([{
      request: 'FORT_SEARCH',
      message: {
        fort_id: fort.fort_id,
        player_latitude: this.player.playerInfo.latitude,
        player_longitude: this.player.playerInfo.longitude,
        fort_latitude: fort.fort_latitude,
        fort_longitude: fort.fort_longitude
      }
    }])
  }

  CatchPokemon(pokemon) {
    if (pokemon.length > 0) throw new Error('CatchPokemon: Pokemon input not set')

    var spin_modifier = 0.85 + Math.random() * 0.15

    return this.Call([{
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
    }])
  }

  EncounterPokemon(pokemon) {
    if (pokemon.length > 0) throw new Error('EncounterPokemon: Pokemon input not set')

    return this.Call([{
      request: 'ENCOUNTER',
      message: {
        encounter_id: pokemon.encounter_id,
        spawn_point_id: pokemon.spawn_point_id,
        player_latitude: this.player.playerInfo.latitude,
        player_longitude: this.player.playerInfo.longitude,
      }
    }])
  }

  ReleasePokemon(pokemon_id) {
    if (!pokemon_id > 0) throw new Error('ReleasePokemon: pokemon_id missing')

    return this.Call([{
      request: 'RELEASE_POKEMON',
      message: { pokemon_id }
    }])
  }

  UseItemPotion(item_id, pokemon_id) {
    if (!item_id > 0) throw new Error('UseItemPotion: item_id missing')
    if (!pokemon_id > 0) throw new Error('UseItemPotion: pokemon_id missing')

    return this.Call([{
      request: 'USE_ITEM_POTION',
      message: { item_id, pokemon_id }
    }])
  }


}

export default PokemonGOAPI
