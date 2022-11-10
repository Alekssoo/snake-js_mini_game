import Support from "./support.js"

export default class Field {
    constructor(context, width, height) {
        //инициализация поля для игры
        this.width = width;
        this.height = height;
        this.cellSize = 25;
        //определяем градиентный цвет для поля
        this.color = context.createLinearGradient(10, 10, 550, 550);
        this.color.addColorStop(0, "#38705cdd");
        this.color.addColorStop(1, "teal");
        this.cells = new Map(); //массив клеток поля с координатами
        this.Support = new Support()
    }

    generate(context) {  
        //генерация поля для игры
        context.beginPath();
        //определяем градиентный цвет для будущего заполнения
        context.fillStyle = this.color;
        //рисуем прямоугольное поле
        this.Support.fillRoundedRect(context, 0, 0, this.width, this.height, 15);
        //обводим рамками
        context.strokeRect(0, 0, this.width, this.height);
        context.stroke();
        //рисуем клетки поля и сразу заносим
        //их индексы и координаты в массив
        let i = 0; let j = 0; //let list =[]
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

        //рамка для игрового поля
        context.beginPath();
        context.rect(71, 171, this.cellSize*10+8, this.cellSize*10+8);
        context.lineWidth = 5;
        context.stroke();
        context.closePath();
    }

    fillCell(x, y) {
        context.fillRect(x, y, this.cellSize, this.cellSize);
    }

}
