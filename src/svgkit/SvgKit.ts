import { coordinate, length, paint, stringifiable, stringList, bounds, preserveAspectRatio, transformList, T_bounds } from "./Types";

export var SVG_NAMESPACE = "http://www.w3.org/2000/svg"
export var XLINK_NAMSPACE = "http://www.w3.org/1999/xlink"

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


export interface INode {
    readonly domNode : Element
    
    id( id? : string ) : string 
    prop( name : string, value? : string ) : string
}

export interface IGraphicsElement extends INode {}
export interface ISvg extends INode {}
export interface ISymbol extends INode {}
export interface IG extends INode {}
export interface IUse extends INode {}
export interface IImage extends INode {}
export interface IShape extends INode, IGraphicsElement {}

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

    id( id? : string ) : string {
        return this.prop("id",id);
    }
}

export class SkSvg extends SkNode {
    private constructor(domNode : Element) {
        super(domNode)
    }

    static create(parent? : Element) : SkSvg {
        var e = document.createElementNS(SVG_NAMESPACE,"svg");
        e.setAttribute("xmlns:xlink",XLINK_NAMSPACE);
        var s = new SkSvg( e )
        
        if( parent ) {
            parent.appendChild( s.domNode );
        }
        return s;
    }

    static adapt(domNode : Element) : SkSvg {
        return new SkSvg( domNode );
    }

    static from( data : S_SkSvg, parent? : Element ) : SkSvg {
        let rv = SkSvg.create(parent);
        if( data.bounds ) rv.bounds = bounds.from(data.bounds);
        if( data.x ) rv.x = data.x
        if( data.y ) rv.y = data.y
        if( data.width ) rv.width = data.width
        if( data.height ) rv.height = data.height
        if( data.viewBox ) rv.viewBox = bounds.from( data.viewBox )
        if( data.children ) {
            data.children.map($S).forEach( t => rv.addChild(t) )
        }
        return rv;
    }

    // styling
    get class() : string | stringList { return this.prop("class") }
    set class( clazz : string | stringList ) { this.prop("class", clazz) }

    get style() : string { return this.prop("style") }
    set style( style : string ) { this.prop("style", style) }

    get externalResourcesRequired() : boolean { return Boolean(this.prop("externalResourcesRequired")) }
    set externalResourcesRequired( externalResourcesRequired : boolean ) { this.prop("externalResourcesRequired", String(externalResourcesRequired)) }

    // svg properties
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

    get preserveAspectRatio() : string | preserveAspectRatio { return this.prop("preserveAspectRatio") }
    set preserveAspectRatio( preserveAspectRatio : string | preserveAspectRatio ) { this.prop("preserveAspectRatio", preserveAspectRatio) }

    // TODO get/set zoomAndPan

    get version() : string { return this.prop("version") }
    set version( version : string ) { this.prop("version",version) }

    get baseProfile() : string { return this.prop("baseProfile") }
    set baseProfile( baseProfile : string ) { this.prop("baseProfile",baseProfile) }

    get contentScriptType() : string { return this.prop("contentScriptType") }
    set contentScriptType( contentScriptType : string ) { this.prop("contentScriptType", contentScriptType) }

    get contentStyleType() : string { return this.prop("contentStyleType") }
    set contentStyleType( contentScriptType : string ) { this.prop("contentStyleType", contentScriptType) }

    // custom properties
    get bounds() : bounds {
        return new bounds(this.x,this.y,this.width,this.height)
    }

    set bounds( bounds : bounds) {
        this.x = bounds.x
        this.y = bounds.y 
        this.width = bounds.width
        this.height = bounds.height
    }

    addChild( node : INode ) {
        this.domNode.appendChild( node.domNode )
    }
}

export interface S_SkSvg {
    type : "svg"
    bounds? : T_bounds
    x? : coordinate
    y? : coordinate
    width? : length
    height? : length
    viewBox? : T_bounds
    children? : S_type[]
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

