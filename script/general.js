import Field from "./field.js"
import Snake from "./snake.js"
import Target from "./target.js"
import Result from "./result.js"
//import Support from "./support.js"
//import GameLoop from "./gameLoop.js"

const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");
const btn = document.querySelector('.btn');
btn.style.display = "none";

export default class General { 
    constructor () {
        this.Field = new Field(context, canvas.width, canvas.height);
        this.Snake = new Snake(this.Field, this.Field.cellSize);
        this.Target = new Target(context, this.Field.cellSize);
        this.Result = new Result(0);
        //this.Support = new Support();
        this.frame = 0;
        this.frameFrequency = 10;
        //new GameLoop(this.modify(), this.generate());
        this.animate = this.animate.bind(this);
        this.animate()
    }

    modify() {
        //обработка изменений
        this.Snake.modify(context, this.Field, this.Target, this.Result);
    }

    generate() {
        //генерировать(рисовать) на экране все сущности игры
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.Field.generate(context);
        this.Result.generate(context, this.Field);
        this.Target.generate(context, this.Field.cells);
        this.Snake.generate(context);
    }

    animate() {
        requestAnimationFrame(this.animate);
        //пропускаем первые 9 кадров и начинаем игровой цикл
        if (++this.frame < this.frameFrequency) {
            return;
        }
        this.frame = 0;
        this.modify();
        this.generate();
    }

}

let gameStart = {
    field: new Field(context, canvas.width, canvas.height),
    result: new Result(0)
}

gameStart.field.generate(context);
gameStart.result.generate(context, gameStart.field);

canvas.addEventListener("click", () => {
    //context.clearRect(0, 0, canvas.width, canvas.height);
    new General();
});

btn.addEventListener("click", () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    new General();
})