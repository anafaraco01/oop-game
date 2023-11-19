/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsdoc/require-param-description */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
import Button from './Button.js';
import CanvasUtil from '../CanvasUtil.js';
import MouseListener from '../Listeners/MouseListener.js';
import Drawable from './Drawable.js';

export default class Mouse extends Drawable {
  /**
   * Constructor for mouse
   */
  public constructor() {
    super();
    this.image = CanvasUtil.loadNewImage('./assets/graphics/miscellaneous/mouse.png');
  }

  /**
   * Processes input of Mouse
   *
   * @param mouseListener accepts MouseListener object
   */
  public processInput(mouseListener: MouseListener): void {
    this.posX = mouseListener.getMousePosition().x + mouseListener.getMousePosition().x * ((window.outerWidth - 10) / window.innerWidth) * 100 / 350;
    this.posY = mouseListener.getMousePosition().y + mouseListener.getMousePosition().y * ((window.outerWidth - 10) / window.innerWidth) * 100 / 250;
  }

  /**
   * Function which checks if mouse collides with one of buttons
   *
   * @param button accepts one button
   * @returns true/false depending on the collision with one of buttons.
   */
  public collidesWithButton(button: Button): boolean {
    if (this.posX > button.getPosX() && this.posX < button.getPosX() + button.getWidth()
        && this.posY > button.getPosY() && this.posY < button.getPosY() + button.getHeight()) return true;
    return false;
  }

  /**
   *
   * @param elapsed
   * @param speed
   */
  public update(elapsed: number, speed: number): void {
  }
}
