/* eslint-disable @typescript-eslint/no-unused-vars */
import Drawable from '../Drawable.js';

export default class ActionItem extends Drawable {
  /**
   * An ActionItem constructor
   *
   * @param startX start position X of an ActionItem
   * @param startY start position Y of an ActionItem
   */
  public constructor(startX: number, startY: number) {
    super();
  }

  /**
   * Updates an ActionItem.
   *
   * @param elapsed elapsed number
   * @param speed speed of an ActionItem
   */
  public update(elapsed: number, speed: number): void {
    this.posY += elapsed * speed;
  }
}
