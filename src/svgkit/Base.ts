import { coordinate, length, bounds, IShape, paint, INode, stringifiable, transformList, stringList, preserveAspectRatio, IGraphicsElement, ISvg, ISymbol, IG, IUse, IImage, boundsStruct } from "./Types";

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

    static from(struct : SkSvgStruct, parent? : Element) : SkSvg {
        var e = document.createElementNS(SVG_NAMESPACE,"svg");
        e.setAttribute("xmlns:xlink",XLINK_NAMSPACE);
        var s = new SkSvg( e )

        if( struct.x ) { s.x = struct.x }
        if( struct.y ) { s.y = struct.y }
        if( struct.bounds ) { s.bounds = bounds.from(struct.bounds) }
        if( struct.viewBox ) { s.viewBox = bounds.from(struct.viewBox) }
        if( struct.children ) { struct.children.forEach( s.addChild ) }
        
        if( parent ) {
            parent.appendChild( s.domNode );
        }
        return s;
    }

    static adapt(domNode : Element) : SkSvg {
        return new SkSvg( domNode );
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

export interface SkSvgStruct {
    readonly x? : coordinate
    readonly y? : coordinate
    readonly bounds? : boundsStruct
    readonly viewBox? : boundsStruct
    readonly width? : length
    readonly height? : length
    readonly children? : INode[]
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

export class SkDesc extends SkNode {
    static create( init? : ( obj : SkDesc ) => void ) : SkDesc {
        return SkDesc.adapt(document.createElementNS(SVG_NAMESPACE,"desc"), init);
    }

    static from( struct : SkDescStruct ) : SkDesc {
        return SkDesc.create( o => {
            o.text = struct.text
        } )
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

export interface SkDescStruct {
    text : string
}

export class SkTitle extends SkNode {
    // TODO
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

export class SkSwitch {

}

export class Style {

}