export default class Snake {
    constructor(field, cellSize) {
        //объявление змейки,
        // ее стартовая позиция, длина, цвет
        this.color = "green";
        this.cellSize = cellSize;
        this.length = 2;
        //начальные координаты
        this.x = field.width/2 - cellSize;
        this.y = field.height/2 + cellSize * 2;
        this.dX = cellSize; //направление по оси X, изначально змейка идет направо
		this.dY = 0; //направление по оси Y, изначально не движется по вертикали
        this.snakeCells = [];
        
    }

    defeat(result) {
        //условия поражения змейки
        this.x = fieldSize/2 - cellSize;
        this.y = 75 + fieldSize/2;
        this.dX = cellSize;
		this.dY = 0;
    }

    generate(context) {
        //генерация змейки
        context.beginPath();
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.cellSize * 2, this.cellSize);
        context.fill();
    }

    modify(field, target, result) {
        //логика(условия) изменения змейки
        this.x += this.dX;
		this.y += this.dY;

        //действия при достижении границы поля
        if (this.x < 75) {
			this.x = (this.cellSize * 10 + 75) - this.cellSize;
		} else if ( this.x >= this.cellSize * 10 + 75 ) {
			this.x = 75;
		}
	
		if (this.y < 175) {
			this.y = (this.cellSize * 10 + 175) - this.cellSize;
		} else if ( this.y >= this.cellSize * 10 + 175 ) {
			this.y = 175;
		}

        //обновление массива ячеек змейки после изменения положения,
        // добавляются x,y в начало
        this.snakeCells.unshift( { x: this.x, y: this.y } );

        //удаление лишнего элемента в массиве змейки после изменения положения
        if ( this.snakeCells.length > this.length ) {
            let lastX = this.snakeCells[this.snakeCells.length-1].x;
            let lastY = this.snakeCells[this.snakeCells.length-1].y;
            field.fillCell(lastX, lastY);
			this.snakeCells.pop();   
		}

        
        this.snakeCells.forEach( (cell, index) => {
            //вариант поедания цели при равных координатах
			if ( cell.x === target.x && cell.y === target.y ) {
				this.length++;
				result.plus();
				target.getNewCoordinates(field.cells, this.snakeCells);
			}
            //поражение при врезании змейки в себя
			for( let i = index + 1; i < this.snakeCells.length; i++ ) {
	
				if ( cell.x == this.snakeCells[i].x && cell.y == this.snakeCells[i].y ) {
					this.defeat(); //нужно где-то взять результат при текущей логике
					result.drop();
					target.getNewCoordinates(field.cells, this.snakeCells);
				}
	
			}
	
		} );
    }

    moveControl() {
        // управление змейкой
        // обработка нажатия кнопок клавиатуры
        document.addEventListener("keydown",  (event) => {
			if (( event.code == "KeyW" || event.code == "38") && (this.dY === 0)) {
				this.dY = -this.cellSize; //вверх
				this.dX = 0;
			} else if ( (event.code == "KeyA" || event.code == "37") && (this.dX === 0)) {
				this.dX = -this.cellSize; //налево
				this.dY = 0;
			} else if (( event.code == "KeyS" || event.code == "40") && (this.dY === 0)) {
				this.dY = this.cellSize; //вниз
				this.dX = 0;
			} else if (( event.code == "KeyD" || event.code == "39" ) && (this.dX === 0)) {
				this.dX = this.cellSize; //направо
				this.dY = 0;
			}
		});
    }
}
