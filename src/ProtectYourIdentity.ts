import { Game } from './GameLoop.js';
import IntroScene from './Scenes/IntroScene.js';

import KeyListener from './Listeners/KeyListener.js';
import MouseListener from './Listeners/MouseListener.js';
import Scene from './Scenes/Scene.js';

export default class ProtectYourIdentity extends Game {
  private canvas: HTMLCanvasElement;

  private keyListener: KeyListener;

  private mouseListener: MouseListener;

  private currentScene: Scene;

  /**
   * ProtectYourIdentity constructor
   *
   * @param canvas accepts HTMLCanvasElement
   */
  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.width = 1920;
    this.canvas.height = 1080;
    this.keyListener = new KeyListener();
    this.mouseListener = new MouseListener(this.canvas);
    this.currentScene = new IntroScene(this.canvas.width, this.canvas.height);
  }

  /**
   * Processes input from current scene.
   */
  public processInput(): void {
    this.currentScene.processInput(this.keyListener, this.mouseListener);
  }

  /**
   * Updates the current scene and checks if there is a new scene to switch to it.
   *
   * @param elapsed elapsed time
   * @returns true
   */
  public update(elapsed: number): boolean {
    const nextScene = this.currentScene.update(elapsed);
    if (nextScene !== null) this.currentScene = nextScene;
    return true;
  }

  /**
   * Renders a current scene
   */
  public render(): void {
    this.currentScene.render(this.canvas);
  }
}
