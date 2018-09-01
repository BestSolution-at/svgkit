import { SkSvg, SkRect } from "../../svgkit/SvgKit";
import { bounds } from "../../svgkit/Types";
import { ExtSkRoundRect } from "../../svgkit/ExtSvgKit";
import { cornerRadii } from "../../svgkit/ExtTypes";

export function startRoundRectangle(element : Element) {
    console.log("launch rectangle");

    var svg = SkSvg.create(element);
    svg.bounds  = new bounds( 1, 1, "12cm", "4cm" )
    svg.viewBox = new bounds( 0, 0, 1200, 400 )

    svg.addChild( SkRect.create( o => {
        o.bounds = new bounds( 1, 1, 1198, 398)
        o.fill = "none"
        o.stroke = "blue"
        o.strokeWidth = 2;
    }) )

    svg.addChild( ExtSkRoundRect.create( o => {
        o.cornerRadii = cornerRadii.of( 30, 30, 0, 0 );
        o.x = 10;
        o.y = 10;
        o.width = 350;
        o.height = 350;
        o.fill = "red";
    }) );
}