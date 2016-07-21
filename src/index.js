
import Player from '~/Player'
import API from '~/API'

class PokemonGOAPI{

  constructor(props) {
    this.player = new Player()
    this.api = new API()
    this.logged=false
    this.debug=true
  }

  login(username, password, location, provider){
    return new Promise( (resolve, reject) => {
      if (provider !== 'ptc' && provider !== 'google') {
        reject('Invalid provider')
      }
      this.player.SetProvider(provider)

      this.player.SetLocation(location)
      .then( res => {

        this.player.Login(username, password)
        .then( user =>{

          resolve(this)

          // // Set API Endpoint
          // this.api.SetApiEndpoint(user)
          // .then( res =>{



          //   // making a standard call, like it is also done by the client
          //   // self.get_player()
          //   // self.get_hatched_eggs()
          //   // self.get_inventory()
          //   // self.check_awarded_badges()
          //   // self.download_settings(hash="4a2e9bc330dae60e7b74fc85b98868ab4700802e")


          //   this.UpdateProfile()
          //   .then( prof => {
          //     this.logged = true
          //     resolve(this)
          //   }).catch(err => reject(err) )


          // }).catch(err => reject(err) )

        }).catch(err => reject(err) )
      }).catch(err => reject(err) )
    })
  }

  Request(req){
    return new Promise( (resolve, reject) => {
      this.api.Request(req, this.player.playerInfo)
      .then(res => {      
        var profile = ResponseEnvelop.ProfilePayload.decode(res.payload[0]).profile
        this.player.SetProfileDetails(profile)
        resolve(profile)
      })
      .catch(err => reject(err))
    })
  }


}

export default PokemonGOAPI