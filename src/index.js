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

  async Call(req) {
    let res = await this.api.Request(req, this.player.playerInfo)
    return res
  }

}

export default PokemonGOAPI
