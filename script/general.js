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
        this.Target = new Target();
        this.Result = new Result(0);
    }

    Mofify () {
        //логика и обработка изменений
    }

    generate() {
        context.clearRect(0, 0, this.width, this.height);
        this.Field.generate(context);
        //генерировать(рисовать) на экране все сущности игры
    }
}

let Game = new General();

Game.generate()