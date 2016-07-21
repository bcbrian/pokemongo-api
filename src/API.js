import {
  API_URL
} from '../env'

import _ from 'lodash'
import Request from 'request'
import ProtoBuf from 'protobufjs'

const POGORequestEnvelope = ProtoBuf.loadProtoFile({ root: "./src/", file: "POGOProtos/Networking/Envelopes/RequestEnvelope.proto" }).build("POGOProtos")
const POGOResponseEnvelope = ProtoBuf.loadProtoFile({ root: "./src/", file: "POGOProtos/Networking/Envelopes/ResponseEnvelope.proto" }).build("POGOProtos")
const POGORequest = ProtoBuf.loadProtoFile({ root: "./src/", file: "POGOProtos/Networking/Requests/Request.proto" }).build("POGOProtos")
const POGORequestType = ProtoBuf.loadProtoFile({ root: "./src/", file: "POGOProtos/Networking/Requests/RequestType.proto" }).build("POGOProtos")

const {RequestEnvelop, ResponseEnvelop} = ProtoBuf.loadProtoFile("src/protos/pokemon.proto").build()

class Connection {
  constructor(props) {
    this.endPoint = API_URL
    this.auth_ticket ={}
    this.cookieJar = Request.jar()
    this.request = Request.defaults({jar: this.cookieJar})
  }

  Request(reqs,userObj){
    return new Promise( (resolve, reject) => {
      if (this.endPoint.length < 5 || !this.endPoint) reject('Error: No endPoint set!')
      if (userObj.latitude == 0 || userObj.longitude == 0) reject ('Error: position missing')

      // set requests
      var req =[]
      var req = [
        new POGORequest.Networking.Requests.Request(2),
      ];

      // set header
      console.log(req)
      var request = this._serializeHeader(req, userObj)
      console.log(request)

      //create buffer
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

          //we have response (returns = response we want.. now lets parse it)
          if (res.returns){
            response ={}
            reqs.map( (req,key) => {
              //setFileName 
              var ResponseType = ''
              req = req.split("_")
              req.map( word => {
                ResponseType += _.upperFirst(_.toLower(word))
              })
              ResponseType += 'Response'

              var proto = ProtoBuf.loadProtoFile({ root: "./src/", file: "POGOProtos/Networking/Responses/"+ResponseType+".proto" }).build("POGOProtos")
              response[req] = proto.Networking.Responses[ResponseType].decode(res.returns[key])
            })
          }

          if(res) 
            resolve(res);
          else 
            resolve(this._request(userObj.endpoint, userObj.accessToken, req))

      });

    })
  }
  _serializeRequest(reqs){
    var res = []
    reqs.map( req => {
      var reqId = POGORequestType.Networking.Requests.RequestType[req]
      res.push(new POGORequest.Networking.Requests.Request(2))
    })
    return res
  }

  _serializeHeader(req, userObj){
    return new POGORequestEnvelope.Networking.Envelopes.RequestEnvelope({
      status_code: 2,
      request_id: 8145806132888207460,
      latitude: userObj.latitude,
      longitude: userObj.longitude,
      altitude: userObj.altitude,
      unknown12: 989,
      requests: req,
      auth_ticket: this.auth_ticket,
      auth_info: new POGORequestEnvelope.Networking.Envelopes.RequestEnvelope.AuthInfo({
        provider: userObj.provider,
        token: new POGORequestEnvelope.Networking.Envelopes.RequestEnvelope.AuthInfo.JWT({
          contents: userObj.accessToken,
          unknown2: 59,
        })
      })
    })
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