    // styling
    get class() : string | stringList { return this.prop("class") }
    set class( clazz : string | stringList ) { this.prop("class", clazz) }

    get style() : string { return this.prop("style") }
    set style( style : string ) { this.prop("style", style) }

    get externalResourcesRequired() : boolean { return Boolean(this.prop("externalResourcesRequired")) }
    set externalResourcesRequired( externalResourcesRequired : boolean ) { this.prop("externalResourcesRequired", String(externalResourcesRequired)) }

    get transform() : transformList | string { return this.prop("transform") }
    set transform( transform : transformList | string ) { this.prop("transform",transform) }

    addChild( node : IShape ) {
        this.domNode.appendChild( node.domNode )
    }
}

export interface S_SkG {
    type : "g"
}

export class SkDefs extends SkNode {
    static create( init? : ( obj : SkDefs ) => void ) : SkDefs {
        return SkDefs.adapt(document.createElementNS(SVG_NAMESPACE,"defs"), init);
    }

    static adapt( element : Element, init? : ( obj : SkDefs ) => void) : SkDefs {
        var c = element["sk"];
        c = c ? c : new SkDefs(element)

        if( init ) {
            init.call( null, c)
        }

        return c;
    }

    // styling
    get class() : string | stringList { return this.prop("class") }
    set class( clazz : string | stringList ) { this.prop("class", clazz) }

    get style() : string { return this.prop("style") }
    set style( style : string ) { this.prop("style", style) }

    get externalResourcesRequired() : boolean { return Boolean(this.prop("externalResourcesRequired")) }
    set externalResourcesRequired( externalResourcesRequired : boolean ) { this.prop("externalResourcesRequired", String(externalResourcesRequired)) }

    get transform() : transformList | string { return this.prop("transform") }
    set transform( transform : transformList | string ) { this.prop("transform",transform) }
}

export interface S_SkDefs {
    type : "defs"
}

export class SkDesc extends SkNode {
    static create( init? : ( obj : SkDesc ) => void ) : SkDesc {
        return SkDesc.adapt(document.createElementNS(SVG_NAMESPACE,"desc"), init);
    }

    static adapt( element : Element, init? : ( obj : SkDesc ) => void) : SkDesc {
        var c = element["sk"];
        c = c ? c : new SkDesc(element)

        if( init ) {
            init.call( null, c)
        }

        return c;
    }

    get text() : string { return this.domNode.textContent }
    set text( text: string) { this.domNode.textContent = text }
}

export interface S_SkDesc {
    type : "desc"
}

export class SkTitle extends SkNode {
    // TODO
}

export interface S_SkTitle {
    type : "title"
}

export class SkSymbol extends SkNode {
    static create( init? : ( obj : SkSymbol ) => void ) : SkSymbol {
        return SkSymbol.adapt(document.createElementNS(SVG_NAMESPACE,"symbol"), init);
    }

    static adapt( element : Element, init? : ( obj : SkSymbol ) => void) : SkSymbol {
        var c = element["sk"];
        c = c ? c : new SkSymbol(element)

        if( init ) {
            init.call( null, c)
        }

        return c;
    }

    // styling
    get class() : string | stringList { return this.prop("class") }
    set class( clazz : string | stringList ) { this.prop("class", clazz) }

    get style() : string { return this.prop("style") }
    set style( style : string ) { this.prop("style", style) }

    get externalResourcesRequired() : boolean { return Boolean(this.prop("externalResourcesRequired")) }
    set externalResourcesRequired( externalResourcesRequired : boolean ) { this.prop("externalResourcesRequired", String(externalResourcesRequired)) }
    
    get viewBox() : string | bounds { return this.prop("viewBox") }
    set viewBox( viewBox : string | bounds ) { this.prop("viewBox", viewBox) }

