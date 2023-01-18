import * as PIXI from 'pixi.js';
import { gsap, Elastic, Linear, Sine, Bounce } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';


gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const app = new PIXI.Application({
    width: 800,
    height: 600,
    background: 0x999999
});

document.body.appendChild(app.view as HTMLCanvasElement);

const circle1 = createCircle(0, 0, 50);
const circle2 = createCircle(0, 0, 50);
const circle3 = createCircle(0, 0, 50);

gsap.set(circle1, { pixi: { x: 100, y: 100 } });
gsap.set(circle2, { pixi: { x: 100, y: 300 } });
gsap.set(circle3, { pixi: { x: 100, y: 500 } });

app.stage.addChild(circle1, circle2, circle3);

//firstC
gsap.to(circle1, { pixi: { x: 700, }, duration: 2, delay: 1 });
gsap.to(circle1.scale, { x: 1.5, y: 1.5, duration: 1, delay: 1 });
gsap.to(circle1.scale, { x: 1, y: 1, duration: 1, delay: 2 });

//SecondC
gsap.to(circle2, { pixi: { x: 700 }, duration: 2, delay: 1, ease: Linear.easeIn });
gsap.to(circle2.scale, { x: 1.5, y: 1.5, duration: 1, delay: 1, ease: Elastic.easeOut });
gsap.to(circle2.scale, { x: 1, y: 1, duration: 1, delay: 2, ease: Elastic.easeIn });

//ThirdC
gsap.to(circle3, { pixi: { x: 700 }, duration: 2, delay: 1, ease: Sine.easeInOut});
gsap.to(circle3.scale, { x: 1.5, y: 1.5, duration: 1, delay: 1, ease: Bounce.easeOut });
gsap.to(circle3.scale, { x: 1, y: 1, duration: 1, delay: 2, ease: Bounce.easeIn });



function createCircle(x: number, y: number, r: number) {
    const circle = new PIXI.Graphics();
    circle.beginFill(0x000000);
    circle.drawCircle(x, y, r);
    circle.endFill();
    return circle;
}