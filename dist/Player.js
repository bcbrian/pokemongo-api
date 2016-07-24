'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _geocoder = require('geocoder');

var _geocoder2 = _interopRequireDefault(_geocoder);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Auth = require('./Auth');

var _Auth2 = _interopRequireDefault(_Auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(props) {
    _classCallCheck(this, Player);

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
      sessionData: {}
    };
    this.Auth = new _Auth2.default();
  }

  _createClass(Player, [{
    key: 'Login',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user, pass) {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.Auth.login(user, pass, this.playerInfo.provider);

              case 2:
                res = _context.sent;


                this.playerInfo.username = user;
                this.playerInfo.password = pass;
                this.playerInfo.accessToken = res;

                return _context.abrupt('return', this.playerInfo);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function Login(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return Login;
    }()
  }, {
    key: 'teleport',
    value: function teleport(lat, long, alt) {
      this.playerInfo.latitude = lat;
      this.playerInfo.longitude = long;
      this.playerInfo.altitude = alt;
    }
  }, {
    key: 'walkAround',
    value: function walkAround() {
      var latMorP = Math.random() < 0.5 ? -1 : 1;
      var latRand = Math.floor(Math.random() * 100 + 1) / 1000000 * latMorP;
      latMorP = Math.random() < 0.5 ? -1 : 1;
      var longRand = Math.floor(Math.random() * 100 + 1) / 1000000 * latMorP;

      this.playerInfo.latitude = this.playerInfo.latitude + latRand;
      this.playerInfo.longitude = this.playerInfo.longitude + longRand;
    }
  }, {
    key: 'setLocation',
    value: function setLocation(location) {
      var _this = this;

      return new Promise(function (resolve) {
        if (location.type !== 'name' && location.type !== 'coords') throw new Error('Invalid location type');

        // use google map search by name
        if (location.type === 'name') {
          var _ret = function () {
            if (!location.name) throw new Error('You should add a location name');

            var locationName = location.name;
            _geocoder2.default.geocode(locationName, function (err, data) {
              if (err || data.status === 'ZERO_RESULTS') throw new Error('location not found');

              var _data$results$0$geome = data.results[0].geometry.location;
              var lat = _data$results$0$geome.lat;
              var lng = _data$results$0$geome.lng;


              _this.playerInfo.latitude = lat;
              _this.playerInfo.longitude = lng;
              _this.playerInfo.locationName = locationName;

              //return
              resolve(_this.locationCoords);
            });
            return {
              v: void 0
            };
          }();

          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }

        // use latitude longitude
        if (!location.coords) throw new Error('Coords object missing');

        _this.playerInfo.latitude = location.coords.latitude || _this.playerInfo.latitude;
        _this.playerInfo.longitude = location.coords.longitude || _this.playerInfo.longitude;
        _this.playerInfo.altitude = location.coords.altitude || _this.playerInfo.altitude;

        _geocoder2.default.reverseGeocode.apply(_geocoder2.default, _toConsumableArray(_this.coords).concat([function (err, data) {
          if (data.status !== 'ZERO_RESULTS') _this.playerInfo.locationName = data.results[0].formatted_address;

          //return
          resolve(_this.locationCoords);
        }]));
      });
    }
  }, {
    key: 'provider',
    set: function set(provider) {
      this.playerInfo.provider = provider;
    }
  }, {
    key: 'profileDetails',
    set: function set(data) {
      this.playerInfo.sessionData = data;
    }
  }, {
    key: 'locationCoords',
    get: function get() {
      var _playerInfo = this.playerInfo;
      var latitude = _playerInfo.latitude;
      var longitude = _playerInfo.longitude;
      var altitude = _playerInfo.altitude;

      return {
        latitude: latitude,
        longitude: longitude,
        altitude: altitude
      };
    }
  }, {
    key: 'coords',
    get: function get() {
      var _playerInfo2 = this.playerInfo;
      var latitude = _playerInfo2.latitude;
      var longitude = _playerInfo2.longitude;

      return [latitude, longitude];
    }
  }, {
    key: 'profile',
    get: function get() {
      return this.playerInfo;
    }

    // TODO return Date obj

  }, {
    key: 'createdDate',
    get: function get() {
      var date = new _moment2.default(this.playerInfo.sessionData.creation_time.toString() / 100).format("dddd, MMMM Do YYYY, h:mm:ss a");
      console.log('[+] You are playing Pokemon Go since: {' + date + '}');
      return date;
    }
  }, {
    key: 'pokeStorage',
    get: function get() {
      var storage = this.playerInfo.sessionData.poke_storage;
      console.log('[+] Poke Storage: {' + storage + '}');
      return storage;
    }
  }, {
    key: 'itemsStorage',
    get: function get() {
      var storage = this.playerInfo.sessionData.item_storage;
      console.log('[+] Item Storage: {' + storage + '}');
      return storage;
    }

    // TODO use getter

  }, {
    key: 'currency',
    get: function get() {
      var curr = this.playerInfo.sessionData.currency;
      curr.map(function (obj) {
        console.log('[+] Currency (' + obj.type + '): {' + storage + '}');
      });
      return curr;
    }
  }]);

  return Player;
}();

exports.default = Player;