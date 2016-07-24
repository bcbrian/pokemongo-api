'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pokedex = require('../pokedex.json');

var _pokedex2 = _interopRequireDefault(_pokedex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pokedexMap = new Map();

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = _pokedex2.default.pokemon[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var p = _step.value;

    pokedexMap.set(p.id, p);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

var Pokemon = function () {
  function Pokemon(props) {
    _classCallCheck(this, Pokemon);

    Object.assign(this, props, pokedexMap.get(props.pokemon_id));
    delete this.id;
    console.log('[i] found ' + this.name + '. Direction: ' + this.direction);
  }

  _createClass(Pokemon, [{
    key: 'Catch',
    value: function Catch() {}
  }, {
    key: 'direction',
    get: function get() {
      var google = 'https://www.google.com/maps/dir/Current+Location/';
      return google + (this.latitude + ',' + this.longitude);
    }
  }]);

  return Pokemon;
}();

exports.default = Pokemon;