import { SkNode, SVG_NAMESPACE, SkPath, SkG } from "./SvgKit";
import { paint, numericBounds } from "./Types";
import { cornerRadii, backgroundFill, background } from "./ExtTypes";
import { nonNull } from "./utils";

export class ExtSkRoundRect extends SkNode {
    private path : SkPath
    private _x : number = 0
    private _y : number = 0
    private _width : number = 0
    private _height : number = 0
    private _cornerRadii : cornerRadii

    static create( init? : ( obj : ExtSkRoundRect ) => void ) : ExtSkRoundRect {
        let rv = new ExtSkRoundRect(document.createElementNS(SVG_NAMESPACE,"g"));
        rv.path = SkPath.create()
        if( init ) {
            init.call( null, rv)
        }
        rv.domNode.appendChild(rv.path.domNode);
        return rv;
    }

    private updatePath() {
        if( this.cornerRadii ) {
            this.path.d = 
                "M " + ( nonNull(this.x,0) + nonNull(this.cornerRadii.topLeftHorizontalRadius,0) ) + "," + nonNull(this.y,0) +
                // top line
                " h " + ( nonNull(this.width,0) - nonNull(this.cornerRadii.topLeftHorizontalRadius,0) - nonNull(this.cornerRadii.topRightHorizontalRadius,0) ) + 
                // right upper edge
                " a " + nonNull(this.cornerRadii.topRightHorizontalRadius,0) + "," + nonNull(this.cornerRadii.topRightVerticalRadius,0) + " 0 0 1 " + nonNull(this.cornerRadii.topRightHorizontalRadius,0) + "," + nonNull(this.cornerRadii.topRightVerticalRadius,0) +
                // right line
                " v " + ( nonNull(this.height,0) - nonNull(this.cornerRadii.topRightVerticalRadius,0) - nonNull(this.cornerRadii.bottomRightVerticalRadius,0) ) +
                // right bottom edge
                " a " + -nonNull(this.cornerRadii.bottomRightHorizontalRadius,0) + "," + nonNull(this.cornerRadii.bottomRightVerticalRadius,0) + " 0 0 1 " + -nonNull(this.cornerRadii.bottomRightHorizontalRadius,0) + "," + nonNull(this.cornerRadii.bottomRightVerticalRadius,0) +
                " h " + -( nonNull(this.width,0) - nonNull(this.cornerRadii.bottomRightHorizontalRadius,0) - nonNull(this.cornerRadii.bottomLeftHorizontalRadius,0) ) +
                " a " + -nonNull(this.cornerRadii.bottomLeftHorizontalRadius,0) + "," + -nonNull(this.cornerRadii.bottomLeftVerticalRadius,0) + " 0 0 1 " + -nonNull(this.cornerRadii.bottomLeftHorizontalRadius,0) + "," + -nonNull(this.cornerRadii.bottomLeftVerticalRadius,0) +
                " v " + -( nonNull(this.height,0) - nonNull(this.cornerRadii.bottomLeftVerticalRadius,0) - nonNull(this.cornerRadii.topLeftVerticalRadius,0) ) +
                " a " + nonNull(this.cornerRadii.topLeftHorizontalRadius,0) + "," + -nonNull(this.cornerRadii.topLeftVerticalRadius,0) + " 0 0 1 " + nonNull(this.cornerRadii.topLeftHorizontalRadius,0) + "," + -nonNull(this.cornerRadii.topLeftVerticalRadius,0) +
                " z"
        } else {
            this.path.d = "M " + nonNull(this.x,0) + "," + nonNull(this.y,0) + " h " + nonNull(this.width,0) + " v " + nonNull(this.height,0) + " h " + -nonNull(this.width,0) + " z"
        }
    }

    get x() : number { return this._x }
    set x( x : number ) { this._x = x; this.updatePath(); }

    get y() : number { return this._y }
    set y( y : number ) { this._y = y; this.updatePath(); }

    get width() : number { return this._width }
    set width( width : number) { this._width = width; this.updatePath(); }

