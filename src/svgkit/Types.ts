export type length = number | string
export type coordinate = length

export interface stringifiable {
    asString() : string
}

export class bounds implements stringifiable {
    readonly x : coordinate
    readonly y : coordinate
    readonly width : length
    readonly height : length

    constructor( x : coordinate, y : coordinate, width : length, height : length ) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    static from( data : T_bounds ) {
        return new bounds( data.x, data.y, data.width, data.height )
    }

    asString() : string {
        return this.x + " " + this.y + " " + this.width + " " + this.height
    }
}

export interface numericBounds {
    readonly x : number
    readonly y : number
    readonly width : number
    readonly height : number
}

export interface T_bounds {
    type : "bounds"
    readonly x : coordinate
    readonly y : coordinate
    readonly width : length
    readonly height : length
}

export interface transform extends stringifiable {}

export class translate implements transform {
    readonly x : number
    readonly y : number

    constructor( x : number, y? : number ) {
        this.x = x
        this.y = y
    }

    static from( data : T_translate ) {
        return new translate( data.x, data.y);
    }

    asString() : string {
        if( this.y ) {
            return `translate(${this.x} ${this.y})`
        }
        return `translate(${this.x})`
    }
}

export interface T_translate {
    type : "translate"
    readonly x : number
    readonly y? : number
 } 
 
 export class rotate implements transform {
    readonly angle : number
    readonly cx : number
    readonly cy : number

    constructor( angle : number, cx? : number, cy? : number ) {
        this.angle = angle
        this.cx = cx
        this.cy = cy
    }

    static from( data : T_rotate ) {
        return new rotate( data.angle, data.cx, data.cy );
    }

    asString() : string {
        if( this.cx && this.cy ) {
            return `rotate(${this.angle} ${this.cx} ${this.cy})`
        }
        return `rotate(${this.angle})`
    }
}

export interface T_rotate {
    type : "rotate"
    readonly angle : number
    readonly cx? : number
    readonly cy? : number
}

export class matrix implements transform {
    readonly a : number
    readonly b : number
    readonly c : number
    readonly d : number
    readonly e : number
    readonly f : number

    constructor( a : number, b : number, c : number, d : number, e : number, f: number ) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;
    }

    static from( data : T_matrix ) {
        return new matrix( data.a, data.b, data.c, data.d, data.e, data.f );
    }

    asString() : string {
        return `matrix(${this.a} ${this.b} ${this.c} ${this.d} ${this.e} ${this.f})`
    }
}

export interface T_matrix {
    type : "matrix"
    readonly a : number
    readonly b : number
    readonly c : number
    readonly d : number
    readonly e : number
    readonly f : number
}

export class scale implements transform {
    readonly sx : number
    readonly sy : number

    constructor( sx : number, sy? : number) {
        this.sx = sx
        this.sy = sy
    }

    static from( data : T_scale ) {
        return new scale( data.sx, data.sy );
    }

    asString() : string {
        if( this.sy ) {
            return `scale(${this.sx} ${this.sy})`
        }
        return `scale(${this.sx})`
    }
}

export interface T_scale {
    type : "scale"
    readonly sx : number
    readonly sy? : number
}

export class skewX implements transform {
    readonly skewX : number
    constructor( skewX : number ) {
        this.skewX = skewX
    }

    static from( data : T_skewX ) {
        return new skewX( data.skewX );
    }

    asString() : string {
        return `skewX(${this.skewX})`
    }
}

export interface T_skewX {
    type : "skewX"
    readonly skewX : number
}

export class skewY implements transform {
    readonly skewY : number
    constructor( skewY : number ) {
        this.skewY = skewY
    }

    static from( data : T_skewY ) {
        return new skewY( data.skewY )
    }

    asString() : string {
        return `skewY(${this.skewY})`
    }
}

export interface T_skewY {
    type : "skewY"
    readonly skewY : number
}

export class transformList implements stringifiable {
    readonly transforms : transform[]

    constructor(...transforms : transform[]) {
        this.transforms = transforms;
    }

    static from( data : T_transformList ) {
        let rv = new transformList()
        data.transforms.map( transformList.toTransform ).forEach( t => rv.transforms.push(t) )
        return rv;
    }

    static fromArray( transforms: transform[] ) {
        let rv = new transformList()
        transforms.forEach( t => rv.transforms.push(t) )
        return rv;
    }

    private static toTransform( t : T_transform) : transform {
        return $T(t)
    }

    asString() : string {
        return this.transforms.map( o => o.asString() ).join(" ");
    }
}

export interface T_transformList {
    type : "transformList"
    readonly transforms : T_transform[]
}

export class stringList implements stringifiable {
    readonly items : string[]

    constructor(...items : string[]) {
        this.items = items
    }

    asString() : string {
        return this.items.join(",")
    }
}

export enum strokeLinejoin {
    MITER="miter", ROUND="round", BEVEL="bevel"
}

export enum strokeLineCap {
    BUTT="butt",  ROUND="round", SQUARE="square"
}

export type paint = string

export enum PreserveAspectRatioAlign {
    none = "none", 
    xMinYMin = "xMinYMin", 
    xMidYMin = "xMidYMin", 
    xMaxYMin = "xMaxYMin", 
    xMinYMid = "xMinYMid",
    xMidYMid = "xMidYMid", 
    xMaxYMid = "xMaxYMid", 
    xMinYMax = "xMinYMax", 
    xMidYMax = "xMidYMax",
    xMaxYMax = "xMaxYMax"
}

export class preserveAspectRatio implements stringifiable {
    readonly defer : boolean
    readonly align : PreserveAspectRatioAlign
    readonly meetOrSlice : "meet" | "slice"

    constructor( algin : PreserveAspectRatioAlign, meetOrSlice? : "meet" | "slice", defer? : boolean ) {
        this.defer = defer
        this.align = algin
        this.meetOrSlice = meetOrSlice ? meetOrSlice : "meet"
    }

    static from( data : T_preserveAspectRatio ) {
        return new preserveAspectRatio( data.align, data.meetOrSlice, data.defer );
    }

    asString() : string {
        if( this.defer ) {
            return `${this.align} ${this.meetOrSlice}`
        }
        return `defer ${this.align} ${this.meetOrSlice}`
    }
}

export interface T_preserveAspectRatio {
    type : "preserveAspectRatio"
    readonly defer : boolean
    readonly align : PreserveAspectRatioAlign
    readonly meetOrSlice : "meet" | "slice"
}

export type T_type = T_bounds | T_preserveAspectRatio
    | T_matrix | T_rotate | T_scale | T_skewX | T_skewY | T_transformList | T_translate;


export type T_transform = T_matrix | T_rotate | T_scale | T_skewX | T_skewY | T_translate

export function $T( data :  T_type ) {
    switch( data.type ) {
        case "bounds": return bounds.from( data )
        case "matrix": return matrix.from( data )
        case "rotate": return rotate.from( data )
        case "scale": return scale.from( data )
        case "skewX": return skewX.from( data )
        case "skewY": return skewY.from( data )
        case "transformList" : return transformList.from( data )
        case "translate": return translate.from( data )
        case "preserveAspectRatio" : return preserveAspectRatio.from( data )
    }
}