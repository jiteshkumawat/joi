/**
 * Defines Event Bus implementation
 */
export class EventBus {
  /**
   * Initialize new Event Bus
   */
  constructor() {
    this.isBrowser = typeof window !== "undefined";
    if (!this.isBrowser) {
      let events = require("events");
      this.eventEmitter = new events.EventEmitter();
    } else {
      this.eventEmitter = document.createElement("joi_event_emitter");
      this.listeners = {};
    }
  }

  /**
   * Determines if enviornment is browser
   */
  private isBrowser: boolean;

  /**
   * The Event Emitter instance
   */
  private eventEmitter: any;

  /**
   * The event listeners
   */
  private listeners: any;

  /**
   * Start listening on an event
   * @param eventName - The Event Name
   * @param callback - The callback
   */
  public startListening(eventName: string, callback: Function) {
    if (!this.isBrowser) {
      this.eventEmitter.on(eventName, callback);
    } else {
      let eventCallback = (eventDetails: any) => {
        callback(...eventDetails.detail);
      };
      this.eventEmitter.addEventListener(eventName, eventCallback);
      this.listeners[eventName] = eventCallback;
    }
  }

  /**
   * Stop listeing on an event
   * @param eventName - The Event Name
   */
  public stopListening(eventName: string) {
    if (!this.isBrowser) {
      this.eventEmitter.removeAllListeners([eventName]);
    } else {
      this.eventEmitter.removeEventListener(
        eventName,
        this.listeners[eventName]
      );
      delete this.listeners[eventName];
    }
  }

  /**
   * Triggers a event on bus
   * @param eventName - The Event Name
   * @param args - The Event Arguments
   */
  public trigger(eventName: string, ...args: any) {
    const detail = args;
    if (!this.isBrowser) {
      this.eventEmitter.emit(eventName, ...args);
    } else {
      const event = new CustomEvent(eventName, { detail: detail });
      this.eventEmitter.dispatchEvent(event);
    }
  }

  /**
   * Destroy all the listeners
   */
  public destroy() {
    if (!this.isBrowser) {
      this.eventEmitter.removeAllListeners();
    } else {
      this.eventEmitter.remove();
      this.eventEmitter = null;
      this.listeners = {};
    }
    this.eventEmitter = null;
  }
}
