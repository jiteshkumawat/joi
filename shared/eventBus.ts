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
   * Start listening on an event
   * @param eventName - The Event Name
   * @param callback - The callback
   */
  public startListening(eventName: string, callback: Function) {
    if (!this.isBrowser) {
      this.eventEmitter.on(eventName, callback);
    } else {
      this.eventEmitter.addEventListener(eventName, (eventDetails: any) => {
        callback(...eventDetails.detail);
      });
    }
  }

  /**
   * Stop listeing on an event
   * @param eventName - The Event Name
   */
  public stopListening(eventName: string) {
    if (!this.isBrowser) {
      this.eventEmitter.off(eventName);
    } else {
      this.eventEmitter.removeEventListener(event);
    }
  }

  /**
   * Triggers a event on bus
   * @param eventName - The Event Name
   * @param args - The Event Arguments
   */
  public trigger(eventName: string, ...args: any) {
    const detail = args ;
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
    }
    this.eventEmitter = null;
  }
}
