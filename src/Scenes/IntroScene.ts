/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/brace-style */
import Scene from './Scene.js';
import KeyListener from '../Listeners/KeyListener.js';
import MouseListener from '../Listeners/MouseListener.js';
import Mouse from '../GameElements/Mouse.js';
import CanvasUtil from '../CanvasUtil.js';
import Button from '../GameElements/Button.js';
import GameScene from './GameScene.js';

export default class IntroScene extends Scene {
  private starting: boolean;

  private isDisplayingInstructuions: boolean;

  private isDisplayingCredits: boolean;

  private ball: HTMLImageElement;

  private buttons: Button[] = [];

  private instructions: HTMLImageElement;

  private credits: HTMLImageElement;

  private backgroundImage: HTMLImageElement;

  private dutchTranslation: boolean;

  /**
   * Constructor for IntroScene
   *
   * @param maxX width of canvas
   * @param maxY height of canvas
   */
  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.mouse = new Mouse();

    this.starting = false;
    this.isDisplayingCredits = false;
    this.isDisplayingInstructuions = false;
    this.dutchTranslation = false;

    this.buttons.push(new Button('./assets/graphics/buttons/startButtonEn.png', 'Starts a game in English', this.maxX / 2, 550)); // Index: 0
    this.buttons.push(new Button('./assets/graphics/buttons/instructionsButton.png', 'Displays instructions', this.maxX / 2, 650)); // Index: 1
    this.buttons.push(new Button('./assets/graphics/buttons/creditsButton.png', 'Displays credits', this.maxX / 2, 750)); // Index: 2
    this.buttons.push(new Button('./assets/graphics/buttons/startButtonNl.png', 'Starts a game in Dutch', this.maxX / 2 + 200, 550)); // Index: 3
    this.buttons.push(new Button('./assets/graphics/buttons/backButton.png', 'Goes back to menu', this.maxX / 2 - 30, 780)); // Index: 4
    this.buttons.push(new Button('./assets/graphics/buttons/backButton.png', 'Goes back to menu', this.maxX / 2 - 30, 790)); // Index: 5

    this.backgroundImage = CanvasUtil.loadNewImage('./assets/graphics/backgrounds/bg.jpg');
    this.ball = CanvasUtil.loadNewImage('./assets/graphics/ball/ball.png');
    this.instructions = CanvasUtil.loadNewImage('./assets/graphics/backgrounds/instructions.png');
    this.credits = CanvasUtil.loadNewImage('./assets/graphics/backgrounds/credits.png');
  }

  /**
   * Processes input of all elements in IntroScene
   *
   * @param keyListener accepts KeyListener
   * @param mouseListener accepts MouseListener
   */
  public processInput(keyListener: KeyListener, mouseListener: MouseListener): void {
    this.mouse.processInput(mouseListener);
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      if (this.mouse.collidesWithButton(this.buttons[0]) && !this.isDisplayingCredits && !this.isDisplayingInstructuions) { this.starting = true; } // Start a game
      else if (this.mouse.collidesWithButton(this.buttons[1]) && !this.isDisplayingCredits) { this.isDisplayingInstructuions = true; } // Display instructions
      else if (this.mouse.collidesWithButton(this.buttons[2]) && !this.isDisplayingInstructuions) { this.isDisplayingCredits = true; } // Display credits
      else if (this.mouse.collidesWithButton(this.buttons[3]) && !this.isDisplayingInstructuions && !this.isDisplayingCredits) {
        this.dutchTranslation = true;
        this.starting = true; // Start a game
      } else if (this.mouse.collidesWithButton(this.buttons[4]) && this.isDisplayingInstructuions) { this.isDisplayingInstructuions = false; } // Back button
      else if (this.mouse.collidesWithButton(this.buttons[5]) && this.isDisplayingCredits) { this.isDisplayingCredits = false; } // Back button
    }
  }

  /**
   * Updates all elements of IntroScene
   *
   * @param elapsed elapsed number
   * @returns new scene/nothing depending on game state
   */
  public update(elapsed: number): Scene {
    if (this.starting) return new GameScene(this.maxX, this.maxY, this.dutchTranslation);
    return null;
  }

  /**
   * Renders all elements of IntroScene
   *
   * @param canvas accepts HTMLCanvasElement
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasUtil.clearCanvas(canvas);
    CanvasUtil.drawImage(canvas, this.backgroundImage, 0, 0);

    // Instructions
    if (this.isDisplayingInstructuions) {
      CanvasUtil.drawImage(canvas, this.instructions, this.maxX / 2 - this.instructions.width / 2, this.maxY / 2 - this.instructions.height / 2);
      this.buttons[4].render(canvas);
    }
    // Credits
    else if (this.isDisplayingCredits) {
      CanvasUtil.drawImage(canvas, this.credits, this.maxX / 2 - this.credits.width / 2, this.maxY / 2 - this.credits.height / 2);
      this.buttons[5].render(canvas);
    }
    // Main menu
    else {
      CanvasUtil.drawImage(canvas, this.ball, 300, 250);
      CanvasUtil.writeTextToCanvas(canvas, 'PROTECT YOUR', 1560, 300, 'right', 'Raleway', 80, 'white');
      CanvasUtil.writeTextToCanvas(canvas, 'IDENTITY', 1583, 450, 'right', 'Raleway', 140, 'white');
      this.buttons[0].render(canvas);
      this.buttons[1].render(canvas);
      this.buttons[2].render(canvas);
      this.buttons[3].render(canvas);
    }

    // Mouse
    this.mouse.render(canvas);
  }
}
