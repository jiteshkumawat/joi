/**
 * Defines Event Bus implementation
 */
export declare class EventBus {
    /**
     * Initialize new Event Bus
     */
    constructor();
    /**
     * Determines if enviornment is browser
     */
    private isBrowser;
    /**
     * The Event Emitter instance
     */
    private eventEmitter;
    /**
     * The event listeners
     */
    private listeners;
    /**
     * Start listening on an event
     * @param eventName - The Event Name
     * @param callback - The callback
     */
    startListening(eventName: string, callback: Function): void;
    /**
     * Stop listeing on an event
     * @param eventName - The Event Name
     */
    stopListening(eventName: string): void;
    /**
     * Triggers a event on bus
     * @param eventName - The Event Name
     * @param args - The Event Arguments
     */
    trigger(eventName: string, ...args: any): void;
    /**
     * Destroy all the listeners
     */
    destroy(): void;
}
