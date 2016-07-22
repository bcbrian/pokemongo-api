import Player from '~/Player'
import API from '~/API'

class PokemonGOAPI {

  constructor(props) {
    this.player = new Player()
    this.api = new API()
    this.logged = false
    this.debug = true

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
  async Call(req) {
    let res = await this.api.Request(req, this.player.playerInfo)
    return res
  }
  async GetInventory(){
    let res = await this.Call[{ request: 'GET_INVENTORY' }]
    console.log('res')
    console.log(res)
    return res
  }
  async GetPlayer(){
    let res = await this.Call[{ request: 'GET_PLAYER' }]
    return res
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
      var finalWalk = [];
      m.getNeighbors(playerInfo).sort().forEach(function(k) {
        finalWalk.push(k.id());
      });
      var nullarray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

      let res = await this.Call[{ 
        request: 'GET_MAP_OBJECTS',
        message: {
          cell_id: 
          since_timestamp_ms: nullarray,
          latitude: this.player.playerInfo.latitude,
          longitude: this.player.playerInfo.longitude,
        } 
      }]
    }
  }





}

export default PokemonGOAPI
