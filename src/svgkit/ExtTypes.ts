import { paint, length, stringifiable, strokeLinejoin } from "./Types";

export class insets {
    readonly top : number
    readonly right : number
    readonly bottom: number
    readonly left : number

    constructor( top : number, right : number, bottom : number, left : number ) {
        this.top = top
        this.right = right
        this.bottom = bottom
        this.left = left
    }
}

export class cornerRadii {
    readonly topLeftHorizontalRadius : number
    readonly topLeftVerticalRadius : number

    readonly topRightVerticalRadius : number
    readonly topRightHorizontalRadius : number

    readonly bottomRightHorizontalRadius : number
    readonly bottomRightVerticalRadius : number

    readonly bottomLeftVerticalRadius : number
    readonly bottomLeftHorizontalRadius : number

    constructor(topLeftHorizontalRadius : number, topLeftVerticalRadius : number,
                topRightVerticalRadius : number, topRightHorizontalRadius : number,
                bottomRightHorizontalRadius : number, bottomRightVerticalRadius : number,
                bottomLeftVerticalRadius : number, bottomLeftHorizontalRadius : number) {
        this.topLeftHorizontalRadius = topLeftHorizontalRadius
        this.topLeftVerticalRadius = topLeftVerticalRadius
        this.topRightVerticalRadius = topRightVerticalRadius
        this.topRightHorizontalRadius = topRightHorizontalRadius
        this.bottomRightHorizontalRadius = bottomRightHorizontalRadius
        this.bottomRightVerticalRadius = bottomRightVerticalRadius
        this.bottomLeftVerticalRadius = bottomLeftVerticalRadius
        this.bottomLeftHorizontalRadius = bottomLeftHorizontalRadius
    }

    static of( topLeft : number, topRight : number, bottomRight : number, bottomLeft : number ) : cornerRadii {
        return { 
            topLeftHorizontalRadius: topLeft, topLeftVerticalRadius: topLeft,  
            topRightVerticalRadius: topRight, topRightHorizontalRadius: topRight,
            bottomRightHorizontalRadius: bottomRight, bottomRightVerticalRadius: bottomRight,
            bottomLeftVerticalRadius: bottomLeft, bottomLeftHorizontalRadius: bottomLeft
        }
    }
}

export class background {
    readonly fills : backgroundFill[]

    constructor( fills : backgroundFill[] ) {
        this.fills = fills
    }
}

export class backgroundFill {
    readonly paint : paint
    readonly insets : insets
    readonly corderRadii : cornerRadii

    constructor(paint : paint, corderRadii : cornerRadii) {
        this.paint = paint
        this.corderRadii = corderRadii
    }
}

export class border {
    readonly borderStrokes : borderStroke[];

    constructor(borderStrokes : borderStroke[]) {
        this.borderStrokes = borderStrokes;
    }
}

export class borderStroke {
    readonly topStroke : paint;
    readonly rightStroke : paint;
    readonly bottomStroke : paint;
    readonly leftStroke : paint;


}

export class borderStrokeStyle {
    readonly type : strokeType;
    readonly strokeLinejoin : strokeLinejoin;
}

export enum strokeType {
    INSIDE, OUTSIDE, CENTERED
}