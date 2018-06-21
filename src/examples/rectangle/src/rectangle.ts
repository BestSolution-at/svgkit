import { bounds, transformList, translate, rotate } from "../../../svgkit/Types";
import { SkSvg, SkRect, SkG } from "../../../svgkit/SvgKit";

export function startRectangle(element : Element) {
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
}