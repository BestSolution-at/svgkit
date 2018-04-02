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

    asString() : string {
        return this.x + " " + this.y + " " + this.width + " " + this.height
    }
}

export interface transform extends stringifiable {}
export class translate implements transform {
    readonly x : number
    readonly y : number

    constructor( x : number, y? : number ) {
        this.x = x
        this.y = y
    }

    asString() : string {
        if( this.y ) {
            return `translate(${this.x} ${this.y})`
        }
        return `translate(${this.x})`
    }
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

    asString() : string {
        if( this.cx && this.cy ) {
            return `rotate(${this.angle} ${this.cx} ${this.cy})`
        }
        return `rotate(${this.angle})`
    }
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

    asString() : string {
        return `matrix(${this.a} ${this.b} ${this.c} ${this.d} ${this.e} ${this.f})`
    }
}

export class scale implements transform {
    readonly sx : number
    readonly sy : number

    constructor( sx : number, sy? : number) {
        this.sx = sx
        this.sy = sy
    }

    asString() : string {
        if( this.sy ) {
            return `scale(${this.sx} ${this.sy})`
        }
        return `scale(${this.sx})`
    }
}

export class skewX implements transform {
    readonly skewX : number
    constructor( skewX : number ) {
        this.skewX = skewX
    }

    asString() : string {
        return `skewX(${this.skewX})`
    }
}

export class skewY implements transform {
    readonly skewY : number
    constructor( skewY : number ) {
        this.skewY = skewY
    }

    asString() : string {
        return `skewY(${this.skewY})`
    }
}

export class transformList implements stringifiable {
    readonly transforms : transform[]

    constructor(...transforms : transform[]) {
        this.transforms = transforms;
    }

    asString() : string {
        return this.transforms.map( o => o.asString() ).join(" ");
    }
}



export type paint = string




export interface INode {
    readonly domNode : Element
    prop( name : string, value? : string ) : string
}
export interface IShape extends INode {}