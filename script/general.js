import Field from "./field.js"
import Snake from "./snake.js"
import Target from "./target.js"
import Result from "./result.js"

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
        this.frame = 0;
        this.frameFrequency = 10;
        this.Result.drop();
        this.animate = this.animate.bind(this);
        this.animate()
    }

    modify() {
        //обработка изменений

        this.Snake.modify(canvas, context, this.Field, this.Target, this.Result);

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
        if (!this.Snake.death) {
            requestAnimationFrame(this.animate);
            //пропускаем первые 9 кадров и начинаем игровой цикл
            if (++this.frame < this.frameFrequency) {
                return;
            }
            this.frame = 0;
            this.modify();
            this.generate();
        }

        else {
            // делаем кнопку для
            // начала новой игры видимой
            btn.style.display = "flex";
        }
        
    }

}

let startScreen = {
    field: new Field(context, canvas.width, canvas.height),
    result: new Result(0)
}

startScreen.field.generate(context);
startScreen.result.generate(context, startScreen.field);

function newGame() {
    canvas.removeEventListener("click", newGame);
    btn.style.display = "none";
    new General();
} 

canvas.addEventListener("click", newGame);
btn.addEventListener("click", newGame)