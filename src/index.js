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
    return res
  }
  async GetPlayer(){
    let res = await this.Call[{ request: 'GET_PLAYER' }]
    return res
  }



}

export default PokemonGOAPI
