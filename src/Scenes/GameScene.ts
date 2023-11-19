/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
import ActionItem from '../GameElements/ActionItems/ActionItem.js';
import BackgroundPath from '../GameElements/BackgroundPath.js';
import CanvasUtil from '../CanvasUtil.js';
import KeyListener from '../Listeners/KeyListener.js';
import Mouse from '../GameElements/Mouse.js';
import MouseListener from '../Listeners/MouseListener.js';
import Player from '../GameElements/Player.js';
import Scene from './Scene.js';
import Thief from '../GameElements/ActionItems/Thief.js';
import Message from '../GameElements/ActionItems/Message.js';
import Mail from '../GameElements/ActionItems/Mail.js';
import Hole from '../GameElements/ActionItems/Hole.js';
import EndScene from './EndScene.js';
import Button from '../GameElements/Button.js';
import Questions from '../GameElements/Questions.js';
import PowerUp from '../GameElements/ActionItems/AdditionalHeart.js';
import Locale from '../Locale.js';
import Snail from '../GameElements/ActionItems/Snail.js';

export default class GameScene extends Scene {
  private player: Player;

  private isPushingNewPath: boolean;

  private backgroundPaths: BackgroundPath[] = [];

  private actionItems: ActionItem[] = [];

  private lives: number;

  private score: number;

  private speed: number;

  private timeToNextItem: number;

  private timeToNextItemDiminished: number; // To make timeToNextItem smaller so that actionItems and paths go faster

  private timeOfSlowDown: number;

  private rootSpeed: number;

  private heartImage: HTMLImageElement;

  private timeToHigherSpeed: number; // Increase speed of actionItems and paths

  private isSlowingDown: boolean;

  private isJumping: boolean;

  private isSliding: boolean;

  private isGameOver: boolean;

  private isDisplayingDescription: boolean;

  private isTriggeringQuestion: boolean; // It takes one of the questions from Questions class

  private descriptionImage: HTMLImageElement;

  private descriptionImageNl: HTMLImageElement;

  private isDisplayingQuestion: boolean;

  private isDisplayingAnswerAndExplanation: boolean;

  private isPlayerAnswering: boolean;

  private isAnswerCorrect: boolean;

  private popupQuestionBackground: HTMLImageElement; // Background for questions

  private questions: Object[] = [];

  private dumpQuestions: Object[] = [];

  private currentQuestion: string;

  private answers: string[] = [];

  private correctAnswer: string;

  private explanation: string;

  private aButton: Button;

  private bButton: Button;

  private cButton: Button;

  private isFellIntoHole: boolean;

  private gameSounds: Map<string, HTMLAudioElement>;

  private isMovingLeft: boolean;

  private isMovingRight: boolean;

  private movePlayerTo: number; // Moves player to assigned X coordinate

  private isGamePaused: boolean;

  private backgroundNumber: number; // Determines which path background should be applied

  private scoreForBackground: number; // When should the background change based on the score

  private isDisplayingContinueTimeout: boolean; // Showing countdown (3,2,1)

  private continueTimeout: number; // Define the timeout

  private level: number;

  private dutchTranslation: boolean;

  private newPosYForBackground: number; // PosY based on the speed

  private initalNewPosYForBackground: number; // Intial posY when a new level is introduced

  private changingSongPerLevel: number; // Changes the name of the song pause and the song played

