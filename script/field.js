export default class Field {
    constructor(width, height) {
        //инициализация поля для игры
        this.width = width;
        this.height = height;
        this.cellSize = 25;
        this.color = "grey";
        this.cells = new Map();
    }

    generate(context) {  
        //генерация поля для игры
        context.beginPath();
        let gradient = context.createLinearGradient(10, 10, 550, 550);
        gradient.addColorStop(0, "#38705cdd");
        gradient.addColorStop(1, "teal");
        context.fillStyle = gradient;
        function fillRoundedRect(ctx, x, y, w, h, r){
            ctx.moveTo(x + (w /2), y);
            ctx.arcTo(x + w, y, x + w, y + (h / 2), r);
            ctx.arcTo(x + w, y + h, x + (w / 2), y + h, r);
            ctx.arcTo(x, y + h, x, y + (h / 2), r);
            ctx.arcTo(x, y, x + (w / 2), y, r);
            ctx.fill()
          }
        fillRoundedRect(context, 0, 0, this.width, this.height, 15);

        context.strokeRect(0, 0, this.width, this.height);
        context.stroke();
        
        let i = 0; let j = 0; let list =[]
        for(let x = 75; x < this.width-75; x += 25) {
            i++; j = 0;
            for(let y = 175;y < this.height-75; y += 25) {
                context.strokeRect(x, y, 25, 25);
                j++;
                //this.cells.set([i,j],[x,y]);
                this.cells[[j,i]] = [x,y];
                //list.push([i,j]);
                //console.log(`${i}-я строка, ${j}-й столбец ${this.cells[[i,j]]}`);
            }
        }

        context.closePath();
    }

}