    get preserveAspectRatio() : string | preserveAspectRatio { return this.prop("preserveAspectRatio") }
    set preserveAspectRatio( preserveAspectRatio : string | preserveAspectRatio ) { this.prop("preserveAspectRatio", preserveAspectRatio) }
}

export interface S_SkSymbol {
    type : "symbol"
}

export class SkUse extends SkNode {
    static create( init? : ( obj : SkUse ) => void ) : SkUse {
        return SkUse.adapt(document.createElementNS(SVG_NAMESPACE,"use"), init);
    }

    static adapt( element : Element, init? : ( obj : SkUse ) => void) : SkUse {
        var c = element["sk"];
        c = c ? c : new SkUse(element)

        if( init ) {
            init.call( null, c)
        }

        return c;
    }

    // styling
    get class() : string | stringList { return this.prop("class") }
    set class( clazz : string | stringList ) { this.prop("class", clazz) }

    get style() : string { return this.prop("style") }
    set style( style : string ) { this.prop("style", style) }

    get externalResourcesRequired() : boolean { return Boolean(this.prop("externalResourcesRequired")) }
    set externalResourcesRequired( externalResourcesRequired : boolean ) { this.prop("externalResourcesRequired", String(externalResourcesRequired)) }
    
    get transform() : transformList | string { return this.prop("transform") }
    set transform( transform : transformList | string ) { this.prop("transform",transform) }

    get x() : coordinate { return this.prop("x") }
    set x( x : coordinate) { this.prop("x", stringify(x) ) }

    get y() : coordinate { return this.prop("y") }
    set y( y : coordinate) { this.prop("y", stringify(y) ) }

    get width() : length { return this.prop("width") }
    set width( width : length) { this.prop("width", stringify(width) ) }

    get height() : length { return this.prop("height") }
    set height( height : length) { this.prop("height", stringify(height) ) }
    
    get href() : string | IGraphicsElement | ISvg | ISymbol | IG | IUse { 
        return this.domNode.getAttributeNS(XLINK_NAMSPACE,"href");
    }
    
    set href( href : string | IGraphicsElement | ISvg | ISymbol | IG | IUse ) {
        if( typeof(href) === "string" ) {
            this.domNode.setAttributeNS(XLINK_NAMSPACE,"href",href)
        } else {
            this.domNode.setAttributeNS(XLINK_NAMSPACE,"href","#" + href.id())
        }
    }
}

export interface S_SkUse {
    type : "use"
}

export class SkImage extends SkNode implements IImage {
    // styling
    get class() : string | stringList { return this.prop("class") }
    set class( clazz : string | stringList ) { this.prop("class", clazz) }

    get style() : string { return this.prop("style") }
    set style( style : string ) { this.prop("style", style) }

    get externalResourcesRequired() : boolean { return Boolean(this.prop("externalResourcesRequired")) }
    set externalResourcesRequired( externalResourcesRequired : boolean ) { this.prop("externalResourcesRequired", String(externalResourcesRequired)) }
    
    get preserveAspectRatio() : string | preserveAspectRatio { return this.prop("preserveAspectRatio") }
    set preserveAspectRatio( preserveAspectRatio : string | preserveAspectRatio ) { this.prop("preserveAspectRatio", preserveAspectRatio) }
    
    get transform() : transformList | string { return this.prop("transform") }
    set transform( transform : transformList | string ) { this.prop("transform",transform) }

    get href() : string | IImage { 
        return this.domNode.getAttributeNS(XLINK_NAMSPACE,"href");
    }
    
    set href( href : string | IImage ) {
        if( typeof(href) === "string" ) {
            this.domNode.setAttributeNS(XLINK_NAMSPACE,"href",href)
        } else {
            this.domNode.setAttributeNS(XLINK_NAMSPACE,"href",href.id())
        }
    }
}

export interface S_SkImage {
    type : "image"
}

export class SkSwitch {

}

export interface S_SkSwitch {
    type : "switch"
}

