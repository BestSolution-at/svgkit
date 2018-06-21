import { bounds } from "../../../svgkit/Types";
import { SkSvg, SkDesc, SkRect, SkCircle } from "../../../svgkit/SvgKit";

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
}