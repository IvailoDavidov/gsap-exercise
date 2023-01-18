import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';


gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const app = new PIXI.Application({
    width: 800,
    height: 600,
    background: 0x999999
});

document.body.appendChild(app.view as HTMLCanvasElement);

const square1 = createSquare(0, 0, 100, 100);
const square2 = createSquare(0, 0, 100, 100);
const square3 = createSquare(0, 0, 100, 100);
const square4 = createSquare(0, 0, 100, 100);

gsap.set(square1, { pixi: { x: 100, y: 300 } });
gsap.set(square2, { pixi: { x: 300, y: 300 } });
gsap.set(square3, { pixi: { x: 500, y: 300 } });
gsap.set(square4, { pixi: { x: 700, y: 300 } });

app.stage.addChild(square1, square2, square3, square4);

//animations
const square1Anim = gsap.to(square1, { pixi: { rotation: 360 }, duration: 1, paused: true });
const square2Anim = gsap.to(square2, { pixi: { blur: 10 }, duration: 1, paused: true });
const square3Anim = gsap.to(square3, { pixi: { skewX: 50 }, duration: 1, paused: true });
const square4Anim = gsap.to(square4, { pixi: { tint: 0xff0000 }, duration: 1, paused: true });

//addEvents
square1.interactive = true;
square2.interactive = true;
square3.interactive = true;
square4.interactive = true;

addEvent(square1, 'pointertap', square1Anim);
addEvent(square2, 'pointertap', square2Anim);
addEvent(square3, 'pointertap', square3Anim);
addEvent(square4, 'pointertap', square4Anim);



function addEvent(element: PIXI.Graphics, event: any, animaion: GSAPAnimation) {
    element.on(event, () => {
        if (animaion.paused()) {
            animaion.play();
        }else{
            animaion.reverse();         
        }
    })
}


function createSquare(x: number, y: number, w: number, h: number) {
    const square = new PIXI.Graphics();
    square.beginFill(0xfffffff);
    square.drawRect(x, y, w, h);
    square.pivot.set(w / 2, h / 2);
    square.endFill();
    return square;
}