export class SkPath extends SkNode {
    static create( init? : ( obj : SkPath ) => void ) : SkPath {
        return SkPath.adapt(document.createElementNS(SVG_NAMESPACE,"path"), init);
    }

    static adapt( element : Element, init? : ( obj : SkPath ) => void) : SkPath {
        var c = element["sk"];
        c = c ? c : new SkPath(element)

        if( init ) {
            init.call( null, c)
        }

        return c;
    }

    // styling
    get class() : string | stringList { return this.prop("class") }
    set class( clazz : string | stringList ) { this.prop("class", clazz) }

    get style() : string { return this.prop("style") }
    set style( style : string ) { this.prop("style", style) }

    get externalResourcesRequired() : boolean { return Boolean(this.prop("externalResourcesRequired")) }
    set externalResourcesRequired( externalResourcesRequired : boolean ) { this.prop("externalResourcesRequired", String(externalResourcesRequired)) }
    
    get transform() : transformList | string { return this.prop("transform") }
    set transform( transform : transformList | string ) { this.prop("transform",transform) }
    
    get d() : string { return this.prop("d") }
    set d( d : string ) { this.prop("d",d) }

    get pathLength() : string { return this.prop("pathLength") }
    set pathLength( pathLength : string ) { this.prop("pathLength",pathLength) } 
}

export interface S_SkPath {
    type : "path"
}

export class SkRect extends SkNode implements IShape {
    static create( init? : ( obj : SkRect ) => void ) : SkRect {
        return SkRect.adapt(document.createElementNS(SVG_NAMESPACE,"rect"), init);
    }

    static adapt( element : Element, init? : ( obj : SkRect ) => void) : SkRect {
        var c = element["sk"];
        c = c ? c : new SkRect(element)

        if( init ) {
            init.call( null, c)
        }

        return c;
    }

    static from( data : S_SkRect ) {
        return SkRect.create( o => {
            if( data.bounds ) o.bounds = bounds.from( data.bounds )
            if( data.x ) o.x = data.x
            if( data.y ) o.y = data.y
            if( data.width ) o.width = data.width
            if( data.height ) o.height = data.height
            if( data.rx ) o.rx = data.rx
            if( data.height ) o.ry = data.ry
            if( data.fill ) o.fill = data.fill
            if( data.stroke ) o.stroke = data.stroke
            if( data.strokeWidth ) o.strokeWidth = data.strokeWidth
        } );
    }

    // styling
    get class() : string | stringList { return this.prop("class") }
    set class( clazz : string | stringList ) { this.prop("class", clazz) }

    get style() : string { return this.prop("style") }
    set style( style : string ) { this.prop("style", style) }

    get externalResourcesRequired() : boolean { return Boolean(this.prop("externalResourcesRequired")) }
    set externalResourcesRequired( externalResourcesRequired : boolean ) { this.prop("externalResourcesRequired", String(externalResourcesRequired)) }

    get transform() : transformList | string { return this.prop("transform") }
    set transform( transform : transformList | string ) { this.prop("transform",transform) }

    get x() : coordinate { return this.prop("x") }
    set x( x : coordinate ) { this.prop("x", stringify(x) ) }

    get y() : coordinate { return this.prop("y") }
    set y( y : coordinate ) { this.prop("y", stringify(y) ) }

    get width() : length { return this.prop("width") }
    set width( width : length) { this.prop("width", stringify(width) ) }

    get height() : length { return this.prop("height") }
    set height( height : length) { this.prop("height", stringify(height) ) }

    get bounds() : bounds {
        return new bounds(this.x,this.y,this.width,this.height)
    }

    set bounds( bounds : bounds) {
        this.x = bounds.x
        this.y = bounds.y 
        this.width = bounds.width
        this.height = bounds.height
    }

    get rx() : length { return this.prop("rx") }
    set rx( rx : length) { this.prop("rx", stringify(rx) ) }

    get ry() : length { return this.prop("ry") }
    set ry( ry : length) { this.prop("ry", stringify(ry) ) }

