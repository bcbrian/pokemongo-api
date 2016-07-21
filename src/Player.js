
import GeoCoder from 'geocoder'
import moment from 'moment'
import Auth from '~/Auth'


class Player{
  constructor(props) {
    this.playerInfo = {
      accessToken: '',
      username: '',
      password: '',
      debug: true,
      latitude: 0,
      longitude: 0,
      altitude: 0,
      locationName: '',
      provider: '',
      sessionData: {},
    }
    this.Auth = new Auth()
  }

  set provider(provider) {
    this.playerInfo.provider = provider
  }

  set profileDetails(data) {
    this.playerInfo.sessionData = data
  }

  get locationCoords() {
    let {latitude, longitude, altitude} = this.playerInfo
    return {
      latitude,
      longitude,
      altitude
    }
  }

  get coords() {
    let {latitude, longitude} = this.playerInfo
    return [latitude, longitude]
  }

  get profile() {
    return this.playerInfo
  }

  // TODO return Date obj
  get createdDate() {
    var date = new moment((this.playerInfo.sessionData.creation_time.toString()/100)).format("dddd, MMMM Do YYYY, h:mm:ss a")
    console.log(`[+] You are playing Pokemon Go since: {${date}}`)
    return date
  }

  get pokeStorage(){
    var storage = this.playerInfo.sessionData.poke_storage
    console.log(`[+] Poke Storage: {${storage}}`)
    return storage
  }

  get itemsStorage(){
    var storage = this.playerInfo.sessionData.item_storage
    console.log(`[+] Item Storage: {${storage}}`)
    return storage
  }

  // TODO use getter
  get currency(){
    var curr = this.playerInfo.sessionData.currency
    curr.map(obj => {
      console.log(`[+] Currency (${obj.type}): {${storage}}`)
    })
    return curr
  }

  async Login(user, pass){
    let res = await this.Auth.login(user, pass, this.playerInfo.provider)

    this.playerInfo.username = user
    this.playerInfo.password = pass
    this.playerInfo.accessToken = res

	return this.playerInfo
  }

  setLocation(location){
    return new Promise( (resolve, reject) => {
      if (location.type !== 'name' && location.type !== 'coords')
        reject(new Error('Invalid location type'))

	  // use google map search by name
      if (location.type === 'name') {
        if (!location.name) reject(new Error('You should add a location name'))

        const locationName = location.name;
        GeoCoder.geocode(locationName, (err, data) => {
          if (err || data.status === 'ZERO_RESULTS')
            reject(new Error('location not found'))

          let {lat, lng} = data.results[0].geometry.location

          this.playerInfo.latitude = lat
          this.playerInfo.longitude = lng
          this.playerInfo.locationName = locationName

          //return
          resolve(this.locationCoords)
        })
		return
      }

	  // use latitude longitude
	  if (!location.coords) reject(new Error('Coords object missing'))

	  this.playerInfo.latitude = location.coords.latitude || this.playerInfo.latitude
	  this.playerInfo.longitude = location.coords.longitude || this.playerInfo.longitude
	  this.playerInfo.altitude = location.coords.altitude || this.playerInfo.altitude

	  GeoCoder.reverseGeocode(...this.coords, (err, data) => {
        if (data.status !== 'ZERO_RESULTS')
        this.playerInfo.locationName = data.results[0].formatted_address

        //return
        resolve (this.locationCoords)
	  })

    })
  }

}

export default Player
