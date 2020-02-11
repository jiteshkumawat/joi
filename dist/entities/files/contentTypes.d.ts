import { Xml } from "../base/xml";
import { Node } from "../base/node";
import { FileAdapter } from "../../util/fileHandler";
import { EventBus } from "../../util/eventBus";
/**
 * Content Types file
 */
export declare class ContentTypes extends Xml {
    /**
     * Creates new instance of content types
     */
    constructor(eventBus: EventBus, fileName?: string);
    /**
     * Add a new default node
     * @param {string} contentType - The content type string
     * @param {string} extension - The extension string
     * @returns {Node} - The default node
     */
    addDefault(contentType: string, extension: string): Node;
    /**
     * Add a new override node
     * @param {string} contentType - The content type string
     * @param {string} partName - The part name string
     * @returns {Node} - The override node
     */
    addOverride(contentType: string, partName: string): Node;
    defaults: any;
    overrides: any;
    /**
     * Load a file
     * @param file - File Adapter
     * @param eventBus = Event Bus
     * @returns {Promise<ContentTypes>}: - The Content Types object
     */
    static load(file: FileAdapter, eventBus: EventBus): Promise<ContentTypes>;
    /**
     * Bind Listeners
     * @param eventBus - Event Bus
     */
    private bindListeners;
}
