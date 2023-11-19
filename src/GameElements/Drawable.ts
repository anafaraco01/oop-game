import CanvasUtil from '../CanvasUtil.js';

export default abstract class Drawable {
  protected image: HTMLImageElement;

  protected posX: number;

  protected posY: number;

  /**
   * Gets position X of Drawable
   *
   * @returns position X of Drawable
   */
  public getPosX(): number {
    return this.posX;
  }

  /**
   * Gets position Y of Drawable
   *
   * @returns position Y of Drawable
   */
  public getPosY(): number {
    return this.posY;
  }

  /**
   * Gets width of Drawable
   *
   * @returns width of Drawable
   */
  public getWidth(): number {
    return this.image.width;
  }

  /**
   * Gets height of Drawable
   *
   * @returns height of Drawable
   */
  public getHeight(): number {
    return this.image.height;
  }

  /**
   * Renders a Drawable
   *
   * @param canvas accepts HTMLCanvasElement
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasUtil.drawImage(canvas, this.image, this.posX, this.posY);
  }

  public abstract update(elapsed: number, speed: number): void;
}
