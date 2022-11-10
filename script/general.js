import Field from "./field.js"
import Snake from "./snake.js"
import Target from "./target.js"
import Result from "./result.js"
import Support from "./support.js"
import GameLoop from "./gameLoop.js"

const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");
const btn = document.querySelector('.btn');
btn.style.display = "none";

export default class General { 
    constructor () {
        this.Field = new Field(context, canvas.width, canvas.height);
        this.Snake = new Snake(this.Field, this.Field.cellSize);
        this.Target = new Target(this.Field.cellSize);
        this.Result = new Result(0);
        this.Support = new Support();
        canvas.addEventListener("click", this.startGame());      
    }

    modify () {
        //обработка изменений
        this.Snake.modify(this.Field, this.Target, this.Result);
    }

    generate() {
        //генерировать(рисовать) на экране все сущности игры
        context.clearRect(0, 0, this.width, this.height);
        this.Field.generate(context);
        this.Result.generate(context);
        this.Target.generate(context, this.Field.cells);
        this.Snake.generate(context);
    }

    startGame() {
        new GameLoop(this.modify(), this.generate());
        canvas.removeEventListener("click", this.startGame());
        
    }
}



new General();
