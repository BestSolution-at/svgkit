import { startRectangle } from "./rectangle/src/rectangle";
import { startCircle } from "./circle/src/circle";

let node = document.getElementById('svgkit-app');
let appMode = node!.getAttribute('data-app')
console.log("Detected application", appMode);

if( appMode == "rectangle" ) {
    startRectangle(node);
} else if( appMode == "circle" ) {
    startCircle(node);
}