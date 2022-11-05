import Field from "./field.js"
import Snake from "./snake.js"
import Target from "./target.js"
import Result from "./result.js"

const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");

export default class General { 
    constructor () {
        this.Field = new Field(canvas.width, canvas.height);
        this.Snake = new Snake();
        this.Target = new Target(this.Field.cellSize);
        this.Result = new Result(0);
    }

    Mofify () {
        //логика и обработка изменений
    }

    generate() {
        //генерировать(рисовать) на экране все сущности игры
        context.clearRect(0, 0, this.width, this.height);
        this.Field.generate(context);
        this.Target.generate(context, this.Field.cells);
        this.Target.getCoordinates(this.Field.cells); // для проверки новых координат
        this.Target.generate(context, this.Field.cells); // рисуем новую цель
    }
}

let game = new General();

game.generate()
