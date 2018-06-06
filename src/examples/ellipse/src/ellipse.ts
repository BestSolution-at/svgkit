import { SkSvg, SkDesc, SkG } from "../../../svgkit/Base";
import { bounds, translate, rotate, transform, transformList } from "../../../svgkit/Types";
import { SkRect, SkEllipse } from "../../../svgkit/Shape";

export function startEllipse(element : Element) {
    console.log("start ellipse example")
    var svg = SkSvg.create(element);
    svg.bounds  = new bounds( 1, 1, "12cm", "4cm" )
    svg.viewBox = new bounds( 0, 0, 1200, 400 )

    svg.addChild( SkDesc.create( o => {
        o.text = "Example ellipse01 - examples of ellipses"
    }) )
    svg.addChild( SkRect.create( o => {
        o.x = 1
        o.y = 1;
        o.width = 1198
        o.height = 398
        o.fill = "none"
        o.stroke = "blue"
        o.strokeWidth = 2
    }) )
    svg.addChild( SkG.create( g => {
        g.transform = new transformList(new translate(300,200));
        g.addChild( SkEllipse.create( o => {
            o.rx = 250
            o.ry = 100
            o.fill = "red"
        }))
    }) )
    svg.addChild( SkEllipse.create( o => {
        o.rx = 250
        o.ry = 100
        o.fill = "none"
        o.stroke = "blue"
        o.strokeWidth = 20;
        o.transform = new transformList( new translate(900,200), new rotate(-20))
    } ) )
}