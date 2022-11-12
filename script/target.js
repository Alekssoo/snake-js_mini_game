export default class Target {
    constructor(context, cellsize) {
        //указываем параметры цели
        //стартовые координаты, цвет
        this.x = 0;
        this.y = 0;
        this.radius = cellsize/2-1;
        this.color = context.createLinearGradient(this.x, this.y, this.x+10, this.y+10);
        this.color.addColorStop(0, "green");
        this.color.addColorStop(1, "red");
    }

    generate(context,cells) {
        //генерация цели
        //ориентируясь на координаты из массива клеток поля рисуем первую
        if (this.x === 0 && this.y === 0) {
            this.x = cells[[3,5]][0] + this.radius;
            this.y = cells[[3,5]][1] + this.radius;
        }
        context.beginPath();
        // закрашиваем
        context.fillStyle = this.color;
        //рисуем цель круглой
        context.arc(this.x+1, this.y+1, this.radius, 0, 2 * Math.PI);
        context.fill()
        context.closePath();
    }

    getNewCoordinates(cells, snakeCells) {
        // получаем координаты для новой цели
        // настроена проверка для текущей логики без изменения массива cells
        // из массива клеток поля берем координаты случайной клетки
        
        let randomX = Math.floor(Math.random() * 10) + 1;
        let randomY = Math.floor(Math.random() * 10) + 1;

        //проверяем совпадение новых координат со змейкой
        
        let snakeCell = 0;
        snakeCells.forEach(cell => {
            if (randomX === cell.x && randomY === cell.y) {
                snakeCell = 1;
            } 
        })

        //и генерируем рекурсией пока не будет совпадать со змейкой
        if (snakeCell) {
            this.getNewCoordinates(cells, snakeCells)
        } else {
            this.x = cells[[randomX,randomY]][0] + this.radius;
            this.y = cells[[randomX,randomY]][1] + this.radius;
        }   
    }
}