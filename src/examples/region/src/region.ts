import { SkSvg } from "../../../svgkit/SvgKit";
import { bounds } from "../../../svgkit/Types";
import { ExtSkRegion } from "../../../svgkit/ExtSvgKit";
import { background, backgroundFill, cornerRadii, insets } from "../../../svgkit/ExtTypes";

export function startRegion(element : Element) {
    console.log("launch region");

    var svg = SkSvg.create(element);
    svg.bounds  = new bounds( 1, 1, "12cm", "4cm" )
    svg.viewBox = new bounds( 0, 0, 1200, 400 )

    svg.addChild(ExtSkRegion.create( r => {
        r.bounds = { x: 30, y: 30, width: 200, height: 200 }
        r.background = { fills : [
                {
                    corderRadii : cornerRadii.of(20,20,20,20),
                    insets : new insets(0,0,0,0),
                    paint : "red"
                },
                {
                    corderRadii : cornerRadii.of(10,10,10,10),
                    insets : new insets(10,10,10,10),
                    paint : "white"
                }
        ] };
    }));
    
}