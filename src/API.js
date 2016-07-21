import {
  API_URL
} from '../env'

import Request from 'request'

import PokomonGoBuf from 'pokemongo-protobuf';

class Connection {
  constructor(props) {
    this.endPoint = API_URL
    this.auth_ticket ={}
    this.cookieJar = Request.jar()
    this.request = Request.defaults({jar: this.cookieJar})
  }

  _get_rpc_id(){
    return 8145806132888207460
  }

  Request(requests,userObj){
    return new Promise( (resolve, reject) => {
      if (this.endPoint.length < 5 || !this.endpoint) reject('Error: No endPoint set!')
      if (userObj.latitude == 0 || userObj.longitude == 0) reject ('Error: position missing')

      requests.map( req => {

      })


      var req = [
        new POGORequest.Networking.Requests.Request(req_method)
      ]

      var request = new POGORequestEnvelope.Networking.Envelopes.RequestEnvelope({
        status_code: 2,
        latitude: userObj.latitude,
        longitude: userObj.longitude,
        altitude: userObj.altitude,
        auth_ticket: this.auth_ticket,
        unknown12: 989,
        requests: req,
        auth_info: new POGORequestEnvelope.Networking.Envelopes.RequestEnvelope.AuthInfo({
          provider: userObj.provider,
          token: {
            contents: userObj.accessToken,
            unknown2: 59,
          }
        })
      })

      var protobuf = request.encode().toBuffer();

      var options = {
        url: this.endPoint,
        body: protobuf,
        encoding: null,
        headers: {
            'User-Agent': 'Niantic App'
        }
      }

      this.request.post(options, (err, response, body) => {
          if (response === undefined || body === undefined) {
              console.error('[!] RPC Server offline');
              reject('RPC Server offline');
          }
          try {
              var res = POGOResponseEnvelope.Networking.Envelopes.ResponseEnvelope.decode(body);
          } catch (e) {
              if (e.decoded) { // Truncated
                  console.warn(e);
                  res = e.decoded; // Decoded message with missing required fields
              }
          }
          console.log(res)

          if(res) 
            resolve(res);
          else 
            resolve(this._request(userObj.endpoint, userObj.accessToken, req))

      });

    })
  }

  _serializeReqs(type, payload){
    return PokomonGoBuf.serialize({
      request_type: type,
      request_message: payload,
    }, 'POGOProtos.Networking.Requests.Request');
  }

  _setAuthTicket(body){
    if (res.auth_ticket)
      this.auth_ticket = res.auth_ticket
  }
  _setEndpoint(body){
    if (res.api_url){
      this.endPoint = `https://${res.api_url}/rpc`
      console.log('[i] Received API Endpoint: ' + this.endPoint)
      resolve(this.endPoint)
    }
  }

  _parseResponse(response){

  }

}

export default Connection