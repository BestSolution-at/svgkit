import { SkNode, stringify, SVG_NAMESPACE, attr } from "./Base";
import { coordinate, length, bounds, IShape, paint, stringList, transformList } from "./Types";

export class SkPath extends SkNode {
    static create( init? : ( obj : SkPath ) => void ) : SkPath {
        return SkPath.adapt(document.createElementNS(SVG_NAMESPACE,"rect"), init);
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