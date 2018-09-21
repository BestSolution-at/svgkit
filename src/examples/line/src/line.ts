import { SkSvg, SkRect, SkLine, SkG } from "../../../svgkit/SvgKit";
import { bounds, strokeLineCap } from "../../../svgkit/Types";

export function startLine(element : Element) {
    var svg = SkSvg.create(element);
    svg.bounds  = new bounds( 1, 1, "12cm", "4cm" )
    svg.viewBox = new bounds( 0, 0, 1200, 400 )
 
    svg.addChild( SkRect.create( o => {
        o.bounds = new bounds( 1, 1, 1198, 398)
        o.fill = "none"
        o.stroke = "blue"
        o.strokeWidth = 2;
    }) )
    svg.addChild( SkG.create( o => {
        o.stroke = "green"
        o.addChild( SkLine.create( o => {
            o.x1 = 100
            o.x2 = 300
            o.y1 = 300
            o.y2 = 100
            o.strokeWidth = 5
        }))
        o.addChild( SkLine.create( o => {
            o.x1 = 300
            o.x2 = 500
            o.y1 = 300
            o.y2 = 100;
            o.strokeWidth = 10
        }) )
        o.addChild( SkLine.create( o => {
            o.x1 = 500
            o.x2 = 700
            o.y1 = 300
            o.y2 = 100;
            o.strokeWidth = 15
        }) )
        o.addChild( SkLine.create( o => {
            o.x1 = 700
            o.x2 = 900
            o.y1 = 300
            o.y2 = 100;
            o.strokeWidth = 20
        }) )
        o.addChild( SkLine.create( o => {
            o.x1 = 900
            o.x2 = 1100
            o.y1 = 300
            o.y2 = 100;
            o.strokeWidth = 25
        }) )
    }) )

    element.appendChild( document.createElement("br") )

    svg = SkSvg.create(element);
    svg.bounds  = new bounds( 1, 1, "12cm", "4cm" )
    svg.viewBox = new bounds( 0, 0, 1200, 400 )
 
    svg.addChild( SkRect.create( o => {
        o.bounds = new bounds( 1, 1, 1198, 398)
        o.fill = "none"
        o.stroke = "blue"
        o.strokeWidth = 2;
    }) )
    svg.addChild( SkG.create( o => {
        o.stroke = "green"
        o.addChild( SkLine.create( o => {
            o.x1 = 100
            o.x2 = 1000
            o.y1 = 150
            o.y2 = 150
            o.strokeWidth = 20
            o.strokeLineCap = strokeLineCap.BUTT
        }))
        o.addChild( SkLine.create( o => {
            o.x1 = 100
            o.x2 = 1000
            o.y1 = 200
            o.y2 = 200
            o.strokeWidth = 20
            o.strokeLineCap = strokeLineCap.ROUND
        }) )
        o.addChild( SkLine.create( o => {
            o.x1 = 100
            o.x2 = 1000
            o.y1 = 250
            o.y2 = 250;
            o.strokeWidth = 20
            o.strokeLineCap = strokeLineCap.SQUARE
        }) )
    }) )
}