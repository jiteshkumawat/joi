"use strict";
exports.__esModule = true;
var EventBus = (function () {
    function EventBus() {
        this.isBrowser = typeof window !== "undefined";
        if (!this.isBrowser) {
            var events = require("events");
            this.eventEmitter = new events.EventEmitter();
        }
        else {
            this.eventEmitter = document.createElement("joi_event_emitter");
        }
    }
    EventBus.prototype.startListening = function (eventName, callback) {
        if (!this.isBrowser) {
            this.eventEmitter.on(eventName, callback);
        }
        else {
            this.eventEmitter.addEventListener(eventName, function (eventDetails) {
                callback.apply(void 0, eventDetails.detail);
            });
        }
    };
    EventBus.prototype.stopListening = function (eventName) {
        if (!this.isBrowser) {
            this.eventEmitter.off(eventName);
        }
        else {
            this.eventEmitter.removeEventListener(event);
        }
    };
    EventBus.prototype.trigger = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a;
        var detail = args;
        if (!this.isBrowser) {
            (_a = this.eventEmitter).emit.apply(_a, [eventName].concat(args));
        }
        else {
            var event_1 = new CustomEvent(eventName, { detail: detail });
            this.eventEmitter.dispatchEvent(event_1);
        }
    };
    EventBus.prototype.destroy = function () {
        if (!this.isBrowser) {
            this.eventEmitter.removeAllListeners();
        }
        else {
            this.eventEmitter.remove();
            this.eventEmitter = null;
        }
        this.eventEmitter = null;
    };
    return EventBus;
}());
exports.EventBus = EventBus;
//# sourceMappingURL=eventBus.js.map