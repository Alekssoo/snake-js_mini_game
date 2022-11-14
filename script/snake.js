export default class Snake {
    constructor(field, cellSize) {
        //объявление змейки,
        // ее стартовая позиция, длина, цвет
        this._color = "mediumblue";
        this._headColor = "#54ba65";
        this._cellSize = cellSize;
        this.length = 2;
        //признак поражения змейки
        this.death = 0;
        //начальные координаты
        this._x = field.width/2 - this._cellSize;
        this._y = field.height/2 + this._cellSize * 2;
        //направление по оси X и оси Y
        this._dX = cellSize; //изначально змейка идет направо
		this._dY = 0; //изначально не движется по вертикали
        this.snakeCells = [];
        this.moveControl();
    }

    generate(context) {
        //генерация змейки
        this.snakeCells.forEach((cell, index) => {
            context.beginPath();
			if (index == 0) {
				context.fillStyle = this._headColor;
			} else {
				context.fillStyle = this._color;
			}
			context.fillRect(cell.x, cell.y, this._cellSize, this._cellSize);
            context.closePath();
		});
    }

    defeat(field, canvas, context) {
        // условия поражения змейки

        //действия при достижении границы поля
        if (this._x < field.preX || this._x >= this._cellSize * 10 + field.preX
            || this._y < field.preY || this._y >= this._cellSize * 10 + field.preY) {
            this.death = 1;
        }        

        this.snakeCells.forEach((cell, index) => {
            // змейка сталкивается со своим хвостом
            // перебираем ячейки и сравниваем их координаты
            for(let i = index + 1; i < this.snakeCells.length; i++) {
				if (cell.x === this.snakeCells[i].x && cell.y === this.snakeCells[i].y) {
                    this.death = 1;
                    this._dX = 0;
		            this._dY = 0;
				}
			}
        })
    }

    modify(canvas, context, field, target, result) {
        // проверка, жива ли змейка)
        this.defeat(field, canvas, context);

        // если нет признака поражения змейки, то двигаемся дальше
        if (!this.death) {
            //логика(условия) изменения змейки
            this._x += this._dX;
		    this._y += this._dY;
    
            // добавляем текущие x,y в начало как голову змейки при движении
            this.snakeCells.unshift( { x: this._x, y: this._y });
    
            //удаление лишнего элемента в массиве змейки 
            //после изменения положения
            if (this.snakeCells.length > this.length) {
                this.snakeCells.pop();   
            }
    
            this.snakeCells.forEach((cell) => {
                //вариант поедания цели при равных координатах со змейкой
                if (cell.x === target.x - target.radius && cell.y === target.y - target.radius) {
                    this.length++;
                    result.plus();
                    target.getNewCoordinates(field.cells, this.snakeCells);
                }
            });
        }
        

    }

    moveControl() {
        // управление змейкой
        // обработка нажатия кнопок клавиатуры
        // проверяем по коду кнопки, какая нажата
        // и что кнопка не в противоположное направление движется
        document.addEventListener("keydown",  (event) => {
			if (( event.code == "KeyW" || event.code == "38") && (this._dY === 0)) {
				this._dY = -this._cellSize; //вверх
				this._dX = 0;
			} else if ( (event.code == "KeyA" || event.code == "37") && (this._dX === 0)) {
				this._dX = -this._cellSize; //налево
				this._dY = 0;
			} else if (( event.code == "KeyS" || event.code == "40") && (this._dY === 0)) {
				this._dY = this._cellSize; //вниз
				this._dX = 0;
			} else if (( event.code == "KeyD" || event.code == "39" ) && (this._dX === 0)) {
				this._dX = this._cellSize; //направо
				this._dY = 0;
			}
		});
    }
}
