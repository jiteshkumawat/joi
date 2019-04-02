"use strict";
exports.__esModule = true;
var EventBus = (function () {
    function EventBus() {
        this.isBrowser = typeof window !== "undefined";
        if (!this.isBrowser) {
            var events = require("events");
            this.eventEmitter = new events.EventEmitter();
        }
    }
    EventBus.prototype.startListening = function (eventName, callback) {
        this.eventEmitter.on(eventName, callback);
    };
    EventBus.prototype.stopListening = function (eventName) {
        this.eventEmitter.off(eventName);
    };
    EventBus.prototype.trigger = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a;
        (_a = this.eventEmitter).emit.apply(_a, [eventName].concat(args));
    };
    EventBus.prototype.destroy = function () {
        this.eventEmitter.removeAllListeners();
        this.eventEmitter = null;
    };
    return EventBus;
}());
exports.EventBus = EventBus;
//# sourceMappingURL=eventBus.js.map