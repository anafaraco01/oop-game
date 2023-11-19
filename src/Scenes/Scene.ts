import KeyListener from '../Listeners/KeyListener.js';
import Mouse from '../GameElements/Mouse.js';
import MouseListener from '../Listeners/MouseListener.js';

export default abstract class Scene {
  protected maxX: number;

  protected maxY: number;

  protected mouse: Mouse;

  /**
   * Constructor for Scene
   *
   * @param maxX width of Scene
   * @param maxY height of Scene
   */
  public constructor(maxX: number, maxY: number) {
    this.maxX = maxX;
    this.maxY = maxY;
  }

  public abstract processInput(keyListener: KeyListener, mouseListener: MouseListener): void;

  public abstract update(elapsed: number): Scene;

  public abstract render(canvas: HTMLCanvasElement): void;
}
