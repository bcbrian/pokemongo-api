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
    return this
  }

  async Call(req) {
    // TODO: ResponseEnvelop is undefined
    let res = await this.api.Request(req, this.player.playerInfo)
    let profile = ResponseEnvelop.ProfilePayload.decode(res.payload[0]).profile

    this.player.profileDetails = profile

    return profile
  }

}

export default PokemonGOAPI
