import { bounds } from "../../../svgkit/Types";
import { SkSvg, SkDesc, SkRect, SkCircle, S_SkSvg } from "../../../svgkit/SvgKit";

export function startCircle(element : Element) {
    console.log("Start circle sample");

    var svg = SkSvg.create(element);
    svg.bounds  = new bounds( 1, 1, "12cm", "4cm" )
    svg.viewBox = new bounds( 0, 0, 1200, 400 )

    svg.addChild( SkDesc.create( o => {
        o.text = "Example circle01 - circle filled with red and stroked with blue"
    }) )
    svg.addChild( SkRect.create( o => {
        o.x = 1
        o.y = 1
        o.width = 1198
        o.height = 398
        o.fill = "none"
        o.stroke = "blue"
        o.strokeWidth = 2
    }))
    svg.addChild( SkCircle.create( o => {
        o.cx = 600
        o.cy = 200
        o.r = 100
        o.fill = "red"
        o.stroke = "blue"
        o.strokeWidth = 10
    }) )

    element.appendChild( document.createElement("br") )

    // --------
    let data : S_SkSvg
    data = {
        type : "svg",
        bounds : { type : "bounds", x : 1, y : 1, width : "12cm", height : "4cm" },
        viewBox : { type : "bounds", x : 0, y : 0, width : 1200, height : 400 },
        children : [
            { type : "desc", text : "Example circle01 - circle filled with red and stroked with blue" },
            { type : "rect", x : 1, y : 1, width : 1198, height : 398, fill : "none", stroke : "blue", strokeWidth : 2 },
            { type : "circle", cx : 600, cy : 200, fill : "red", stroke : "blue", strokeWidth : 10 }
        ]
    }
}