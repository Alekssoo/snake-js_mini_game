export default class Snake {
    constructor(field, cellSize) {
        //объявление змейки,
        // ее стартовая позиция, длина, цвет
        this.color = "mediumblue";
        this.cellSize = cellSize;
        this.length = 2;
        //начальные координаты
        this.x = field.width/2 - cellSize;
        this.y = field.height/2 + cellSize * 2;
        this.dX = cellSize; //направление по оси X, изначально змейка идет направо
		this.dY = 0; //направление по оси Y, изначально не движется по вертикали
        this.snakeCells = [];
        this.moveControl();
    }

    defeat() {
        //условия поражения змейки
        let self = this;
        this.snakeCells.forEach((cell, index) => {
            for(let i = index + 1; i < self.snakeCells.length; i++) {
				if (cell.x == self.snakeCells[i].x && cell.y == self.snakeCells[i].y ) {
					//self.defeat();
                    self.dX = 0;
		            self.dY = 0;
                    self.length = 2;
                    //gameStart.generate(context);
                    const btn = document.querySelector('.btn');
                    btn.style.display = "flex";
					result.drop();
					//target.getNewCoordinates(field.cells, self.snakeCells);
				}
			}
        })

        // this.x = fieldSize/2 - cellSize;
        // this.y = 75 + fieldSize/2;
        // this.dX = cellSize;
		// this.dY = 0;
        // this.length = 2;
        //const btn = document.querySelector('.btn');
        //btn.style.display = "flex";
    }

    generate(context) {
        //генерация змейки

        this.snakeCells.forEach((cell, index) => {
			if (index == 0) {
				context.fillStyle = "#FA0556";
			} else {
				context.fillStyle = this.color;
			}
			context.fillRect(cell.x, cell.y, this.cellSize, this.cellSize);
		});
    }

    modify(context, field, target, result) {
        //логика(условия) изменения змейки
        this.x += this.dX;
		this.y += this.dY;

        // проверка, нет ли поражения
        //this.defeat();

        //действия при достижении границы поля
        if (this.x < field.gameX) {
			this.x = (this.cellSize * 10 + field.gameX) - this.cellSize;
		} else if (this.x >= this.cellSize * 10 + field.gameX) {
			this.x = field.gameX;
		}
	
		if (this.y < field.gameY) {
			this.y = (this.cellSize * 10 + field.gameY) - this.cellSize;
		} else if (this.y >= this.cellSize * 10 + field.gameY) {
			this.y = field.gameY;
		}

        // добавляем текущие x,y в начало как голову змейки при движении
        this.snakeCells.unshift( { x: this.x, y: this.y });
        //this.snakeCells.unshift( { x: this.x + field.cellSize, y: this.y + field.cellSize} );

        //удаление лишнего элемента в массиве змейки после изменения положения
        if (this.snakeCells.length > this.length) {
			this.snakeCells.pop();   
		}

        //let self = this;
        this.snakeCells.forEach((cell, index) => {
            //вариант поедания цели при равных координатах со змейкой
			if (cell.x === target.x - target.radius && cell.y === target.y - target.radius) {
				this.length++;
				result.plus();
				target.getNewCoordinates(field.cells, this.snakeCells);
			}
            //поражение при врезании змейки в себя
			// for(let i = index + 1; i < self.snakeCells.length; i++) {
			// 	if (cell.x == self.snakeCells[i].x && cell.y == self.snakeCells[i].y ) {
			// 		self.defeat();
			// 		result.drop();
			// 		target.getNewCoordinates(field.cells, self.snakeCells);
			// 	}
			// }
		});
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
