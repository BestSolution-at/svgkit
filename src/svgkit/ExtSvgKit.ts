import { SkNode, SVG_NAMESPACE, SkPath } from "./SvgKit";
import { bounds, paint } from "./Types";
import { cornerRadii } from "./ExtTypes";

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

    updatePath() {
        if( this.cornerRadii ) {
            this.path.d = 
                "M " + ( this.x + this.cornerRadii.topLeftHorizontalRadius ) + "," + this.y +
                // top line
                " h " + ( this.width - this.cornerRadii.topLeftHorizontalRadius - this.cornerRadii.topRightHorizontalRadius ) + 
                // right upper edge
                " a " + this.cornerRadii.topRightHorizontalRadius + "," + this.cornerRadii.topRightVerticalRadius + " 0 0 1 " + this.cornerRadii.topRightHorizontalRadius + "," + this.cornerRadii.topRightVerticalRadius +
                // right line
                " v " + ( this.height - this.cornerRadii.topRightVerticalRadius - this.cornerRadii.bottomRightVerticalRadius ) +
                // right bottom edge
                " a " + -this.cornerRadii.bottomRightHorizontalRadius + "," + this.cornerRadii.bottomRightVerticalRadius + " 0 0 1 " + -this.cornerRadii.bottomRightHorizontalRadius + "," + this.cornerRadii.bottomRightVerticalRadius +
                " h " + -( this.width - this.cornerRadii.bottomRightHorizontalRadius - this.cornerRadii.bottomLeftHorizontalRadius ) +
                " a " + -this.cornerRadii.bottomLeftHorizontalRadius + "," + -this.cornerRadii.bottomLeftVerticalRadius + " 0 0 1 " + -this.cornerRadii.bottomLeftHorizontalRadius + "," + -this.cornerRadii.bottomLeftVerticalRadius +
                " v " + -( this.height - this.cornerRadii.bottomLeftVerticalRadius - this.cornerRadii.topLeftVerticalRadius ) +
                " a " + this.cornerRadii.topLeftHorizontalRadius + "," + -this.cornerRadii.topLeftVerticalRadius + " 0 0 1 " + this.cornerRadii.topLeftHorizontalRadius + "," + -this.cornerRadii.topLeftVerticalRadius +
                " z"
        } else {
            this.path.d = "M " + this.x + "," + this.y + " h " + this.width + " v " + this.height + " h " + -this.width + " z"
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

    get cornerRadii() : cornerRadii { return this._cornerRadii }
    set cornerRadii( cornerRadii : cornerRadii ) { this._cornerRadii = cornerRadii; this.updatePath(); }

    get fill() : paint { return this.path.fill }
    set fill( fill : paint ) { this.path.fill = fill; }
}