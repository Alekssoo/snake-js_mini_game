export default class Snake {
    constructor(fieldSize, cellSize) {
        //объявление змейки,
        // ее стартовая позиция, длина, цвет
        this.color = "green";
        this.cellSize = cellSize;
        this.length = 2 * cellSize;
        //начальные координаты
        this.x = fieldSize/2 - cellSize;
        this.y = 75 + fieldSize/2;
        this.dX = cellSize; //направление по оси X, изначально змейка идет направо
		this.dY = 0; //направление по оси Y, изначально не движется по вертикали
        this.snakeCells = [];
    }

    defeat(result) {
        //условия поражения змейки
        if (result > localStorage.getItem('game')) {
            localStorage.setItem('game', result);
        }
    }

    generate(context) {
        //генерация змейки
        context.beginPath();
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.cellSize * 2, this.cellSize);
        context.fill();
    }

    modify() {
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

        this.snakeCells.unshift( { x: this.x, y: this.y } );
    }

    move() {
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
