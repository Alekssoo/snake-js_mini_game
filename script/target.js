export default class Target {
    constructor() {
        //указываем параметры цели
        //стартовые координаты, цвет
        this.color = "red";
        this.x = 250;
        this.y = 250;
    }

    generate(min, max) {
        //генерация цели
        return Math.floor(Math.random() * (max - min)) + min;
    }

    getCoordinates() {
        //получаем координаты для новой цели
    }
}