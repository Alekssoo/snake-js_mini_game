export default class Target {
    constructor() {
        //указываем параметры цели
        //стартовые координаты, цвет
        this.color = "red";
        this.x = 250;
        this.y = 250;
    }

    generate() {
        //генерация цели
        
    }

    getCoordinates(min, max) {
        //получаем координаты для новой цели
        return Math.floor(Math.random() * (max - min)) + min;
    }
}