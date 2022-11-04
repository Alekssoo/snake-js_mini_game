export default class Field {
    constructor(width, height) {
        //генерация поля для игры
        this.width = width;
        this.height = height;
        this.cellSize = 16;
        this.color = "grey";
        
    }

    generate(context) {  
        //let cells = [];
        context.beginPath();
        context.fillStyle = this.color;
        for(let x = 0; x <= this.width; x += 20) {
            for(let y = 0;y <= this.height; y += 20) {
                context.fillRect(x, y, 20, 20);
                
                // cells += 30;
            }
        }
    }

}
