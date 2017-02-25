/// <reference path="../node_modules/@types/createjs/index.d.ts" />

import axios from 'axios';

export class Point {
    x: number;
    y: number;
}

var rects = [
    { x: 180, y: 20, w: 138, h: 182 },
    { x: 180 + 40 + 138, y: 20, w: 138, h: 182 },
    { x: 180 + 40 + 138 + 40 + 138, y: 20, w: 138, h: 182 },
    { x: 20 + 180 + 138 / 2, y: 20+ 182 + 20, w: 138, h: 182 },
    { x: 20 + 180 + 138 / 2 + 40 + 138, y: 20 + 182 + 20, w: 138, h: 182 },
];

export class CardShape extends createjs.Bitmap {
    offset: Point;
    origin: Point;
    constructor(parent: createjs.Stage, path: string) {
        super(path);
        this.offset = new Point();
        this.origin = new Point();
        this.on("mousedown", (e: createjs.MouseEvent) => {
            this.origin.x = e.currentTarget.x;
            this.origin.y = e.currentTarget.y;
            this.offset.x = e.stageX - e.target.x;
            this.offset.y = e.stageY - e.target.y;
            this.alpha = 0.7;
            this.scaleX = 1.2;
            this.scaleY = 1.2;
        });
        this.on("pressmove", (e: createjs.MouseEvent) => {
            e.currentTarget.x = e.stageX - this.offset.x;
            e.currentTarget.y = e.stageY - this.offset.y;
            parent.update();
        });
        this.on("pressup", (e: createjs.MouseEvent) => {
            const x = e.stageX;
            const y = e.stageY;
            // for(const [idx, rect] of rects.entries()) {
            for(var i = 0; i < 5; i++) {
                const rect = rects[i];
                if(rect.x <= x && x <= rect.x + rect.w &&
                   rect.y <= y && y <= rect.y + rect.h) {
                     e.currentTarget.x = rect.x;
                     e.currentTarget.y = rect.y;
                     axios.put("/action", { stage_id: i });
                }
            }
            this.alpha = 1;
            this.scaleX = 1;
            this.scaleY = 1;
        });
    }
}

export class Game {
}

// singleton
var game = new Game();

export class App {
    root: createjs.Stage;
    constructor(target: string) {
        this.root = new createjs.Stage(target);
        var c = <HTMLCanvasElement>this.root.canvas;
        c.width = 1024;
        c.height = 768;
    }
    drawField() {
        var waku = new createjs.Shape();
        waku.graphics.beginStroke("black");
        // forward
        waku.graphics.drawRect(180, 20, 138, 182);
        waku.graphics.drawRect(180 + 40 + 138, 20, 138, 182);
        waku.graphics.drawRect(180 + 40 + 138 + 40 + 138, 20, 138, 182);
        // back
        waku.graphics.drawRect(20 + 180 + 138 / 2, 20 + 182 + 20, 138, 182);
        waku.graphics.drawRect(20 + 180 + 138 / 2 + 40 + 138, 20 + 182 + 20, 138, 182);
        waku.graphics.endStroke();
        this.root.addChild(waku);
        this.root.update();
    }
    draw() {

        this.root.enableMouseOver(10);
        this.drawField();

        var s = new CardShape(this.root, "static/pp_se14_01.gif");
        this.root.addChild(s);
        this.root.update();

        // var bm = new createjs.Bitmap("http://68.media.tumblr.com/fb9f865f20444e7c7c2e721aff11db7a/tumblr_ohkzeoY1J61tm1dgio2_500.png");
        // var text = new createjs.Text("こんにちは", "900 48pt 'Noto Sans Japanese'", "#000000");
        var text = new createjs.Text("こんにちは", "900 48pt 'Rounded Mplus 1c'", "#b8b8b");
        var text2 = new createjs.Text("こんにちは", "900 48pt 'Rounded Mplus 1c'", "#efefef");
        // Rounded Mplus 1c
        text.alpha = text2.alpha = 0;
        text2.y = text.y = 100;
        text.outline = 3;
        this.root.addChild(text2);
        this.root.addChild(text);

        createjs.Tween.get(text)
            .to({ alpha: 1 }, 800, createjs.Ease.backInOut)
            .wait(2000)
            .to({ alpha: 0 }, 800, createjs.Ease.backInOut);
        createjs.Tween.get(text2)
            .to({ alpha: 1 }, 800, createjs.Ease.backInOut)
            .wait(2000)
            .to({ alpha: 0 }, 800, createjs.Ease.backInOut);

        this.root.update();

        createjs.Ticker.setFPS(30);
        createjs.Ticker.addEventListener("tick", this.root);
        createjs.Ticker.addEventListener("tick", (e: createjs.TickerEvent) => {
        });
    }
}

console.log("hello, world");
var app = new App("content");
app.draw();
console.log(axios.get("/ping"));
