import ActionItem from './ActionItem.js';
import CanvasUtil from '../../CanvasUtil.js';

export default class Thief extends ActionItem {
  /**
   * A thief constructor
   *
   * @param startX start position X of a thief
   * @param startY start position Y of a thief
   */
  public constructor(startX: number, startY: number) {
    super(startX, startY);
    this.image = CanvasUtil.loadNewImage('./assets/graphics/actionItems/thieve.png');
    const random = Math.random();
    if (random <= 0.33) {
      this.posX = startX / 2 - 40;
    } else if (random <= 0.66) {
      this.posX = (startX / 2) - 400 - 40;
    } else {
      this.posX = (startX / 2) + 400 - 40;
    }
    this.posY = startY - 500;
  }
}
