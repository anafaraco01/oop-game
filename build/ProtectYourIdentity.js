import { Game } from './GameLoop.js';
import IntroScene from './Scenes/IntroScene.js';
import KeyListener from './Listeners/KeyListener.js';
import MouseListener from './Listeners/MouseListener.js';
export default class ProtectYourIdentity extends Game {
    canvas;
    keyListener;
    mouseListener;
    currentScene;
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.canvas.width = 1920;
        this.canvas.height = 1080;
        this.keyListener = new KeyListener();
        this.mouseListener = new MouseListener(this.canvas);
        this.currentScene = new IntroScene(this.canvas.width, this.canvas.height);
    }
    processInput() {
        this.currentScene.processInput(this.keyListener, this.mouseListener);
    }
    update(elapsed) {
        const nextScene = this.currentScene.update(elapsed);
        if (nextScene !== null)
            this.currentScene = nextScene;
        return true;
    }
    render() {
        this.currentScene.render(this.canvas);
    }
}
//# sourceMappingURL=ProtectYourIdentity.js.map