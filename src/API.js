import {
  API_URL
} from '../env'

import _ from 'lodash'
import Request from 'request'
import ProtoBuf from 'protobufjs'

const POGOProtos = ProtoBuf.loadProtoFile({ root: "./src/", file: "POGOProtos/POGOProtos.proto" }).build("POGOProtos")

class Connection {
  constructor(props) {
    this.endPoint = API_URL
    this.auth_ticket = null
    this.cookieJar = Request.jar()
    this.request = Request.defaults({jar: this.cookieJar})
  }

  Request(reqs, userObj){
    this._request(reqs,userObj)
    .then(res => {
      console.log('res')
      //we have response (returns = response we want.. now lets parse it)
      response ={}
      reqs.map( (req,key) => {
        console.log(req)
        //setFileName 
        var ResponseType = ''
        req = req.split("_")
        req.map( word => {
          ResponseType += _.upperFirst(_.toLower(word))
        })
        ResponseType += 'Response'

        console.log(ResponseType)
        var proto = ProtoBuf.loadProtoFile({ root: "./src/", file: "POGOProtos/Networking/Responses/"+ResponseType+".proto" }).build("POGOProtos")
        response[req] = proto.Networking.Responses[ResponseType].decode(res.returns[key])
        console.log(response[req])
      })

      var profile = POGOProtos.Networking.Responses.GetPlayerResponse.decode(res.returns[0])
    })
  }


  _request(reqs,userObj) {
    return new Promise( resolve => {
      if (this.endPoint.length < 5 || !this.endPoint) throw new Error('No endPoint set!')
      if (userObj.latitude == 0 || userObj.longitude == 0) throw new Error('position missing')

      var req = this._serializeRequest(reqs)
      var request = this._serializeHeader(req, userObj)

      // //create buffer
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
          throw new Error('RPC Server offline');
        }

        try {
          var res = POGOProtos.Networking.Envelopes.ResponseEnvelope.decode(body);
        } catch (e) {
          if (e.decoded) { // Truncated
            console.warn(e);
            res = e.decoded; // Decoded message with missing required fields
          }
        }

        if (res.auth_ticket) 
          this.auth_ticket = res.auth_ticket

        if (res.returns) resolve(res)
        else (reject) => reject("Nothing in reponse..")
      })
    })
  }

  setEndpoint(user){
    this._request([
      'GET_PLAYER',
      'GET_HATCHED_EGGS',
      'GET_INVENTORY',
      'CHECK_AWARDED_BADGES',
      'DOWNLOAD_SETTINGS',
    ],user)
    .then(res => {
      if (res.api_url){
        this.endPoint = `https://${res.api_url}/rpc`
        console.error('[!] Endpoint set: '+ this.endPoint);
      }else{
        console.error('[!] Endpoint missing in request');
        throw new Error('Endpoint missing in request');
      }
    })

  }
  
  _setEndpoint(body) {
    if (res.api_url) {
      console.log('[i] Received API Endpoint: ' + this.endPoint)
      resolve(this.endPoint)
    }
  }
  
  _serializeRequest(reqs) {
    return reqs.map( req => {
      var reqId = POGOProtos.Networking.Requests.RequestType[req]
      return new POGOProtos.Networking.Requests.Request({'request_type': reqId})
    })
  }

  _serializeHeader(req, userObj) {
    var env = {
      status_code: 2,
      request_id: 1469378659230941192,
      latitude: userObj.latitude,
      longitude: userObj.longitude,
      altitude: userObj.altitude,
      unknown12: 989,
      requests: req,
      auth_info: new POGOProtos.Networking.Envelopes.RequestEnvelope.AuthInfo({
        provider: userObj.provider,
        token: new POGOProtos.Networking.Envelopes.RequestEnvelope.AuthInfo.JWT({
          contents: userObj.accessToken,
          unknown2: 59,
        })
      })
    }

    if (this.auth_ticket !== null)
      env.auth_ticket = this.auth_ticket
    return new POGOProtos.Networking.Envelopes.RequestEnvelope(env);
  }

  set authTicket(body) {
    if (res.auth_ticket)
      this.auth_ticket = res.auth_ticket
  }

}

export default Connection
