export default class Snake {
    constructor() {
        //объявление змейки,
        // ее стартовая позиция, длина, цвет
        this.color = "green";
        this.length = 2;
        this.x = 150;
        this.y = 150;
        // postion = [150,150]
    }

    defeat(result) {
        //условия поражения змейки
        if (result > localStorage.getItem('game')) {
            localStorage.setItem('game', result);
        }
    }

    generate() {
        //генерация змейки
    }

    modify() {
        //логика(условия) изменения змейки
    }

    move(cellSize) {
        // управление змейкой
        // обработка нажатия кнопок клавиатуры
        document.addEventListener("keydown",  (event) => {
			if ( event.code == "KeyW" ) {
				this.dy = -cellSize;
				this.dx = 0;
			} else if ( event.code == "KeyA" ) {
				this.dx = -cellSize;
				this.dy = 0;
			} else if ( event.code == "KeyS" ) {
				this.dy = cellSize;
				this.dx = 0;
			} else if ( event.code == "KeyD" ) {
				this.dx = cellSize;
				this.dy = 0;
			}
		});
    }
}
