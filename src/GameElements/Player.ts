/* eslint-disable prefer-destructuring */
import Drawable from './Drawable.js';
import ActionItem from './ActionItems/ActionItem.js';
import CanvasUtil from '../CanvasUtil.js';

export default class Player extends Drawable {
  private images: HTMLImageElement[] = [];

  private posXinitial: number;

  private posYinitial: number;

  private acceleration: number;

  private timeToGoBackToTheGround: number;

  /**
   * Constructor for Player
   *
   * @param maxX width of the canvas
   * @param maxY height of the canvas
   */
  public constructor(maxX: number, maxY: number) {
    super();
    this.images.push(CanvasUtil.loadNewImage('./assets/graphics/ball/player.png'));
    this.images.push(CanvasUtil.loadNewImage('./assets/graphics/ball/playerSlide.png'));
    this.images.push(CanvasUtil.loadNewImage('./assets/graphics/ball/playerJump.png'));
    this.image = this.images[0];
    this.acceleration = 2;
    this.timeToGoBackToTheGround = 2300;
    this.posXinitial = maxX / 2 - 60;
    this.posX = maxX / 2 - 60;
    this.posYinitial = maxY - 150;
    this.posY = maxY - 150;
  }

  /**
   * Getter for initial position X
   *
   * @returns initial position X
   */
  public getPosXinitial(): number {
    return this.posXinitial;
  }

  /**
   * Getter for initial position Y
   *
   * @returns initial position Y
   */
  public getPosYinitial(): number {
    return this.posYinitial;
  }

  /**
   * Functions which moves the player
   *
   * @param elapsed elapsed number
   * @param code code of the move
   * @param moveTo final X destination
   * @returns true/false if move has been done or not
   */
  public move(elapsed: number, code: number, moveTo: number): boolean {
    if (code === 1) {
      if (this.getPosX() >= moveTo) {
        this.posX -= elapsed * this.acceleration;
        return true;
      }
      this.posX = moveTo;
      return false;
    }
    if (code === 2) {
      if (this.getPosX() <= moveTo) {
        this.posX += elapsed * this.acceleration;
        return true;
      }
      this.posX = moveTo;
      return false;
    }
    return false;
  }

  /**
   * Function which makes jump
   */
  public jump(): void {
    this.image = this.images[2];
    this.timeToGoBackToTheGround = 2300;
  }

  /**
   * Function which makes slide
   */
  public slide(): void {
    if (this.posY !== this.posYinitial) {
      this.posY = this.posYinitial;
    }
    this.image = this.images[1];
    this.timeToGoBackToTheGround = 2300;
  }

  /**
   * Function which chekcks if the player collides with ActionItem
   *
   * @param actionItem one of ActionItems
   * @returns true/false if it collides with ActionItem or not.
   */
  public collideWithActionItem(actionItem: ActionItem): boolean {
    if (actionItem.getPosX() + actionItem.getWidth() > this.posX
        && actionItem.getPosX() < this.posX + this.image.width
        && actionItem.getPosY() + actionItem.getHeight() > this.posY
        && actionItem.getPosY() < this.posY + this.image.height) return true;
    return false;
  }

  /**
   * Updates the state of the player
   *
   * @param elapsed elapsed number
   * @returns true/false depending on the activity of the player
   */
  public update(elapsed: number): boolean {
    if (this.image === this.images[2] || this.image === this.images[1]) {
      this.timeToGoBackToTheGround -= Number(elapsed);
      this.posY = this.posYinitial - 20;
      if (this.timeToGoBackToTheGround <= 0) {
        this.image = this.images[0];
        this.timeToGoBackToTheGround = 2300;
        this.posY = this.posYinitial;
      }
      return true;
    }
    return false;
  }
}
