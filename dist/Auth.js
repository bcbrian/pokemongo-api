'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gpsoauthnode = require('gpsoauthnode');

var _gpsoauthnode2 = _interopRequireDefault(_gpsoauthnode);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _env = require('../env');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Auth = function () {
  function Auth(props) {
    _classCallCheck(this, Auth);

    this.google = new _gpsoauthnode2.default();
    this.options = {
      url: _env.LOGIN_URL,
      headers: {
        'User-Agent': 'niantic'
      }
    };
    this.cookieJar = _request2.default.jar();
    this.request = _request2.default.defaults({ jar: this.cookieJar });
    this.accessToken = '';
  }

  _createClass(Auth, [{
    key: 'login',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user, pass, provider) {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                res = void 0;


                console.log('[i] Logging with user: ' + user);

                if (!(provider === 'ptc')) {
                  _context.next = 9;
                  break;
                }

                _context.next = 5;
                return this.PokemonAccount(user, pass);

              case 5:
                res = _context.sent;

                console.log('[i] Received PTC access token!');
                _context.next = 13;
                break;

              case 9:
                _context.next = 11;
                return this.GoogleAccount(user, pass);

              case 11:
                res = _context.sent;

                console.log('[i] Received Google access token!');

              case 13:
                return _context.abrupt('return', res);

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: 'GoogleAccount',
    value: function GoogleAccount(user, pass) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.google.login(user, pass, _env.ANDROID_ID, function (err, data) {
          if (data) {
            _this.google.oauth(user, data.masterToken, data.androidId, _env.OAUTH_SERVICE, _env.APP_NAME, _env.CLIENT_SIG, function (err, data) {
              if (err) reject(err);
              resolve(data.Auth);
            });
          } else reject(err);
        });
      });
    }
  }, {
    key: 'PokemonAccount',
    value: function PokemonAccount(user, pass) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var loginOptions = {
          url: _env.LOGIN_URL,
          headers: {
            'User-Agent': 'niantic'
          }
        };
        _this2.request.get(loginOptions, function (err, res, body) {
          if (err) return reject(err);

          var data = JSON.parse(body);

          var options = {
            url: _env.LOGIN_URL,
            form: {
              lt: data.lt,
              execution: data.execution,
              _eventId: 'submit',
              username: user,
              password: pass
            },
            headers: loginOptions.headers
          };

          _this2.request.post(options, function (err, response, body) {
            if (err) return reject(err);

            if (body) {
              var loginData = JSON.parse(body);
              if (loginData.errors && loginData.errors.length !== 0) {
                return reject(new Error('Error logging in: ' + loginData.errors[0]), null);
              }
            }

            var ticket = response.headers.location.split('ticket=')[1];
            options = {
              url: _env.LOGIN_OAUTH,
              form: {
                client_id: _env.LOGIN_OAUTH_CLIENT_ID,
                redirect_uri: _env.LOGIN_OAUTH_REDIRECT_URI,
                client_secret: _env.LOGIN_OAUTH_CLIENT_SECRET,
                grant_type: 'refresh_token',
                code: ticket
              },
              headers: loginOptions.headers
            };

            _this2.request.post(options, function (err, response, body) {
              if (err) return reject(err);

              var token = body.split('token=')[1];
              token = token.split('&')[0];

              if (!token) return reject(new Error('Login failed'));

              console.log('[i] Login ok');
              console.log('[i] Session token: ' + token);
              resolve(token);
            });
          });
        });
      });
    }
  }]);

  return Auth;
}();

exports.default = Auth;