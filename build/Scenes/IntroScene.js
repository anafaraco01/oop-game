import Scene from './Scene.js';
import MouseListener from '../Listeners/MouseListener.js';
import Mouse from '../GameElements/Mouse.js';
import CanvasUtil from '../CanvasUtil.js';
import Button from '../GameElements/Button.js';
import GameScene from './GameScene.js';
export default class IntroScene extends Scene {
    starting;
    isDisplayingInstructuions;
    isDisplayingCredits;
    ball;
    buttons = [];
    instructions;
    credits;
    backgroundImage;
    dutchTranslation;
    constructor(maxX, maxY) {
        super(maxX, maxY);
        this.mouse = new Mouse();
        this.starting = false;
        this.isDisplayingCredits = false;
        this.isDisplayingInstructuions = false;
        this.dutchTranslation = false;
        this.buttons.push(new Button('./assets/graphics/buttons/startButtonEn.png', 'Starts a game in English', this.maxX / 2, 550));
        this.buttons.push(new Button('./assets/graphics/buttons/instructionsButton.png', 'Displays instructions', this.maxX / 2, 650));
        this.buttons.push(new Button('./assets/graphics/buttons/creditsButton.png', 'Displays credits', this.maxX / 2, 750));
        this.buttons.push(new Button('./assets/graphics/buttons/startButtonNl.png', 'Starts a game in Dutch', this.maxX / 2 + 200, 550));
        this.buttons.push(new Button('./assets/graphics/buttons/backButton.png', 'Goes back to menu', this.maxX / 2 - 30, 780));
        this.buttons.push(new Button('./assets/graphics/buttons/backButton.png', 'Goes back to menu', this.maxX / 2 - 30, 790));
        this.backgroundImage = CanvasUtil.loadNewImage('./assets/graphics/backgrounds/bg.jpg');
        this.ball = CanvasUtil.loadNewImage('./assets/graphics/ball/ball.png');
        this.instructions = CanvasUtil.loadNewImage('./assets/graphics/backgrounds/instructions.png');
        this.credits = CanvasUtil.loadNewImage('./assets/graphics/backgrounds/credits.png');
    }
    processInput(keyListener, mouseListener) {
        this.mouse.processInput(mouseListener);
        if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
            if (this.mouse.collidesWithButton(this.buttons[0]) && !this.isDisplayingCredits && !this.isDisplayingInstructuions) {
                this.starting = true;
            }
            else if (this.mouse.collidesWithButton(this.buttons[1]) && !this.isDisplayingCredits) {
                this.isDisplayingInstructuions = true;
            }
            else if (this.mouse.collidesWithButton(this.buttons[2]) && !this.isDisplayingInstructuions) {
                this.isDisplayingCredits = true;
            }
            else if (this.mouse.collidesWithButton(this.buttons[3]) && !this.isDisplayingInstructuions && !this.isDisplayingCredits) {
                this.dutchTranslation = true;
                this.starting = true;
            }
            else if (this.mouse.collidesWithButton(this.buttons[4]) && this.isDisplayingInstructuions) {
                this.isDisplayingInstructuions = false;
            }
            else if (this.mouse.collidesWithButton(this.buttons[5]) && this.isDisplayingCredits) {
                this.isDisplayingCredits = false;
            }
        }
    }
    update(elapsed) {
        if (this.starting)
            return new GameScene(this.maxX, this.maxY, this.dutchTranslation);
        return null;
    }
    render(canvas) {
        CanvasUtil.clearCanvas(canvas);
        CanvasUtil.drawImage(canvas, this.backgroundImage, 0, 0);
        if (this.isDisplayingInstructuions) {
            CanvasUtil.drawImage(canvas, this.instructions, this.maxX / 2 - this.instructions.width / 2, this.maxY / 2 - this.instructions.height / 2);
            this.buttons[4].render(canvas);
        }
        else if (this.isDisplayingCredits) {
            CanvasUtil.drawImage(canvas, this.credits, this.maxX / 2 - this.credits.width / 2, this.maxY / 2 - this.credits.height / 2);
            this.buttons[5].render(canvas);
        }
        else {
            CanvasUtil.drawImage(canvas, this.ball, 300, 250);
            CanvasUtil.writeTextToCanvas(canvas, 'PROTECT YOUR', 1560, 300, 'right', 'Raleway', 80, 'white');
            CanvasUtil.writeTextToCanvas(canvas, 'IDENTITY', 1583, 450, 'right', 'Raleway', 140, 'white');
            this.buttons[0].render(canvas);
            this.buttons[1].render(canvas);
            this.buttons[2].render(canvas);
            this.buttons[3].render(canvas);
        }
        this.mouse.render(canvas);
    }
}
//# sourceMappingURL=IntroScene.js.map