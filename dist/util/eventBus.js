"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines Event Bus implementation
 */
var EventBus = /** @class */ (function () {
    /**
     * Initialize new Event Bus
     */
    function EventBus() {
        this.isBrowser = typeof window !== "undefined";
        if (!this.isBrowser) {
            var events = require("events");
            this.eventEmitter = new events.EventEmitter();
        }
        else {
            this.eventEmitter = document.createElement("joi_event_emitter");
            this.listeners = {};
        }
    }
    /**
     * Start listening on an event
     * @param eventName - The Event Name
     * @param callback - The callback
     */
    EventBus.prototype.startListening = function (eventName, callback) {
        if (!this.isBrowser) {
            this.eventEmitter.on(eventName, callback);
        }
        else {
            var eventCallback = function (eventDetails) {
                callback.apply(void 0, eventDetails.detail);
            };
            this.eventEmitter.addEventListener(eventName, eventCallback);
            this.listeners[eventName] = eventCallback;
        }
    };
    /**
     * Stop listeing on an event
     * @param eventName - The Event Name
     */
    EventBus.prototype.stopListening = function (eventName) {
        if (!this.isBrowser) {
            this.eventEmitter.removeAllListeners([eventName]);
        }
        else {
            this.eventEmitter.removeEventListener(eventName, this.listeners[eventName]);
            delete this.listeners[eventName];
        }
    };
    /**
     * Triggers a event on bus
     * @param eventName - The Event Name
     * @param args - The Event Arguments
     */
    EventBus.prototype.trigger = function (eventName) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var detail = args;
        if (!this.isBrowser) {
            (_a = this.eventEmitter).emit.apply(_a, __spreadArrays([eventName], args));
        }
        else {
            var event_1 = new CustomEvent(eventName, { detail: detail });
            this.eventEmitter.dispatchEvent(event_1);
        }
    };
    /**
     * Destroy all the listeners
     */
    EventBus.prototype.destroy = function () {
        if (!this.isBrowser) {
            this.eventEmitter.removeAllListeners();
        }
        else {
            this.eventEmitter.remove();
            this.eventEmitter = null;
            this.listeners = {};
        }
        this.eventEmitter = null;
    };
    return EventBus;
}());
exports.EventBus = EventBus;
//# sourceMappingURL=eventBus.js.map