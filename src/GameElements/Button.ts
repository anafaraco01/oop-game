/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
import CanvasUtil from '../CanvasUtil.js';
import Drawable from './Drawable.js';

export default class Button extends Drawable {
  private buttonDescription: string;

  /**
   * Constructor for button
   *
   * @param imageUrl image URL
   * @param buttonDescription description of the button
   * @param posX position X of the button
   * @param posY position X of the button
   */
  public constructor(imageUrl: string, buttonDescription: string, posX: number, posY: number) {
    super();
    this.buttonDescription = buttonDescription;
    this.image = CanvasUtil.loadNewImage(imageUrl);
    this.posX = posX;
    this.posY = posY;
  }

  /**
   * Getter for buttonDescription
   *
   * @returns button description
   */
  public getButtonDescription(): string {
    return this.buttonDescription;
  }

  /**
   * Update function for button
   *
   * @param elapsed elapsed number
   * @param speed speed of the button
   */
  public update(elapsed: number, speed: number): void {
  }
}
