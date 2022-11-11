//import Support from "./support.js"

export default class Field {
    constructor(context, width, height) {
        //инициализация поля для игры
        this.width = width;
        this.height = height;
        this.cellSize = 25;
        this.gameX = 75;
        this.gameY = 175;
        //определяем градиентный цвет для поля
        this.color = context.createLinearGradient(10, 10, 550, 550);
        this.color.addColorStop(0, "#38705cdd");
        this.color.addColorStop(1, "teal");
        this.cells = new Map(); //массив клеток поля с координатами
        //this.Support = new Support()
    }

    generate(context) {  
        //генерация поля для игры
        context.beginPath();
        //определяем градиентный цвет для будущего заполнения
        context.fillStyle = this.color;
        //рисуем прямоугольное поле
        this.fillRoundedRect(context, 0, 0, this.width, this.height, 15);
        //обводим рамками
        context.strokeRect(0, 0, this.width, this.height);
        context.stroke();
        //рисуем клетки поля и заносим
        //их индексы и координаты в массив
        let i = 0; let j = 0; 
        //let list =[]
        for(let x = this.gameX; x < this.width - this.gameX; x += this.cellSize) {
            i++; j = 0;
            for(let y = this.gameY; y < this.height - this.gameX; y += this.cellSize) {
                context.strokeRect(x, y, this.cellSize, this.cellSize);
                j++;
                this.cells[[j,i]] = [x,y];
                //console.log(this.cells[[j,i]])
                //list.push([i,j]);
            }
        }
        context.closePath();

        //рамка для игрового поля
        context.beginPath();
        context.rect(71, 171, this.cellSize*10+8, this.cellSize*10+8);
        context.lineWidth = 5;
        context.stroke();
        context.closePath();
    }

    fillRoundedRect(context, x, y, w, h, r) {
        context.beginPath();
        context.moveTo(x + (w /2), y);
        context.arcTo(x + w, y, x + w, y + (h / 2), r);
        context.arcTo(x + w, y + h, x + (w / 2), y + h, r);
        context.arcTo(x, y + h, x, y + (h / 2), r);
        context.arcTo(x, y, x + (w / 2), y, r);
        context.fill()
        context.closePath();
      }

      writeText(context,text, x, y) {
        context.beginPath();
        context.fillStyle = "black";
        context.font = "22px Verdana";
        context.fillText(text, x, y)
        context.closePath();
      }

}
