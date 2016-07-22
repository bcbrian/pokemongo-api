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

}

export default PokemonGOAPI