  /**
   * Constructor for GameScene
   *
   * @param maxX width of canvas
   * @param maxY height of canvas
   * @param dutchTranslation boolean responsible for Dutch translation
   */
  public constructor(maxX: number, maxY: number, dutchTranslation: boolean) {
    super(maxX, maxY);

    this.mouse = new Mouse();
    this.player = new Player(maxX, maxY);
    this.dutchTranslation = dutchTranslation;

    const random = Math.random();
    if (random <= 0.4) {
      this.actionItems.push(new Thief(maxX, 0));
    } else if (random <= 0.7) {
      this.actionItems.push(new Message(maxX, 0));
    } else {
      this.actionItems.push(new Mail(maxX, 0));
    }

    // Retrieving questions
    this.questions = Questions.questions;
    this.dumpQuestions = Questions.dumpQuestions;

    this.backgroundNumber = 1;
    this.backgroundPaths.push(new BackgroundPath(0, -10, this.backgroundNumber));
    this.backgroundPaths.push(new BackgroundPath(0, -this.maxY - 10, this.backgroundNumber));

    this.descriptionImage = CanvasUtil.loadNewImage('./assets/graphics/backgrounds/description.png');
    this.descriptionImageNl = CanvasUtil.loadNewImage('./assets/graphics/backgrounds/descriptionNl.png');
    this.heartImage = CanvasUtil.loadNewImage('./assets/graphics/miscellaneous/heart.png');
    this.popupQuestionBackground = CanvasUtil.loadNewImage('./assets/graphics/backgrounds/questionBackground.png');
    this.aButton = new Button('./assets/graphics/buttons/buttonA.png', 'A', this.maxX / 2 - 700, this.maxY / 2 - 270);
    this.bButton = new Button('./assets/graphics/buttons/buttonB.png', 'B', this.maxX / 2 - 700, this.maxY / 2 - 100);
    this.cButton = new Button('./assets/graphics/buttons/buttonC.png', 'C', this.maxX / 2 - 700, this.maxY / 2 + 70);

    this.lives = 3;
    this.score = 0;
    this.scoreForBackground = this.score;
    this.speed = 0.3;
    this.level = 1;

    this.isPushingNewPath = false;
    this.isJumping = false;
    this.isSliding = false;
    this.isGameOver = false;
    this.isDisplayingDescription = true;
    this.isDisplayingQuestion = false;
    this.isTriggeringQuestion = false;
    this.isDisplayingAnswerAndExplanation = false;
    this.isPlayerAnswering = false;
    this.isFellIntoHole = false;
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.isGamePaused = false;
    this.isDisplayingContinueTimeout = false;
    this.isSlowingDown = false;

    this.timeToHigherSpeed = 600 * 6;
    this.timeToNextItem = 1000;
    this.timeToNextItemDiminished = 0;
    this.continueTimeout = 1800;
    this.newPosYForBackground = -10;
    this.initalNewPosYForBackground = 0;
    this.timeOfSlowDown = 600 * 10;
    this.changingSongPerLevel = 1;

    this.gameSounds = new Map();
    this.gameSounds.set('jump', new Audio('./assets/sounds/jump.mp3'));
    this.gameSounds.set('hit', new Audio('./assets/sounds/chop.mp3'));
    this.gameSounds.set('gameMusic1', new Audio('./assets/sounds/gameMusic1.mp3'));
    this.gameSounds.set('gameMusic2', new Audio('./assets/sounds/gameMusic2.mp3'));
    this.gameSounds.set('gameMusic3', new Audio('./assets/sounds/gameMusic3.mp3'));
    this.gameSounds.set('gameMusic4', new Audio('./assets/sounds/gameMusic4.mp3'));
    this.gameSounds.set('gameMusic5', new Audio('./assets/sounds/gameMusic5.mp3'));
    this.gameSounds.set('correctAnswer', new Audio('./assets/sounds/correctAnswer.mp3'));
    this.gameSounds.set('wrongAnswer', new Audio('./assets/sounds/wrongAnswer.mp3'));
    this.gameSounds.get('gameMusic1').loop = true;
    this.gameSounds.get('gameMusic1').volume = 0.1;
    this.gameSounds.get('gameMusic1').play();
  }

  /**
   * Function which checks the correct answer and gives feedback
   *
   * @param button accept one of the buttons (A, B or C)s
   */
  public checkAnswer(button: Button): void {
    if (button.getButtonDescription() === this.correctAnswer) {
      this.isAnswerCorrect = true;
      this.gameSounds.get('correctAnswer').play();
    } else {
      this.isAnswerCorrect = false;
      this.gameSounds.get('wrongAnswer').play();
    }
    this.isDisplayingAnswerAndExplanation = true;
  }

