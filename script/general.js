import Field from "./field.js"
import Snake from "./snake.js"
import Target from "./target.js"
import Result from "./result.js"
import Support from "./support.js"

const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");

export default class General { 
    constructor () {
        this.Field = new Field(canvas.width, canvas.height);
        this.Snake = new Snake(canvas.width, this.Field.cellSize);
        this.Target = new Target(this.Field.cellSize);
        this.Result = new Result(0);
        this.Support = new Support();
        
    }

    Mofify () {
        //логика и обработка изменений
    }

    generate() {
        //генерировать(рисовать) на экране все сущности игры
        context.clearRect(0, 0, this.width, this.height);
        this.Field.generate(context);
        this.Result.generate(context);
        this.Target.generate(context, this.Field.cells);
        //this.Target.getCoordinates(this.Field.cells); // для проверки новых координат
        //this.Target.generate(context, this.Field.cells); // рисуем новую цель
        this.Snake.generate(context);
    }
}

let game = new General();

game.generate()
