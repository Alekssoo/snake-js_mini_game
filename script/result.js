import Support from "./support.js"

export default class Result {
    constructor(result) {
        //начальное количество очков
        this._result = result;
        this._width = 100;
        this._height = 50;
        this.best = localStorage.getItem('game');
        this.Support = new Support();
    }

    generate(context) {
        //генерация табло с результатами на экране
        //текущие набранные очки
        context.fillStyle = "orange";
        this.Support.fillRoundedRect(context, 75, 100, this._width, this._height, 7);
        this.Support.writeText(context,this._result, 75 + this._width/10, 100 + this._height/1.5);
        //генерируется табло с лучшим результатом
        if (this.best) {
            context.fillStyle = "orangered";
            this.Support.fillRoundedRect(context,225, 100, this._width, this._height, 7);
            this.Support.writeText(context,"best: " + this.best,225 + this._width/15, 100 + this._height/1.5);
        }
        
        
    }

    plus() {
        //увеличение кол-ва заработанных очков
        // и обновление сгенерированного табло при изменениях
        this._result ++;
        if (!this.best) {
            localStorage.setItem('game', 0);
        }
        if (this._result > localStorage.getItem('game')) {
            localStorage.setItem('game', this._result);
        }
        this.generate(context);
    }

    drop() {
        //сброс количества очков на табло при поражении змейки
        this._result = 0;
        this.generate(context);
    }

}

