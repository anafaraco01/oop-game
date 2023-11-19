import ActionItem from './ActionItem.js';
import CanvasUtil from '../../CanvasUtil.js';

export default class Snail extends ActionItem {
  /**
   * Constructor for Snail
   *
   * @param startX position X of Snail
   * @param startY position Y of Snail
   */
  public constructor(startX: number, startY: number) {
    super(startX, startY);
    this.image = CanvasUtil.loadNewImage('./assets/graphics/actionItems/snail.png');
    const random = Math.random();
    if (random <= 0.33) {
      this.posX = startX / 2 - 25;
    } else if (random <= 0.66) {
      this.posX = (startX / 2) - 425;
    } else {
      this.posX = (startX / 2) + 375;
    }
    this.posY = startY - 500;
  }
}
