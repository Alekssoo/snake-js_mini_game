export default class Support {
    constructor() {
        //this.context = context
    }

    //рисуем закрашенный прямоугольник
        // с закругленными углами с помощью дуг
    fillRoundedRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + (w /2), y);
        ctx.arcTo(x + w, y, x + w, y + (h / 2), r);
        ctx.arcTo(x + w, y + h, x + (w / 2), y + h, r);
        ctx.arcTo(x, y + h, x, y + (h / 2), r);
        ctx.arcTo(x, y, x + (w / 2), y, r);
        ctx.fill()
        ctx.closePath();
      }

      writeText(ctx,text, x, y) {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.font = "22px Verdana";
        ctx.fillText(text, x, y)
        ctx.closePath();
      }
}