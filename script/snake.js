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

    defeat() {
        //условия поражения змейки
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