    get height() : number { return this._height }
    set height( height : number) { this._height = height; this.updatePath(); }

    get bounds() : numericBounds {
        return { x: this.x, y : this.y, width : this.width, height: this.height};
    }

    set bounds( bounds : numericBounds) {
        this._x = bounds.x
        this._y = bounds.y 
        this._width = bounds.width
        this._height = bounds.height
        this.updatePath();
    }

    get cornerRadii() : cornerRadii { return this._cornerRadii }
    set cornerRadii( cornerRadii : cornerRadii ) { this._cornerRadii = cornerRadii; this.updatePath(); }

    get fill() : paint { return this.path.fill }
    set fill( fill : paint ) { this.path.fill = fill; }
}


export class ExtSkRegion extends SkNode {
    private _background : background;
    private backgroundRects : ExtSkRoundRect[] = [];
    private borderRects : ExtSkRoundRect[] = [];
    private _x : number = 0
    private _y : number = 0
    private _width : number = 0
    private _height : number = 0
    private backgroundContainer : SkG;
    private borderContainer : SkG;

    static create( init? : ( obj : ExtSkRegion ) => void ) : ExtSkRegion {
        let rv = new ExtSkRegion(document.createElementNS(SVG_NAMESPACE,"g"));
        rv.backgroundContainer = SkG.create();
        rv.borderContainer = SkG.create();

        if( init ) {
            init.call( null, rv)
        }

        rv.domNode.appendChild(rv.backgroundContainer.domNode);
        rv.domNode.appendChild(rv.borderContainer.domNode);

        return rv;
    }

    private updateDom() {
        this.domNode.setAttribute("transform","translate("+this._x+","+this._y+")");
        if( ! this.background ) {
            this.backgroundRects.forEach( e => e.domNode.remove() );
            this.backgroundRects = [];
        } else if( this.background.fills.length != this.backgroundRects.length ) {
            if( this.backgroundRects.length < this.background.fills.length ) {
                for( var i = this.backgroundRects.length; i < this.background.fills.length; i++ ) {
                    let rect = ExtSkRoundRect.create();
                    this.backgroundContainer.addChild(rect);
                    this.backgroundRects.push( rect );
                }
            } else {
                for( var i = this.background.fills.length; i < this.backgroundRects.length; i++ ) {
                    this.backgroundContainer.removeChild( this.backgroundRects[i] );
                }
                this.backgroundRects.length = this.background.fills.length
            }
        }

        this.backgroundRects.forEach( (r, idx ) => this.updateFillRect(r, this.background.fills[idx]) );
    }

    private updateFillRect( rect : ExtSkRoundRect, fill : backgroundFill ) : void {
        rect.fill = fill.paint;
        rect.cornerRadii = fill.corderRadii;
        rect.bounds = { 
            x : fill.insets ? fill.insets.left : 0,
            y : fill.insets ? fill.insets.top : 0,
            width : this._width - (fill.insets ? fill.insets.left : 0) - (fill.insets ? fill.insets.right : 0),
            height : this._height - (fill.insets ? fill.insets.top : 0 ) - (fill.insets ? fill.insets.bottom : 0 )
        };
    }

    get background() : background { return this._background };
    set background( background : background ) { this._background = background; this.updateDom(); }

    get x() : number { return this._x }
    set x( x : number ) { this._x = x; this.updateDom(); }

    get y() : number { return this._y }
    set y( y : number ) { this._y = y; this.updateDom(); }

    get width() : number { return this._width }
    set width( width : number) { this._width = width; this.updateDom(); }

    get height() : number { return this._height }
    set height( height : number) { this._height = height; this.updateDom(); }

    get bounds() : numericBounds {
        return { x: this.x, y : this.y, width : this.width, height: this.height};
    }

    set bounds( bounds : numericBounds) {
        this._x = bounds.x
        this._y = bounds.y 
        this._width = bounds.width
        this._height = bounds.height

        this.updateDom();
    }

}