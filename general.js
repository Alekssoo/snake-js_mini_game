import Field from "./field.js"
import Snake from "./snake.js"
import Target from "./target.js"
import Result from "./result.js"

class General { 
    constructor () {
        this.Field = new Field();
        this.Snake = new Snake();
        this.Target = new Target();
        this.Result = new Result(0);
    }

    getMofify () {
        //логика и обработка изменений
    }

    generate() {
        //генерировать(рисовать) на экране все сущности игры
    }
}

export default General;