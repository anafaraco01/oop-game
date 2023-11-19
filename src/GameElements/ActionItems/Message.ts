import ActionItem from './ActionItem.js';
import CanvasUtil from '../../CanvasUtil.js';

export default class Message extends ActionItem {
  /**
   * A message constructor
   *
   * @param startX start position X of a message
   * @param startY start position Y of a message
   */
  public constructor(startX: number, startY: number) {
    super(startX, startY);
    const random = Math.random();
    if (random <= 0.33) {
      this.image = CanvasUtil.loadNewImage('./assets/graphics/actionItems/message1.png');
      this.posX = startX / 2 - 100;
    } else if (random <= 0.66) {
      this.image = CanvasUtil.loadNewImage('./assets/graphics/actionItems/message2.png');
      this.posX = (startX / 2) - 400 - 100;
    } else {
      this.image = CanvasUtil.loadNewImage('./assets/graphics/actionItems/message3.png');
      this.posX = (startX / 2) + 400 - 100;
    }
    this.posY = startY - 500;
  }
}
