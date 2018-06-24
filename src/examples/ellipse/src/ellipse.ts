import { bounds, translate, rotate, transform, transformList } from "../../../svgkit/Types";
import { SkSvg, SkDesc, SkRect, SkG, SkEllipse, S_SkSvg } from "../../../svgkit/SvgKit";

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

    element.appendChild( document.createElement("br") )

    // ------------
    let data : S_SkSvg
    data = {
        type : "svg",
        bounds : { type : "bounds", x : 1, y : 1, width : "12cm", height : "4cm" },
        viewBox : { type : "bounds", x : 0, y : 0, width : 1200, height : 400 },
        children : [
            { type : "desc", text : "Example ellipse01 - examples of ellipses" },
            { type : "rect", x : 1, y : 1, width : 1198, height : 398, fill : "none", stroke : "blue", strokeWidth : 2 },
            { type : "g",
                transform : [
                    { type : "translate", x : 300, y : 200 }
                ],
                children : [
                    { type : "ellipse", rx : 250, ry : 100, fill : "red" },
                ]
            },
            { type : "ellipse", rx : 250, ry : 100, fill : "none", stroke : "blue", strokeWidth : 20,
                transform : [
                    { type : "translate", x : 900, y : 200},
                    { type : "rotate", angle : -20 }
                ]
            }
        ]
    }
    SkSvg.from(data,element)
}