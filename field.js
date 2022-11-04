class Field {
    constructor(width, height) {
        //генерация поля для игры
        this.width = width;
        this.height = height;
    }

    generate() {
        
        context.clearRect(0, 0, this.width, this.height);
    }

}

export default Field;