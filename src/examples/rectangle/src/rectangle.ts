import { bounds, transformList, translate, rotate } from "../../../svgkit/Types";
import { SkSvg, SkRect, SkG, S_SkSvg } from "../../../svgkit/SvgKit";

export function startRectangle(element : Element) {
    console.log("launch rectangle");
    // ---------------------
    var svg = SkSvg.create(element);
    svg.bounds  = new bounds( 1, 1, "12cm", "4cm" )
    svg.viewBox = new bounds( 0, 0, 1200, 400 )
 
    svg.addChild( SkRect.create( o => {
        o.bounds = new bounds( 1, 1, 1198, 398)
        o.fill = "none"
        o.stroke = "blue"
        o.strokeWidth = 2;
    }) )
    svg.addChild( SkRect.create( o => {
        o.bounds = new bounds( 400, 100, 400, 200)
        o.fill = "yellow"
        o.stroke = "navy"
        o.strokeWidth = 10
    }) ) 
    
    var svg = SkSvg.create(element);
    svg.bounds  = new bounds( 1, 1, "12cm", "4cm" )
    svg.viewBox = new bounds( 0, 0, 1200, 400 )
    svg.addChild( SkRect.create( (o) => {
        o.bounds = new bounds( 1, 1, 1198, 398)
        o.fill = "none"
        o.stroke = "blue"
        o.strokeWidth = 2
    }) )

    svg.addChild( SkRect.create( o => {
        o.bounds = new bounds( 100, 100, 400, 200)
        o.fill = "green"
        o.rx = 50
    }) )

    svg.addChild( SkG.create( (o) => {
        o.transform = new transformList( new translate(700,200), new rotate(-30) )
        o.addChild( SkRect.create( o => {
            o.bounds = new bounds( 0, 0, 400, 200 );
            o.rx = 50
            o.fill = "none"
            o.stroke = "purple"
            o.strokeWidth = 30;
        }) )
    }) )

    element.appendChild( document.createElement("br") )

    // ---------------------
    var data : S_SkSvg
    data = {
        type : "svg",
        bounds : { type : "bounds", x : 1, y : 1, width : "12cm", height : "4cm" },
        viewBox : { type: "bounds", x : 0, y : 0, width : 1200, height : 400 },
        children : [
            { 
                type : "rect",
                bounds : { type : "bounds", x : 1, y : 1, width : 1198, height : 398 },
                fill : "none",
                stroke : "blue",
                strokeWidth : 2
            },
            {
                type : "rect",
                bounds : { type : "bounds", x : 400, y : 100, width : 400, height : 200 },
                fill : "yellow",
                stroke : "navy",
                strokeWidth : 10
            }
        ]
    }
    SkSvg.from(data, element);

    data = {
        type : "svg",
        bounds : { type : "bounds", x : 1, y : 1, width : "12cm", height : "4cm" },
        viewBox : { type: "bounds", x : 0, y : 0, width : 1200, height : 400 },
        children : [
            { 
                type : "rect",
                bounds : { type : "bounds", x : 1, y : 1, width : 1198, height : 398 },
                fill : "none",
                stroke : "blue",
                strokeWidth : 2
            },
            {
                type : "rect",
                bounds : { type : "bounds", x : 100, y : 100, width : 400, height : 200 },
                fill : "green",
                rx : 50
            }
        ]
    }
    SkSvg.from(data, element);
}