  /**
   * Processes input of all elements in GameScene
   *
   * @param keyListener accepts KeyListener
   * @param mouseListener accepts MouseListener
   */
  public processInput(keyListener: KeyListener, mouseListener: MouseListener): void {
    // Process input of mouse when displaying question or description.
    if (this.isDisplayingQuestion || this.isDisplayingDescription) this.mouse.processInput(mouseListener);

    // Check when displaying description if ENTER is pressed in order to start a game.
    if (this.isDisplayingDescription) {
      if (keyListener.keyPressed(KeyListener.KEY_ENTER)) this.isDisplayingDescription = false;
    }

    // Detect buttons and enable them to be clicked during answering a question.
    if (this.isDisplayingQuestion && this.isPlayerAnswering && !this.isDisplayingAnswerAndExplanation) {
      if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        if (this.mouse.collidesWithButton(this.aButton)) this.checkAnswer(this.aButton);
        else if (this.mouse.collidesWithButton(this.bButton)) this.checkAnswer(this.bButton);
        else if (this.mouse.collidesWithButton(this.cButton)) this.checkAnswer(this.cButton);
      }
    }
    if (this.isDisplayingQuestion && this.isDisplayingAnswerAndExplanation) {
      if (keyListener.keyPressed(KeyListener.KEY_ENTER)) {
        this.isDisplayingContinueTimeout = true;
        this.isDisplayingAnswerAndExplanation = false;
        this.isDisplayingQuestion = false;
        this.isPlayerAnswering = false;
        this.isTriggeringQuestion = false;
        if (!this.isAnswerCorrect) this.lives -= 1;
        this.isJumping = false;
        this.isSliding = false;
      }
    }

    // Enable player control during appropiate part of the game.
    if (!this.isDisplayingDescription && !this.isGameOver && !this.isDisplayingQuestion) {
      if (keyListener.keyPressed(KeyListener.KEY_LEFT) && !this.isMovingRight) {
        this.isMovingLeft = true;
        this.isMovingRight = false;
      }
      if (keyListener.keyPressed(KeyListener.KEY_RIGHT) && !this.isMovingLeft) {
        this.isMovingLeft = false;
        this.isMovingRight = true;
      }
      if (keyListener.keyPressed(KeyListener.KEY_UP) && !this.isJumping) {
        this.player.jump();
        this.gameSounds.get('jump').play();
        this.isJumping = true;
      }
      if (keyListener.keyPressed(KeyListener.KEY_DOWN) && !this.isSliding) {
        this.player.slide();
        this.isSliding = true;
      }
    }

