export default class Result {
    constructor(result) {
        //начальное количество очков
        this._result = result;
        this._width = 100;
        this._height = 50;
        this.best = localStorage.getItem('game');
    }

    generate(context, field) {
        //генерация табло с результатами на экране
        //текущие набранные очки
        context.fillStyle = "orange";
        field.fillRoundedRect(context, 75, 100, this._width, this._height, 7);
        field.writeText(context,this._result, 75 + this._width/10, 100 + this._height/1.5);
        //табло с лучшим результатом
        if (this.best) {
            context.fillStyle = "orangered";
            field.fillRoundedRect(context,200, 100, this._width+25, this._height, 7);
            field.writeText(context,"best: " + this.best,200+this._width/10, 100 + this._height/1.5);
        }
        
        
    }

    plus() {
        // увеличение кол-ва заработанных очков
        // и обновление сгенерированного табло при изменениях
        this._result ++;
        if (!this.best) {
            localStorage.setItem('game', 0);
        }
        if (this._result > localStorage.getItem('game')) {
            localStorage.setItem('game', this._result);
        }
    }

    drop() {
        // сброс количества очков на табло при поражении змейки
        this._result = 0;
    }

}

