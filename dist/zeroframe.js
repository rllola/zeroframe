'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CMD_INNER_READY = 'innerReady';
var CMD_RESPONSE = 'response';
var CMD_WRAPPER_READY = 'wrapperReady';
var CMD_PING = 'ping';
var CMD_PONG = 'pong';
var CMD_WRAPPER_OPENED_WEBSOCKET = 'wrapperOpenedWebsocket';
var CMD_WRAPPER_CLOSE_WEBSOCKET = 'wrapperClosedWebsocket';

var ZeroFrame = function () {
    function ZeroFrame(url) {
        _classCallCheck(this, ZeroFrame);

        this.url = url;
        this.waiting_cb = {};
        this.wrapper_nonce = document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1");
        this.connect();
        this.next_message_id = 1;
        this.init();
    }

    _createClass(ZeroFrame, [{
        key: 'init',
        value: function init() {
            return this;
        }
    }, {
        key: 'connect',
        value: function connect() {
            var _this = this;

            this.target = window.parent;
            window.addEventListener('message', function (e) {
                return _this.onMessage(e);
            }, false);
            this.cmd(CMD_INNER_READY);
        }
    }, {
        key: 'onMessage',
        value: function onMessage(e) {
            var message = e.data;
            var cmd = message.cmd;
            if (cmd === CMD_RESPONSE) {
                if (this.waiting_cb[message.to] !== undefined) {
                    this.waiting_cb[message.to](message.result);
                } else {
                    this.log("Websocket callback not found:", message);
                }
            } else if (cmd === CMD_WRAPPER_READY) {
                this.cmd(CMD_INNER_READY);
            } else if (cmd === CMD_PING) {
                this.response(message.id, CMD_PONG);
            } else if (cmd === CMD_WRAPPER_OPENED_WEBSOCKET) {
                this.onOpenWebsocket();
            } else if (cmd === CMD_WRAPPER_CLOSE_WEBSOCKET) {
                this.onCloseWebsocket();
            } else {
                this.route(cmd, message);
            }
        }
    }, {
        key: 'route',
        value: function route(cmd, message) {
            this.log("Unknown command", message);
        }
    }, {
        key: 'response',
        value: function response(to, result) {
            this.send({
                cmd: CMD_RESPONSE,
                to: to,
                result: result
            });
        }
    }, {
        key: 'cmd',
        value: function cmd(_cmd) {
            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            var cb = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

            this.send({
                cmd: _cmd,
                params: params
            }, cb);
        }
    }, {
        key: 'send',
        value: function send(message) {
            var cb = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            message.wrapper_nonce = this.wrapper_nonce;
            message.id = this.next_message_id;
            this.next_message_id++;
            this.target.postMessage(message, '*');
            if (cb) {
                this.waiting_cb[message.id] = cb;
            }
        }
    }, {
        key: 'log',
        value: function log() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            console.log.apply(console, ['[ZeroFrame]'].concat(args));
        }
    }, {
        key: 'onOpenWebsocket',
        value: function onOpenWebsocket() {
            this.log('Websocket open');
        }
    }, {
        key: 'onCloseWebsocket',
        value: function onCloseWebsocket() {
            this.log('Websocket close');
        }
    }]);

    return ZeroFrame;
}();

exports.default = ZeroFrame;