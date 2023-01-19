import * as PIXI from 'pixi.js';
import { gsap, Power2 } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';


gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const app = new PIXI.Application({
    width: 800,
    height: 600,
    background: 0x000000
});

document.body.appendChild(app.view as HTMLCanvasElement);


//background
const background = new PIXI.Graphics();
background.beginFill(0x000000);
background.drawRect(0, 0, 800, 600);
background.endFill();
app.stage.addChild(background);

background.interactive = true;
background.on('pointertap', ({ globalX: x, globalY: y }) => {
    const fireworks = firework(x, y, ((Math.random() * 256 | 0) << 16) + ((Math.random() * 256 | 0) << 8) + (Math.random() * 256 | 0));
    app.stage.addChild(fireworks);
})

// Test
// const container = new PIXI.Container();
// const placeholder = particle(0xffffff, container);
// app.stage.addChild(container);


//fireworks Test
//const fireworks = firework(400, 300, 0xffffff);
//app.stage.addChild(fireworks);

function particle(color: number, parent: PIXI.Container) {

    //create square
    const square = new PIXI.Graphics();
    square.beginFill(color);
    square.drawRect(0, 0, 4, 4);
    square.pivot.set(square.width / 2, square.height / 2);
    square.endFill();

    //animation
    gsap.fromTo(square, { pixi: { scale: 0 } }, { pixi: { x: 'random(-100,100)', y: 'random(-100,100)', rotation: 1440, scale: 2, blur: 1 }, duration: 2 });
    gsap.to(square, { pixi: { tint: color }, duration: 1 });
    gsap.to(square, { pixi: { tint: 0 }, duration: 1, delay: 1 });

    parent.addChild(square);
}


function firework(x: number, y: number, color: number) {
    const container = new PIXI.Container();
    container.position.set(x, y);

    for (let i = 0; i < 100; i++) {
        particle(color, container);
    }

    gsap.to(container, { pixi: { y: '+=100', }, duration: 2, ease: Power2.easeIn, onComplete: () => { container.destroy() } })
    return container;
}