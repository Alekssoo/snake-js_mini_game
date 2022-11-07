export default class Snake {
    constructor(fieldSize, cellSize) {
        //объявление змейки,
        // ее стартовая позиция, длина, цвет
        this.color = "green";
        this.cellSize = cellSize;
        this.length = 2 * cellSize;
        this.x = fieldSize/2 - cellSize;
        this.y = 75 + fieldSize/2;
        this.dX = cellSize; //направление по оси X
		this.dY = 0; //направление по оси Y
        // postion = [150,150]
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
    }

    move(cellSize) {
        // управление змейкой
        // обработка нажатия кнопок клавиатуры
        document.addEventListener("keydown",  (event) => {
			if ( event.code == "KeyW" ) {
				this.dY = -cellSize;
				this.dX = 0;
			} else if ( event.code == "KeyA" ) {
				this.dX = -cellSize;
				this.dY = 0;
			} else if ( event.code == "KeyS" ) {
				this.dY = cellSize;
				this.dX = 0;
			} else if ( event.code == "KeyD" ) {
				this.dX = cellSize;
				this.dY = 0;
			}
		});
    }
}
