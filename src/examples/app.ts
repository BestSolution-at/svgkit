import { startRectangle } from "./rectangle/src/rectangle";
import { startCircle } from "./circle/src/circle";
import { startEllipse } from "./ellipse/src/ellipse";
import { startRoundRectangle } from "./rounded-rect/round-rect";

let node = document.getElementById('svgkit-app');
let appMode = node!.getAttribute('data-app')
console.log("Detected application", appMode);

if( appMode == "rectangle" ) {
    startRectangle(node)
} else if( appMode == "circle" ) {
    startCircle(node)
} else if( appMode == "ellipse" ) {
    startEllipse(node)
} else if( appMode == "round-rectangle") {
    startRoundRectangle(node);
}