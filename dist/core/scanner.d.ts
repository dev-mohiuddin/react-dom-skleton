/**
 * DOM Scanner - Recursive utility to extract dimensions, colors, and typography
 * from the DOM tree to generate skeleton overlays.
 */
export interface DOMElementInfo {
    tagName: string;
    text: string;
    isTextNode: boolean;
    isDynamic: boolean;
    hasElementChildren: boolean;
    hasVisibleBackground: boolean;
    hasVisibleBorder: boolean;
    isReplacedElement: boolean;
    elementType: 'text' | 'input' | 'button' | 'avatar' | 'block' | 'container';
    isMultiLine: boolean;
    lineCount: number;
    isCircular: boolean;
    parentBackgroundColor: string;
    bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    style: {
        fontSize: string;
        lineHeight: string;
        fontWeight: string;
        color: string;
        backgroundColor: string;
        borderRadius: string;
    };
    children: DOMElementInfo[];
    skipSkeleton: boolean;
}
export interface ScannerOptions {
    parentElement: Element;
    preserveStaticText?: boolean;
    staticTextThreshold?: number;
}
/**
 * Recursively scan DOM tree to extract skeleton information
 */
export declare function scanDOMElement(element: Element | Node, parentElement: Element, options?: Omit<ScannerOptions, 'parentElement'>): DOMElementInfo | null;
/**
 * Scan entire component tree and return flattened list of skeleton blocks
 */
export declare function scanComponentTree(parentElement: Element, options?: Omit<ScannerOptions, 'parentElement'>): DOMElementInfo[];
//# sourceMappingURL=scanner.d.ts.map