'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _env = require('../env');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _protobufjs = require('protobufjs');

var _protobufjs2 = _interopRequireDefault(_protobufjs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var builder = _protobufjs2.default.newBuilder();

var rootPath = _path2.default.join(__dirname, '../');
var bufferFile = _protobufjs2.default.loadProtoFile({ root: rootPath, file: "POGOProtos/POGOProtos.proto" });
var POGOProtos = bufferFile.build("POGOProtos");

var Connection = function () {
  function Connection(props) {
    _classCallCheck(this, Connection);

    this.endPoint = _env.API_URL;
    this.auth_ticket = null;
  }

  _createClass(Connection, [{
    key: 'Request',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(requests, userObj) {
        var _this = this;

        var res, respt;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._request(requests, userObj);

              case 2:
                res = _context.sent;

                //we have response (returns = response we want.. now lets parse it)
                respt = {};

                requests.map(function (req, key) {
                  //setFileName
                  var ResponseType = _this._resolveProtoFilename(req.request);
                  ResponseType = ResponseType + 'Response';
                  var Responses = POGOProtos.Networking.Responses;
                  try {
                    respt[ResponseType] = Responses[ResponseType].decode(res.returns[key]);
                    console.log('[i] Received OK: ' + ResponseType);
                  } catch (error) {
                    console.log('[!] Response error!');
                    throw new Error('Response error!');
                  }
                });

                return _context.abrupt('return', respt);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function Request(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return Request;
    }()
  }, {
    key: '_request',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(reqs, userObj) {
        var req, request, protobuf, options, stream, bufferStream, res, body;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.endPoint.length < 5 || !this.endPoint)) {
                  _context2.next = 2;
                  break;
                }

                throw new Error('[!] No endPoint set!');

              case 2:
                if (!(userObj.latitude == 0 || userObj.longitude == 0)) {
                  _context2.next = 4;
                  break;
                }

                throw new Error('[!] position missing');

              case 4:
                req = this._serializeRequest(reqs);
                request = this._serializeHeader(req, userObj);

                // //create buffer

                protobuf = request.encode().toBuffer();
                options = {
                  url: this.endPoint,
                  body: protobuf,
                  encoding: null,
                  headers: {
                    'User-Agent': 'Niantic App'
                  }
                };

                // Temp https://github.com/bitinn/node-fetch/issues/136

                stream = require('stream');
                bufferStream = new stream.PassThrough();

                bufferStream.end(protobuf);

                _context2.next = 13;
                return (0, _nodeFetch2.default)(this.endPoint, {
                  body: bufferStream,
                  method: 'POST',
                  headers: {
                    'User-Agent': 'Niantic App'
                  }
                });

              case 13:
                res = _context2.sent;
                _context2.next = 16;
                return new Promise(function (resolve) {
                  var chunks = [];
                  res.body.on('data', function (chunk) {
                    return chunks.push(chunk);
                  }).on('end', function () {
                    return resolve(Buffer.concat(chunks));
                  });
                });

              case 16:
                body = _context2.sent;


                try {
                  res = POGOProtos.Networking.Envelopes.ResponseEnvelope.decode(body);
                } catch (e) {
                  if (e.decoded) {
                    // Truncated
                    console.warn(e);
                    res = e.decoded; // Decoded message with missing required fields
                  }
                }

                if (res.auth_ticket) this.auth_ticket = res.auth_ticket;

                if (!res.returns) {
                  _context2.next = 23;
                  break;
                }

                return _context2.abrupt('return', res);

              case 23:
                throw new Error("Nothing in reponse..");

              case 24:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _request(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return _request;
    }()
  }, {
    key: 'setEndpoint',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(user) {
        var _this2 = this;

        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._request([{ request: 'GET_PLAYER' }, { request: 'GET_HATCHED_EGGS' }, { request: 'GET_INVENTORY' }, { request: 'CHECK_AWARDED_BADGES' }, { request: 'DOWNLOAD_SETTINGS' }], user);

              case 2:
                res = _context3.sent;

                if (!res.api_url) {
                  _context3.next = 9;
                  break;
                }

                this.endPoint = 'https://' + res.api_url + '/rpc';
                console.error('[!] Endpoint set: ' + this.endPoint);
                return _context3.abrupt('return', this.endPoint);

              case 9:
                console.error('[!] Endpoint missing in request, lets try again.. in 5 seconds');
                return _context3.abrupt('return', new Promise(function (resolve) {
                  return setTimeout(function () {
                    return resolve(_this2.setEndpoint(user));
                  }, 5000);
                }));

              case 11:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function setEndpoint(_x5) {
        return _ref3.apply(this, arguments);
      }

      return setEndpoint;
    }()
  }, {
    key: '_resolveProtoFilename',
    value: function _resolveProtoFilename(call) {
      return call.split('_').reduce(function (prev, word) {
        return prev + _lodash2.default.upperFirst(_lodash2.default.toLower(word));
      }, '');
    }
  }, {
    key: '_setEndpoint',
    value: function _setEndpoint(body) {
      if (res.api_url) {
        console.log('[i] Received API Endpoint: ' + this.endPoint);
        resolve(this.endPoint);
      }
    }
  }, {
    key: '_serializeRequest',
    value: function _serializeRequest(reqs) {
      var _this3 = this;

      return reqs.map(function (req) {
        var Requests = POGOProtos.Networking.Requests;

        var reqId = Requests.RequestType[req.request];
        var request = new Requests.Request({ 'request_type': reqId });

        //set message?
        if (req.message != undefined) {
          var MessageType = _this3._resolveProtoFilename(req.request);
          MessageType += 'Message';
          request.request_message = new Requests.Messages[MessageType](req.message).encode();
        }
        return request;
      });
    }
  }, {
    key: '_serializeHeader',
    value: function _serializeHeader(req, userObj) {
      var data = {
        status_code: 2,
        request_id: 1469378659230941192,
        latitude: userObj.latitude,
        longitude: userObj.longitude,
        altitude: userObj.altitude,
        unknown12: 989,
        requests: req
      };

      if (this.auth_ticket != null) {
        data.auth_ticket = this.auth_ticket;
      } else {
        data.auth_info = new POGOProtos.Networking.Envelopes.RequestEnvelope.AuthInfo({
          provider: userObj.provider,
          token: new POGOProtos.Networking.Envelopes.RequestEnvelope.AuthInfo.JWT({
            contents: userObj.accessToken,
            unknown2: 59
          })
        });
      }

      if (this.auth_ticket != null) data.auth_ticket = this.auth_ticket;

      return new POGOProtos.Networking.Envelopes.RequestEnvelope(data);
    }
  }, {
    key: 'authTicket',
    set: function set(body) {
      if (res.auth_ticket) this.auth_ticket = res.auth_ticket;
    }
  }]);

  return Connection;
}();

exports.default = Connection;