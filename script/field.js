export default class Field {
    constructor(width, height) {
        //генерация поля для игры
        this.width = width;
        this.height = height ;
        this.cellSize = 16;
        
    }

    generate(context) {
        
        context.clearRect(0, 0, this.width, this.height);
        let cells = [];
        
        for(let x = 0; x < 10; x++) {
            cells += 30;
        }
    }

}
