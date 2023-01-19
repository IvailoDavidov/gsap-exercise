import * as PIXI from 'pixi.js';
import { gsap, Linear } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';


gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const app = new PIXI.Application({
    width: 800,
    height: 600,
    background: 0x999999
});

document.body.appendChild(app.view as HTMLCanvasElement);


let animationArrray: GSAPAnimation[] = [];

init();

async function init() {

    //TEXTURES
    const gear12Texture = await PIXI.Assets.load('assets/gear12.png') as PIXI.Texture;
    const gear16Texture = await PIXI.Assets.load('assets/gear16.png') as PIXI.Texture;
    const gear20Texture = await PIXI.Assets.load('assets/gear20.png') as PIXI.Texture;
    const gear24Texture = await PIXI.Assets.load('assets/gear24.png') as PIXI.Texture;
    const gear28Texture = await PIXI.Assets.load('assets/gear28.png') as PIXI.Texture;
    const gear40Texture = await PIXI.Assets.load('assets/gear40.png') as PIXI.Texture;

    const gearboxTexture = await PIXI.Assets.load('assets/gearbox.png') as PIXI.Texture;
    const speedPausedTexture = await PIXI.Assets.load('assets/speed-paused.png') as PIXI.Texture;
    const speedNormalTexture = await PIXI.Assets.load('assets/speed-normal.png') as PIXI.Texture;
    const speedFastTexture = await PIXI.Assets.load('assets/speed-fast.png') as PIXI.Texture;
    const speedFasterTexture = await PIXI.Assets.load('assets/speed-faster.png') as PIXI.Texture;

    //ANIMATED SPRITES
    const gear12Sprite = spawnGear('gear12', gear12Texture, 300, 117, -360, 6);
    const gear16Sprite = spawnGear('gear16', gear16Texture, 542, 471, -360, 8);
    const gear20Sprite = spawnGear('gear20', gear20Texture, 212, 441, -360, 10);
    const gear24Sprite = spawnGear('gear24', gear24Texture, 676, 388, 360, 12);
    const gear28Sprite = spawnGear('gear28', gear28Texture, 142, 130, 360, 14);
    const gear40Sprite = spawnGear('gear40', gear40Texture, 400, 300, 360, 20);

    //SPRITES
    const gearboxSprite = new PIXI.Sprite(gearboxTexture);
    const speedPauseSprite = new PIXI.Sprite(speedPausedTexture);
    const speedNormalSprite = new PIXI.Sprite(speedNormalTexture);
    const speedFastSprite = new PIXI.Sprite(speedFastTexture);
    const speedFasterSprite = new PIXI.Sprite(speedFasterTexture);

    //POSSITIONING
    gearboxSprite.position.set(320, 200);
    speedPauseSprite.position.set(330, 285);
    speedNormalSprite.position.set(365, 285);
    speedFastSprite.position.set(405, 285);
    speedFasterSprite.position.set(440, 285);

    speedPauseSprite.interactive = true;
    speedNormalSprite.interactive = true;
    speedFastSprite.interactive = true;
    speedFasterSprite.interactive = true;

    speedPauseSprite.on('pointertap', () => {
        pause(animationArrray);
    });

    speedNormalSprite.on('pointertap', () => {
        normal(animationArrray);
    })

    speedFastSprite.on('pointertap', () => {
        fast(animationArrray);
    })
    speedFasterSprite.on('pointertap', () => {
        faster(animationArrray);
    })

    app.stage.addChild(gear12Sprite, gear16Sprite, gear20Sprite, gear24Sprite, gear28Sprite, gear40Sprite,
        gearboxSprite, speedPauseSprite, speedNormalSprite, speedFastSprite, speedFasterSprite);
}

function spawnGear(id: string, texture: PIXI.Texture, x: number, y: number, rotation: number, duration: number) {
    const gearSprite = new PIXI.Sprite(texture);
    gearSprite.anchor.set(0.5, 0.5);
    gearSprite.position.set(x, y);
    const anim = gsap.to(gearSprite, { id: id, pixi: { rotation: rotation }, duration: duration, ease: Linear.easeIn });
    animationArrray.push(anim);

    return gearSprite;
}

function pause(arr: GSAPAnimation[]) {
    arr.forEach((anim) => {
        anim.pause();
    });
}

function normal(arr: GSAPAnimation[]) {
    arr.forEach((anim) => {
        anim.resume();
        anim.timeScale(1.0);
    });
}

function fast(arr: GSAPAnimation[]) {
    arr.forEach((anim) => {
        anim.resume();
        anim.timeScale(2.0);
    });
}  
               //id: string
function faster(arr: GSAPAnimation[]) {
    arr.forEach((anim) => {
        anim.resume();
        anim.timeScale(3.0);
    });
    // const animation = gsap.getById(id);
    // animation.timeScale(3.0);
}