    // properties

    get fill() : paint { return attr( "fill" ,this) }
    set fill( fill : paint) { attr( "fill" , this, fill) }

    get stroke() : paint { return attr( "stroke" ,this) }
    set stroke( stroke : paint) { attr( "stroke" , this, stroke) }

    get strokeWidth() : length { return attr( "stroke-width" ,this) }
    set strokeWidth( strokeWidth : length) { attr( "stroke-width" , this, strokeWidth) }
}

export interface S_SkRect {
    type : "rect"
    bounds? : T_bounds
    x? : coordinate
    y? : coordinate
    width? : length
    height? : length
    rx? : length
    ry? : length,
    fill? : paint,
    stroke? : paint,
    strokeWidth? : length
}

export class SkCircle extends SkNode {
    static create( init? : ( obj : SkCircle ) => void ) : SkCircle {
        return SkCircle.adapt(document.createElementNS(SVG_NAMESPACE,"circle"), init);
    }

    static adapt( element : Element, init? : ( obj : SkCircle ) => void) : SkCircle {
        var c = element["sk"];
        c = c ? c : new SkCircle(element)

        if( init ) {
            init.call( null, c)
        }

        return c;
    }

    // styling
    get class() : string | stringList { return this.prop("class") }
    set class( clazz : string | stringList ) { this.prop("class", clazz) }

    get style() : string { return this.prop("style") }
    set style( style : string ) { this.prop("style", style) }

    get externalResourcesRequired() : boolean { return Boolean(this.prop("externalResourcesRequired")) }
    set externalResourcesRequired( externalResourcesRequired : boolean ) { this.prop("externalResourcesRequired", String(externalResourcesRequired)) }

    get transform() : transformList | string { return this.prop("transform") }
    set transform( transform : transformList | string ) { this.prop("transform",transform) }

    get cx() : string | coordinate { return this.prop("cx") }
    set cx( cx : string | coordinate ) { this.prop("cx",stringify(cx)) }

    get cy() : string | coordinate { return this.prop("cy") }
    set cy( cy : string | coordinate ) { this.prop("cy",stringify(cy)) }

    get r() : string | length { return this.prop("r") }
    set r( r : string | length ) { this.prop("r",stringify(r)) }

    // properties

    get fill() : paint { return attr( "fill" ,this) }
    set fill( fill : paint) { attr( "fill" , this, fill) }

    get stroke() : paint { return attr( "stroke" ,this) }
    set stroke( stroke : paint) { attr( "stroke" , this, stroke) }

    get strokeWidth() : length { return attr( "stroke-width" ,this) }
    set strokeWidth( strokeWidth : length) { attr( "stroke-width" , this, strokeWidth) }
}

export interface S_SkCircle {
    type : "circle"
}

export class SkEllipse extends SkNode {
    static create( init? : ( obj : SkEllipse ) => void ) : SkEllipse {
        return SkEllipse.adapt(document.createElementNS(SVG_NAMESPACE,"ellipse"), init);
    }

    static adapt( element : Element, init? : ( obj : SkEllipse ) => void) : SkEllipse {
        var c = element["sk"];
        c = c ? c : new SkEllipse(element)

        if( init ) {
            init.call( null, c)
        }

        return c;
    }

    // styling
    get class() : string | stringList { return this.prop("class") }
    set class( clazz : string | stringList ) { this.prop("class", clazz) }

    get style() : string { return this.prop("style") }
    set style( style : string ) { this.prop("style", style) }

    get externalResourcesRequired() : boolean { return Boolean(this.prop("externalResourcesRequired")) }
    set externalResourcesRequired( externalResourcesRequired : boolean ) { this.prop("externalResourcesRequired", String(externalResourcesRequired)) }

    get transform() : transformList | string { return this.prop("transform") }
    set transform( transform : transformList | string ) { this.prop("transform",transform) }
    
