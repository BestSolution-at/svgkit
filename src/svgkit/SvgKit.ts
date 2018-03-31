import { SkRect, SkCircle } from "./Shape";
import { SkNode, createSvgNode } from "./Base";

export function createSkNode( name : "rect" ) : SkRect;
export function createSkNode( name : "circle" ) : SkCircle;

export function createSkNode( name : string) : SkNode {
    switch(name) {
        case "rect"     : return new SkRect(createSvgNode("rect"))
        case "circle"   : return new SkCircle(createSvgNode("circle"))
    }

    console.log("Unknown type '",name,"'");
    return null;
}