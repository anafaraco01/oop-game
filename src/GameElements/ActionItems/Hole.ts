import ActionItem from './ActionItem.js';
import CanvasUtil from '../../CanvasUtil.js';

export default class Hole extends ActionItem {
  /**
   * A hole constructor
   *
   * @param startX start position X of a hole
   * @param startY start position Y of a hole
   */
  public constructor(startX: number, startY: number) {
    super(startX, startY);
    this.image = CanvasUtil.loadNewImage('./assets/graphics/actionItems/hole.png');
    const random = Math.random();
    if (random <= 0.33) {
      this.posX = startX / 2 - 100;
    } else if (random <= 0.66) {
      this.posX = (startX / 2) - 475;
    } else {
      this.posX = (startX / 2) + 300;
    }
    this.posY = startY - 500;
  }
}
