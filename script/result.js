export default class Result {
    constructor(result) {
        //начальное количество очков
        this._result = result;
    }

    generate() {
        //генерация табло с результатами на экране
    }

    plus() {
        //увеличение кол-ва заработанных очков
        // и обновление сгенерированного табло при изменениях
        this._result ++;
        this.generate();
    }

    drop() {
        //сброс количества очков на табло при поражении змейки
        this._result = 0;
        this.generate();
    }

}

