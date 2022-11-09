export default class Target {
    constructor(cellsize) {
        //указываем параметры цели
        //стартовые координаты, цвет
        this.color = "red";
        this.x = 0;
        this.y = 0;
        this.radius = cellsize/2-1;
    }

    generate(context,cells) {
        //генерация цели
        //ориентируясь на координаты из массива клеток рисуем первую
        if (this.x === 0 && this.y === 0) {
            this.x = cells[[3,5]][0] + this.radius;
            this.y = cells[[3,5]][1] + this.radius;
        }
        context.beginPath();
        //градиентно закрашиваем
        let gradient = context.createLinearGradient(this.x, this.y, this.x+10, this.y+10);
        gradient.addColorStop(0, "red");
        gradient.addColorStop(1, "green");
        context.fillStyle = gradient;
        //рисуем цель круглой
        context.arc(this.x+1, this.y+1, this.radius, 0, 2 * Math.PI);
        context.fill()
    }

    getNewCoordinates(cells, snakeCells) {
        //получаем координаты для новой цели
        // настроена проверка для текущей логики без изменения массива cells
        // из массива клеток поля берем координаты случайной клетки
        
        let randomX = Math.floor(Math.random() * 10) + 1;
        let randomY = Math.floor(Math.random() * 10) + 1;
        let snakeCell = 0;
        snakeCells.forEach(cell => {
            if (randomX === cell.x && randomY === cell.y) {
                snakeCell = 1;
            } 
        })

        if (snakeCell) {
            this.getNewCoordinates(cells, snakeCells)
        } else {
            this.x = cells[[randomX,randomY]][0] + this.radius;
            this.y = cells[[randomX,randomY]][1] + this.radius;
        }   
      
        //Math.floor(Math.random() * (max - min)) + min;
    }
}