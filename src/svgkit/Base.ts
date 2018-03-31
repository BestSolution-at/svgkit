import { coordinate, length, bounds, IShape, paint, INode, stringifiable, transformList } from "./Types";

export var SVG_NAMESPACE = "http://www.w3.org/2000/svg"

export function createSvgNode( name : string) : Element {
    return document.createElementNS(SVG_NAMESPACE, name);
}

export function stringify( v : coordinate) : string;
export function stringify( v : length) : string;

export function stringify( v : any ) : string {
    return String(v);
}

export function attr( name : "fill", element : IShape, value? : paint ) : paint;
export function attr( name : "stroke", element : IShape, value? : paint ) : paint;
export function attr( name : "stroke-width", element : IShape, value? : length ) : length;

export function attr( name : string, element : INode, value? : any ) : any {
    element.prop(name, String(value));
}

export abstract class SkNode implements INode {
    readonly domNode : Element

    constructor(domNode : Element) {
        this.domNode = domNode;
        this.domNode["sk"] = this
    }
    
    prop( name : string, value? : string | stringifiable) : string {
        if( value ) {
            if( typeof(value) == "string" ) {
                this.domNode.setAttribute(name, value);
            } else {
                this.domNode.setAttribute(name, value.asString());
            }
        }
        return this.domNode.getAttribute(name);
    }
}

export class SkSvg extends SkNode {
    private constructor(domNode : Element) {
        super(domNode)
    }

    static create(parent? : Element) : SkSvg {
        var s = new SkSvg( document.createElementNS(SVG_NAMESPACE,"svg") )
        if( parent ) {
            parent.appendChild( s.domNode );
        }
        return s;
    }

    static adapt(domNode : Element) : SkSvg {
        return new SkSvg( domNode );
    }

    get x() : coordinate { return this.prop("x") }
    set x( x : coordinate) { this.prop("x", stringify(x) ) }

    get y() : coordinate { return this.prop("y") }
    set y( y : coordinate) { this.prop("y", stringify(y) ) }

    get width() : length { return this.prop("width") }
    set width( width : length) { this.prop("width", stringify(width) ) }

    get height() : length { return this.prop("height") }
    set height( height : length) { this.prop("height", stringify(height) ) }

    get viewBox() : string | bounds { return this.prop("viewBox") }
    set viewBox( viewBox : string | bounds ) { this.prop("viewBox", viewBox) }

    get bounds() : bounds {
        return new bounds(this.x,this.y,this.width,this.height)
    }

    set bounds( bounds : bounds) {
        this.x = bounds.x
        this.y = bounds.y 
        this.width = bounds.width
        this.height = bounds.height
    }

    addChild( node : IShape ) {
        this.domNode.appendChild( node.domNode )
    }
}

export class SkG extends SkNode {
    static create( init? : ( obj : SkG ) => void ) : SkG {
        return SkG.adapt(document.createElementNS(SVG_NAMESPACE,"g"), init);
    }

    static adapt( element : Element, init? : ( obj : SkG ) => void) : SkG {
        var c = element["sk"];
        c = c ? c : new SkG(element)

        if( init ) {
            init.call( null, c)
        }

        return c;
    }

    get transform() : transformList | string { return this.prop("transform") }
    set transform( transform : transformList | string ) { this.prop("transform",transform) }

    addChild( node : IShape ) {
        this.domNode.appendChild( node.domNode )
    }
}