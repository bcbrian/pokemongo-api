"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Location = function () {
  function Location(props) {
    _classCallCheck(this, Location);
  }

  _createClass(Location, [{
    key: "_getNear",
    value: function _getNear(prop) {
      var _this = this;

      ms = [];
      prop.map(function (cell) {
        cell.b.map(function (block) {
          block.c.map(function (obj) {
            obj.s.map(function (stop) {
              ms.push(stop.name, stop.lat, stop.lon, _this._getDistance(stop.lat, stop.lon, COORDS_LATITUDE, COORDS_LONGITUDE));
            });
          });
        });
      });
      return ms;
    }
  }, {
    key: "_getNearP",
    value: function _getNearP(prop) {
      var _this2 = this;

      ms = [];
      prop.map(function (cell) {
        cell.b.map(function (block) {
          block.c.map(function (obj) {
            obj.p.map(function (stop) {
              ms.push((stop.t.type, stop.lat, stop.lon, stop.name, stop.hash, _this2._getDistance(stop.lat, stop.lon, COORDS_LATITUDE, COORDS_LONGITUDE)));
            });
            obj.s.map(function (stop) {
              if (stop.p.type) ms.push((stop.p.type, stop.lat, stop.lon, stop.name, stop.p.u2, _this2._getDistance(stop.lat, stop.lon, COORDS_LATITUDE, COORDS_LONGITUDE)));
            });
          });
        });
      });
      return ms;
    }
  }, {
    key: "_getDistance",
    value: function _getDistance(lat1, lon1, lat2, lon2) {
      return GeoLib.getDistance({
        longitude: lon1,
        latitude: lat1
      }, {
        longitude: lon2,
        latitude: lat2
      });
    }
  }]);

  return Location;
}();

exports.default = Location;