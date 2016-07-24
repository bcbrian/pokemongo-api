"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("babel-polyfill");

var _s = require("s2");

var _s2 = _interopRequireDefault(_s);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayerMap = function () {
  function PlayerMap(props) {
    _classCallCheck(this, PlayerMap);
  }

  _createClass(PlayerMap, [{
    key: "getNeighbors",
    value: function getNeighbors(player) {
      var latitude = player.latitude;

      var longitude = player.longitude;
      var origin = new _s2.default.S2CellId(new _s2.default.S2LatLng(latitude, longitude)).parent(15);
      var walk = [origin.id()];
      var next = origin.next();
      var prev = origin.prev();
      var i = 10;

      while (i--) {
        walk.push(prev.id());
        walk.push(next.id());
        next = next.next();
        prev = prev.prev();
      }

      return walk;
    }
  }]);

  return PlayerMap;
}();

exports.default = PlayerMap;