    // Pausing and continuing the game
    if (keyListener.keyPressed(KeyListener.KEY_P) && !this.isDisplayingQuestion) {
      this.isGamePaused = !this.isGamePaused;
      if (this.isGamePaused === false) this.isDisplayingContinueTimeout = true;
    }
  }

  /**
   * Updates all elements of GameScene
   *
   * @param elapsed elapsed number
   * @returns new Scene/nothing depending on game state
   */
  public update(elapsed: number): Scene {
    if (!this.isDisplayingDescription && !this.isGameOver && !this.isDisplayingQuestion && !this.isGamePaused && !this.isDisplayingContinueTimeout) {
      // Background scroll
      this.backgroundPaths = this.backgroundPaths.filter((backgroundPath: BackgroundPath) => {
        backgroundPath.update(elapsed, this.speed);
        if (backgroundPath.getPosY() > this.maxY) {
          this.isPushingNewPath = true;
          return false;
        }
        return true;
      });
      // Adds a new path for the new level when score reaches 45
      if (this.isPushingNewPath) {
        if (this.scoreForBackground >= 45) {
          this.gameSounds.get(`gameMusic${this.changingSongPerLevel}`).pause();
          this.changingSongPerLevel += 1;
          this.backgroundNumber += 1;
          this.level += 1;
          this.scoreForBackground = 0;
          this.initalNewPosYForBackground += 16;
          if (this.backgroundNumber >= 6) this.backgroundNumber = 1;
          if (this.changingSongPerLevel >= 6) this.changingSongPerLevel = 1;
          this.gameSounds.get(`gameMusic${this.changingSongPerLevel}`).play();
          this.gameSounds.get(`gameMusic${this.changingSongPerLevel}`).loop = true;
          this.gameSounds.get(`gameMusic${this.changingSongPerLevel}`).volume = 0.1;
        }
        this.backgroundPaths.push(new BackgroundPath(0, -this.maxY + this.newPosYForBackground + this.initalNewPosYForBackground, this.backgroundNumber));
        this.isPushingNewPath = false;
      }

      // Score increase during the game
      this.score += Math.round(elapsed) / 1500;
      this.scoreForBackground += Math.round(elapsed) / 1500;
      let onAddinglive = true;
      // Updating positions of actionItems and checking if they fulfill requirements to display a question/end the game/disappear.
      this.actionItems = this.actionItems.filter((item: ActionItem) => {
        item.update(elapsed, this.speed + 0.1);
        if (this.player.collideWithActionItem(item)) {
          if (item instanceof PowerUp) {
            if (onAddinglive) {
              this.lives += 1;
              onAddinglive = false;
            }
            return false;
          }
          if (item instanceof Snail) {
            this.rootSpeed = this.speed;
            this.isSlowingDown = true;
            this.speed -= 0.1;
            return false;
          }
          if (item instanceof Hole && !this.isJumping) {
            this.isGameOver = true;
            this.isFellIntoHole = true;
          }
          if (item instanceof Mail && this.isJumping) {
            return true;
          }
          if (item instanceof Message && this.isSliding) {
            return true;
          }
          if (item instanceof Hole && this.isJumping) {
            return true;
          }
          this.isTriggeringQuestion = true;
          this.isDisplayingQuestion = true;
          this.isPlayerAnswering = true;
          this.gameSounds.get('hit').play();
          return false;
        }
        if (item.getPosY() > this.maxY) return false;
        return true;
      });
      onAddinglive = true;

      // Applying slow down when player has touched snail
      if (this.isSlowingDown) {
        this.timeOfSlowDown -= elapsed;
        if (this.timeOfSlowDown <= 0) {
          this.speed = this.rootSpeed;
          this.isSlowingDown = false;
          this.timeOfSlowDown = 1000 * 10;
        }
      }

      // Decreasing times of next item appear or of higher speed during the game.
      this.timeToNextItem -= elapsed;
      this.timeToHigherSpeed -= elapsed;

      // Player move
      if (this.isMovingLeft) {
        if (this.player.getPosX() === this.player.getPosXinitial()) this.movePlayerTo = this.player.getPosXinitial() - 400;
        else if (this.player.getPosX() === this.player.getPosXinitial() + 400) this.movePlayerTo = this.player.getPosXinitial();
        if (!this.player.move(elapsed, 1, this.movePlayerTo)) {
          this.isMovingLeft = false;
          this.isMovingRight = false;
        }
      }
      if (this.isMovingRight) {
        if (this.player.getPosX() === this.player.getPosXinitial() - 400) this.movePlayerTo = this.player.getPosXinitial();
        else if (this.player.getPosX() === this.player.getPosXinitial()) this.movePlayerTo = this.player.getPosXinitial() + 400;
        if (!this.player.move(elapsed, 2, this.movePlayerTo)) {
          this.isMovingLeft = false;
          this.isMovingRight = false;
        }
      }

      // Generating new actionItem.
      if (this.timeToNextItem <= 0) {
        const random = Math.random();
        if (random <= 0.01) {
          this.actionItems.push(new PowerUp(this.maxX, 0));
        }
        else if (random <= 0.02) {
          this.actionItems.push(new Snail(this.maxX, 0));
        } else if (random <= 0.4) {
          this.actionItems.push(new Thief(this.maxX, 0));
        } else if (random <= 0.7) {
          this.actionItems.push(new Mail(this.maxX, 0));
        } else if (random <= 0.95) {
          this.actionItems.push(new Message(this.maxX, 0));
        } else {
          this.actionItems.push(new Hole(this.maxX, 0));
        }
        this.timeToNextItem = 1000 - this.timeToNextItemDiminished;
      }

      // Speed increase.
      if (this.timeToHigherSpeed <= 0) {
        this.speed += 0.01;
        this.newPosYForBackground = this.speed * elapsed;
        this.timeToHigherSpeed = 600 * 10;
        if (this.timeToNextItemDiminished <= 500) this.timeToNextItemDiminished += 35;
      }

      // Check if isJumping or isSliding should be disabled.
      if (this.player.update(elapsed) === false && this.isJumping === true) this.isJumping = false;
      if (this.player.update(elapsed) === false && this.isSliding === true) this.isSliding = false;

      // Check if it is time for game over.
      if (this.lives <= 0) this.isGameOver = true;
      if (this.isGameOver) {
        this.gameSounds.get(`gameMusic${this.changingSongPerLevel}`).pause();
        this.gameSounds.get(`gameMusic${this.changingSongPerLevel}`).currentTime = 0;
        return new EndScene(this.maxX, this.maxY, this.score, this.isFellIntoHole, this.dutchTranslation);
      }
    }
    // Display a question when the player has touched actionItem.
    else if (this.isDisplayingQuestion) {
      // Trigger a question when the player has just touched actionItem.
      if (this.isTriggeringQuestion) {
        const randomNumber = Math.floor(Math.random() * (this.questions.length - 1));
        this.currentQuestion = Object.values(this.questions[randomNumber])[0];
        if (Object.values(this.questions[randomNumber])[1] === null || Object.values(this.questions[randomNumber])[1] === undefined) this.answers = Array(Object.values(this.questions[randomNumber])[1]);
        else this.answers = Array(...Object.values(this.questions[randomNumber])[1]);
        this.correctAnswer = Object.values(this.questions[randomNumber])[2];
        this.explanation = Object.values(this.questions[randomNumber])[3];
        this.isPlayerAnswering = true;
        this.isDisplayingAnswerAndExplanation = false;
        this.isTriggeringQuestion = false;
        this.dumpQuestions.push(this.questions.splice(randomNumber, 1));
        if (this.questions.length <= 0) {
          this.dumpQuestions.forEach((dumpQuestion: Object) => { this.questions.push(...Object.values(dumpQuestion)); });
          this.dumpQuestions = [];
        }
      }
    }
    if (this.isDisplayingContinueTimeout && this.lives <= 0) {
      this.isDisplayingAnswerAndExplanation = false;
      this.gameSounds.get(`gameMusic${this.changingSongPerLevel}`).pause();
      this.gameSounds.get(`gameMusic${this.changingSongPerLevel}`).currentTime = 0;
      return new EndScene(this.maxX, this.maxY, this.score, this.isFellIntoHole, this.dutchTranslation);
    }
    if (this.isDisplayingContinueTimeout) {
      this.continueTimeout -= Number(elapsed);
      if (this.continueTimeout <= 0) {
        this.isDisplayingContinueTimeout = false;
        this.continueTimeout = 1800;
        this.gameSounds.get(`gameMusic${this.changingSongPerLevel}`).play();
      }
    }

    // Pause music
    if (this.isGamePaused) this.gameSounds.get(`gameMusic${this.changingSongPerLevel}`).pause();
    return null;
  }

  /**
   * Renders all elements of GameScene
   *
   * @param canvas accepts HTMLCanvasElement
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasUtil.clearCanvas(canvas);

    // Locale class for translation
    let locale = new Locale('en-US');
    if (this.dutchTranslation) locale = new Locale('nl');

    // Background paths
    this.backgroundPaths.forEach((backgroundPath: BackgroundPath) => { backgroundPath.render(canvas); });

    // actionItems except for Message
    this.actionItems.forEach((item: ActionItem) => {
      if (!(item instanceof Message)) item.render(canvas);
    });

    // Lives, score and level
    CanvasUtil.writeTextToCanvas(canvas, locale.trans('LIVES:'), 10, 35, 'left', 'Fredoka One', 30, 'white');
    for (let i = 1; i <= this.lives; i++) {
      CanvasUtil.drawImage(canvas, this.heartImage, 75 + 35 * i, 13);
    }
    CanvasUtil.writeTextToCanvas(canvas, `SCORE: ${Math.floor(this.score)}`, 10, 75, 'left', 'Fredoka One', 30, 'white');
    CanvasUtil.writeTextToCanvas(canvas, `${locale.trans('LEVEL')}: ${this.level}`, 10, 115, 'left', 'Fredoka One', 30, 'white');

    // Player
    this.player.render(canvas);

    // actionItem - Message
    this.actionItems.forEach((item: ActionItem) => {
      if (item instanceof Message) item.render(canvas);
    });

    // Description
    if (this.isDisplayingDescription && this.dutchTranslation) CanvasUtil.drawImage(canvas, this.descriptionImageNl, this.maxX / 2 - this.descriptionImage.width / 2, this.maxY / 2 - this.descriptionImage.height / 2);
    if (this.isDisplayingDescription && !this.dutchTranslation) CanvasUtil.drawImage(canvas, this.descriptionImage, this.maxX / 2 - this.descriptionImage.width / 2, this.maxY / 2 - this.descriptionImage.height / 2);
    if (this.isGamePaused) CanvasUtil.writeText(canvas, 'GAME PAUSED', this.maxX / 2 - 262, this.maxY / 2, 'left', 'Raleway', 70, 'white');

    // Question
    if (this.isDisplayingQuestion) {
      CanvasUtil.drawImage(canvas, this.popupQuestionBackground, this.maxX / 2 - this.popupQuestionBackground.width / 2, this.maxY / 2 - this.popupQuestionBackground.height / 2);
      CanvasUtil.writeText(canvas, locale.trans('Click with mouse to select the right answer'), this.maxX / 2 - 700, this.maxY / 2 - 390, 'left', 'Pragati Narrow', 30, 'white');
      CanvasUtil.writeText(canvas, locale.trans(this.currentQuestion), this.maxX / 2 - 700, this.maxY / 2 - 320, 'left', 'Pragati Narrow', 30, 'black');
      this.aButton.render(canvas);
      CanvasUtil.writeText(canvas, locale.trans(this.answers[0]), this.maxX / 2 - 500, this.maxY / 2 - 190, 'left', 'Pragati Narrow', 30, 'black');
      this.bButton.render(canvas);
      CanvasUtil.writeText(canvas, locale.trans(this.answers[1]), this.maxX / 2 - 500, this.maxY / 2 - 20, 'left', 'Pragati Narrow', 30, 'black');
      this.cButton.render(canvas);
      CanvasUtil.writeText(canvas, locale.trans(this.answers[2]), this.maxX / 2 - 500, this.maxY / 2 + 150, 'left', 'Pragati Narrow', 30, 'black');
      if (this.isDisplayingAnswerAndExplanation) {
        if (this.isAnswerCorrect) CanvasUtil.writeText(canvas, locale.trans('CORRECT ANSWER'), this.maxX / 2 - 700, this.maxY / 2 + 270, 'left', 'Pragati Narrow', 30, 'green');
        else {
          CanvasUtil.writeText(canvas, locale.trans('WRONG ANSWER'), this.maxX / 2 - 700, this.maxY / 2 + 270, 'left', 'Pragati Narrow', 30, 'red');
          CanvasUtil.writeText(canvas, `(${locale.trans('Correct answer')}: ${this.correctAnswer})`, this.maxX / 2 - 425, this.maxY / 2 + 270, 'left', 'Pragati Narrow', 30, 'black');
        }
        CanvasUtil.writeText(canvas, `${locale.trans('Explanation')}: ${locale.trans(this.explanation)}`, this.maxX / 2 - 700, this.maxY / 2 + 340, 'left', 'Pragati Narrow', 30, 'black');
        CanvasUtil.writeText(canvas, locale.trans('Press'), this.maxX / 2 - 700, this.maxY / 2 + 410, 'left', 'Pragati Narrow', 30, 'black');
        CanvasUtil.writeText(canvas, 'ENTER', this.maxX / 2 - 625, this.maxY / 2 + 410, 'left', 'Pragati Narrow', 30, 'red');
        CanvasUtil.writeText(canvas, locale.trans('to continue'), this.maxX / 2 - 540, this.maxY / 2 + 410, 'left', 'Pragati Narrow', 30, 'black');
      }
      this.mouse.render(canvas);
    }

    if (this.isDisplayingContinueTimeout) CanvasUtil.writeText(canvas, `${Math.ceil(Math.round(this.continueTimeout) / 600)}`, this.maxX / 2, this.maxY / 2, 'center', 'Fredoka One', 196, 'white');
  }
}