    get cx() : string | coordinate { return this.prop("cx") }
    set cx( cx : string | coordinate ) { this.prop("cx",stringify(cx)) }

    get cy() : string | coordinate { return this.prop("cy") }
    set cy( cy : string | coordinate ) { this.prop("cy",stringify(cy)) }

    get rx() : string | coordinate { return this.prop("rx") }
    set rx( rx : string | coordinate ) { this.prop("rx",stringify(rx)) }

    get ry() : string | coordinate { return this.prop("ry") }
    set ry( ry : string | coordinate ) { this.prop("ry",stringify(ry)) }

    // properties

    get fill() : paint { return attr( "fill" ,this) }
    set fill( fill : paint) { attr( "fill" , this, fill) }

    get stroke() : paint { return attr( "stroke" ,this) }
    set stroke( stroke : paint) { attr( "stroke" , this, stroke) }

    get strokeWidth() : length { return attr( "stroke-width" ,this) }
    set strokeWidth( strokeWidth : length) { attr( "stroke-width" , this, strokeWidth) }
}

export interface S_SkEllipse {
    type : "ellipse"
}

export class SkLine extends SkNode {
    static create( init? : ( obj : SkLine ) => void ) : SkLine {
        return SkLine.adapt(document.createElementNS(SVG_NAMESPACE,"line"), init);
    }

    static adapt( element : Element, init? : ( obj : SkLine ) => void) : SkLine {
        var c = element["sk"];
        c = c ? c : new SkLine(element)

        if( init ) {
            init.call( null, c)
        }

        return c;
    }

    // styling
    get class() : string | stringList { return this.prop("class") }
    set class( clazz : string | stringList ) { this.prop("class", clazz) }

    get style() : string { return this.prop("style") }
    set style( style : string ) { this.prop("style", style) }

    get externalResourcesRequired() : boolean { return Boolean(this.prop("externalResourcesRequired")) }
    set externalResourcesRequired( externalResourcesRequired : boolean ) { this.prop("externalResourcesRequired", String(externalResourcesRequired)) }

    get transform() : transformList | string { return this.prop("transform") }
    set transform( transform : transformList | string ) { this.prop("transform",transform) }

    get x1() : string | coordinate { return this.prop("x1") }
    set x1( x1 : string | coordinate ) { this.prop("x1",stringify(x1)) }

    get y1() : string | coordinate { return this.prop("y1") }
    set y1( y1 : string | coordinate ) { this.prop("y1",stringify(y1)) }

    get x2() : string | coordinate { return this.prop("x2") }
    set x2( x2 : string | coordinate ) { this.prop("x2",stringify(x2)) }

    get y2() : string | coordinate { return this.prop("y2") }
    set y2( y2 : string | coordinate ) { this.prop("y2",stringify(y2)) }
}

export interface S_SkLine {
    type : "line"
}

export type S_type = 
    S_SkCircle  | S_SkDefs   | S_SkDesc  |
    S_SkEllipse | S_SkG      | S_SkImage | 
    S_SkLine    | S_SkPath   | S_SkRect  |
    S_SkSvg     | S_SkSwitch | S_SkSymbol


export function $S( data : S_type) {
    switch(data.type) {
        case "circle": return null;
        case "defs": return null;
        case "desc": return null;
        case "ellipse": return null;
        case "g": return null;
        case "image": return null;
        case "line": return null;
        case "path": return null;
        case "rect": return SkRect.from(data)
        case "svg": return SkSvg.from(data)
        case "switch": return null;
        case "symbol": return null;
    }
}
/*export function createSkNode( name : "rect" ) : SkRect;
export function createSkNode( name : "circle" ) : SkCircle;

export function createSkNode( name : string) : SkNode {
    switch(name) {
        case "rect"     : return new SkRect(createSvgNode("rect"))
        case "circle"   : return new SkCircle(createSvgNode("circle"))
    }

    console.log("Unknown type '",name,"'");
    return null;
}
*/

