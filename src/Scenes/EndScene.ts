/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import CanvasUtil from '../CanvasUtil.js';
import KeyListener from '../Listeners/KeyListener.js';
import MouseListener from '../Listeners/MouseListener.js';
import Scene from './Scene.js';
import Button from '../GameElements/Button.js';
import Mouse from '../GameElements/Mouse.js';
import GameScene from './GameScene.js';
import IntroScene from './IntroScene.js';
import Locale from '../Locale.js';

export default class EndScene extends Scene {
  private goToMenu: boolean;

  private playAgain: boolean;

  private tryAgainButton: Button;

  private menuButton: Button;

  private deadBall: HTMLImageElement;

  private finalScore: number;

  private typeOfGameOver: boolean; // Due to hole or no lives left

  private background: HTMLImageElement;

  private gameOverSound: HTMLAudioElement;

  private dutchTranslation: boolean;

  /**
   * Constructor for EndScene
   *
   * @param maxX width of canvas
   * @param maxY height of canvas
   * @param score score gained during GameScene
   * @param fellInHole condition checking if lose of game was caused by fellInHole
   * @param dutchTranslation boolean responsible for Dutch translation
   */
  public constructor(maxX: number, maxY: number, score: number, fellInHole: boolean, dutchTranslation: boolean) {
    super(maxX, maxY);
    this.goToMenu = false;
    this.playAgain = false;
    this.dutchTranslation = dutchTranslation;

    this.mouse = new Mouse();

    this.tryAgainButton = new Button('./assets/graphics/buttons/tryAgainButton.png', 'Repeat the game', maxX / 2 - 450, maxY - 250);
    this.menuButton = new Button('./assets/graphics/buttons/menuButton.png', 'Go back to the menu', maxX / 2 + 200, maxY - 250);
    this.deadBall = CanvasUtil.loadNewImage('./assets/graphics/ball/deadBall.png');
    this.background = CanvasUtil.loadNewImage('./assets/graphics/backgrounds/endScene_bg.jpg');

    this.finalScore = Math.floor(score);
    this.typeOfGameOver = fellInHole;

    this.gameOverSound = new Audio('./assets/sounds/gameOver.mp3');
    this.gameOverSound.play();
  }

  /**
   * Processes input for EndScene
   *
   * @param keyListener accepts KeyListener
   * @param mouseListener accepts MouseListener
   */
  public processInput(keyListener: KeyListener, mouseListener: MouseListener): void {
    this.mouse.processInput(mouseListener);
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      if (this.mouse.collidesWithButton(this.tryAgainButton)) {
        this.playAgain = true;
      }
      if (this.mouse.collidesWithButton(this.menuButton)) {
        this.goToMenu = true;
      }
    }
  }

  /**
   * Updates all elements of EndScene
   *
   * @param elapsed elapsed number
   * @returns new Scene or nothing depending on game state
   */
  public update(elapsed: number): Scene {
    if (this.playAgain) return new GameScene(this.maxX, this.maxY, this.dutchTranslation);
    if (this.goToMenu) return new IntroScene(this.maxX, this.maxY);
    return null;
  }

  /**
   * Renders all elements of EndScene
   *
   * @param canvas accepts HTMLCanvasElement
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasUtil.clearCanvas(canvas);

    // Locale class for translation
    let locale = new Locale('en-US');
    if (this.dutchTranslation) locale = new Locale('nl');

    CanvasUtil.drawImage(canvas, this.background, 0, 0);
    CanvasUtil.writeTextToCanvas(canvas, locale.trans('GAME OVER'), this.maxX / 2, 250, 'center', 'Raleway', 100, 'white');
    CanvasUtil.writeTextToCanvas(canvas, `${locale.trans('FINAL SCORE')}: ${this.finalScore}`, this.maxX / 2, 450, 'center', 'Raleway', 40, 'white');
    this.tryAgainButton.render(canvas);
    this.menuButton.render(canvas);
    CanvasUtil.drawImage(canvas, this.deadBall, this.maxX / 2 - this.deadBall.width / 2, this.maxY / 2);
    if (this.typeOfGameOver === true) {
      CanvasUtil.writeTextToCanvas(canvas, locale.trans('YOU FELL INTO A HOLE - YOUR IDENTITY HAS BEEN STOLEN'), this.maxX / 2, 350, 'center', 'Raleway', 50, 'white');
    } else {
      CanvasUtil.writeTextToCanvas(canvas, locale.trans('YOU HAVE NO LIVES LEFT - YOUR IDENTITY HAS BEEN STOLEN'), this.maxX / 2, 350, 'center', 'Raleway', 50, 'white');
    }

    this.mouse.render(canvas);
  }
}
