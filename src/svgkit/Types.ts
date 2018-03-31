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

export class transformList implements stringifiable {
    readonly transforms : transform[]

    constructor(...transforms : transform[]) {
        this.transforms = transforms;
    }

    asString() : string {
        return this.transforms.map( o => o.asString ).join(" ");
    }
}



export type paint = string




export interface INode {
    readonly domNode : Element
    prop( name : string, value? : string ) : string
}
export interface IShape extends INode {}