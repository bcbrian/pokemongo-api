'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

var _API = require('./API');

var _API2 = _interopRequireDefault(_API);

var _Pokemon = require('./Pokemon');

var _Pokemon2 = _interopRequireDefault(_Pokemon);

var _PlayerMap = require('./PlayerMap');

var _PlayerMap2 = _interopRequireDefault(_PlayerMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Called if a parameter is missing and
 * the default value is evaluated.
 */
function mandatory() {
  throw new Error('Missing parameter');
}

var PokemonGOAPI = function () {
  function PokemonGOAPI(props) {
    _classCallCheck(this, PokemonGOAPI);

    this.player = new _Player2.default();
    this.api = new _API2.default();
    this.map = new _PlayerMap2.default();
    this.logged = false;
    this.debug = true;
    this.useHartBeat = false;
  }

  _createClass(PokemonGOAPI, [{
    key: 'login',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(username, password, location, provider) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(provider !== 'ptc' && provider !== 'google')) {
                  _context.next = 2;
                  break;
                }

                throw new Error('Invalid provider');

              case 2:

                this.player.provider = provider;

                _context.next = 5;
                return this.player.setLocation(location);

              case 5:
                _context.next = 7;
                return this.player.Login(username, password);

              case 7:
                _context.next = 9;
                return this.api.setEndpoint(this.player.playerInfo);

              case 9:
                return _context.abrupt('return', this);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login(_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      }

      return login;
    }()

    //
    //This calls the API direct
    //

  }, {
    key: 'Call',
    value: function Call(req) {
      return this.api.Request(req, this.player.playerInfo);
    }
  }, {
    key: 'GetInventory',
    value: function GetInventory() {
      return this.Call([{ request: 'GET_INVENTORY' }]);
    }
  }, {
    key: 'GetPlayer',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.Call([{ request: 'GET_PLAYER' }]);

              case 2:
                res = _context2.sent;
                return _context2.abrupt('return', res.GetPlayerResponse.player_data);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function GetPlayer() {
        return _ref2.apply(this, arguments);
      }

      return GetPlayer;
    }()

    //
    // HeartBeat
    //

  }, {
    key: 'ToggleHartBeat',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.useHartBeat = !this.useHartBeat;
                this._loopHartBeat();
                return _context3.abrupt('return', this.useHartBeat);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function ToggleHartBeat() {
        return _ref3.apply(this, arguments);
      }

      return ToggleHartBeat;
    }()
  }, {
    key: '_loopHartBeat',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                while (this.useHartBeat) {
                  setInterval(function () {
                    var area = _this.GetMapObjects();
                  }, 2000);
                }

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _loopHartBeat() {
        return _ref4.apply(this, arguments);
      }

      return _loopHartBeat;
    }()
  }, {
    key: 'GetMapObjects',
    value: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
        var finalWalk, nullarray, res, cells, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, cell;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                finalWalk = this.map.getNeighbors(this.player.playerInfo).sort();
                nullarray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                _context5.next = 4;
                return this.Call([{
                  request: 'GET_MAP_OBJECTS',
                  message: {
                    cell_id: finalWalk,
                    since_timestamp_ms: nullarray,
                    latitude: this.player.playerInfo.latitude,
                    longitude: this.player.playerInfo.longitude
                  }
                }]);

              case 4:
                res = _context5.sent;
                cells = res.GetMapObjectsResponse.map_cells;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context5.prev = 9;


                for (_iterator = cells[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  cell = _step.value;

                  cell.catchable_pokemons = cell.catchable_pokemons.map(function (pokemon) {
                    return new _Pokemon2.default(pokemon);
                  });
                }

                _context5.next = 17;
                break;

              case 13:
                _context5.prev = 13;
                _context5.t0 = _context5['catch'](9);
                _didIteratorError = true;
                _iteratorError = _context5.t0;

              case 17:
                _context5.prev = 17;
                _context5.prev = 18;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 20:
                _context5.prev = 20;

                if (!_didIteratorError) {
                  _context5.next = 23;
                  break;
                }

                throw _iteratorError;

              case 23:
                return _context5.finish(20);

              case 24:
                return _context5.finish(17);

              case 25:
                return _context5.abrupt('return', cells);

              case 26:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[9, 13, 17, 25], [18,, 20, 24]]);
      }));

      function GetMapObjects() {
        return _ref5.apply(this, arguments);
      }

      return GetMapObjects;
    }()
  }, {
    key: 'FortRecallPokemon',
    value: function FortRecallPokemon(fort_id) {
      var pokemon_id = arguments.length <= 1 || arguments[1] === undefined ? mandatory() : arguments[1];

      return this.Call([{
        request: 'FORT_RECALL_POKEMON',
        message: {
          fort_id: fort_id,
          pokemon_id: pokemon_id,
          player_latitude: this.player.playerInfo.latitude,
          player_longitude: this.player.playerInfo.longitude
        }
      }]);
    }
  }, {
    key: 'FortDeployPokemon',
    value: function FortDeployPokemon(fort_id) {
      var pokemon_id = arguments.length <= 1 || arguments[1] === undefined ? mandatory() : arguments[1];

      return this.Call([{
        request: 'FORT_DEPLOY_POKEMON',
        message: {
          fort_id: fort_id,
          pokemon_id: pokemon_id,
          player_latitude: this.player.playerInfo.latitude,
          player_longitude: this.player.playerInfo.longitude
        }
      }]);
    }
  }, {
    key: 'FortDetails',
    value: function FortDetails() {
      var fort = arguments.length <= 0 || arguments[0] === undefined ? mandatory() : arguments[0];

      return this.Call([{
        request: 'FORT_DETAILS',
        message: {
          fort_id: fort.fort_id,
          latitude: fort.latitude,
          longitude: fort.longitude
        }
      }]);
    }
  }, {
    key: 'FortSearch',
    value: function FortSearch() {
      var fort = arguments.length <= 0 || arguments[0] === undefined ? mandatory() : arguments[0];


      return this.Call([{
        request: 'FORT_SEARCH',
        message: {
          fort_id: fort.fort_id,
          player_latitude: this.player.playerInfo.latitude,
          player_longitude: this.player.playerInfo.longitude,
          fort_latitude: fort.fort_latitude,
          fort_longitude: fort.fort_longitude
        }
      }]);
    }
  }, {
    key: 'CatchPokemon',
    value: function CatchPokemon() {
      var pokemon = arguments.length <= 0 || arguments[0] === undefined ? mandatory() : arguments[0];

      var spin_modifier = 0.85 + Math.random() * 0.15;

      return this.Call([{
        request: 'CATCH_POKEMON',
        message: {
          encounter_id: pokemon.encounter_id,
          pokeball: 1,
          normalized_reticle_size: 1.95,
          spawn_point_guid: pokemon.spawn_point_id,
          hit_pokemon: true,
          spin_modifier: spin_modifier,
          normalized_hit_position: 1.0
        }
      }]);
    }
  }, {
    key: 'EncounterPokemon',
    value: function EncounterPokemon() {
      var pokemon = arguments.length <= 0 || arguments[0] === undefined ? mandatory() : arguments[0];

      return this.Call([{
        request: 'ENCOUNTER',
        message: {
          encounter_id: pokemon.encounter_id,
          spawn_point_id: pokemon.spawn_point_id,
          player_latitude: this.player.playerInfo.latitude,
          player_longitude: this.player.playerInfo.longitude
        }
      }]);
    }
  }, {
    key: 'ReleasePokemon',
    value: function ReleasePokemon() {
      var pokemon_id = arguments.length <= 0 || arguments[0] === undefined ? mandatory() : arguments[0];

      return this.Call([{
        request: 'RELEASE_POKEMON',
        message: { pokemon_id: pokemon_id }
      }]);
    }
  }, {
    key: 'UseItemPotion',
    value: function UseItemPotion(item_id) {
      var pokemon_id = arguments.length <= 1 || arguments[1] === undefined ? mandatory() : arguments[1];

      return this.Call([{
        request: 'USE_ITEM_POTION',
        message: { item_id: item_id, pokemon_id: pokemon_id }
      }]);
    }
  }]);

  return PokemonGOAPI;
}();

exports.default = PokemonGOAPI;