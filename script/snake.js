export default class Snake {
    constructor(field, cellSize) {
        //объявление змейки,
        // ее стартовая позиция, длина, цвет
        this.color = "mediumblue";
        this.cellSize = cellSize;
        this.length = 2;
        //признак поражения змейки
        this.death = 0;
        //начальные координаты
        this.x = field.width/2 - this.cellSize;
        this.y = field.height/2 + this.cellSize * 2;
        this.dX = cellSize; //направление по оси X, изначально змейка идет направо
		this.dY = 0; //направление по оси Y, изначально не движется по вертикали
        this.snakeCells = [];
        this.moveControl();
    }

    defeat() {
        //условия поражения змейки

        this.snakeCells.forEach((cell, index) => {
            
            for(let i = index + 1; i < this.snakeCells.length; i++) {
				if (cell.x === this.snakeCells[i].x && cell.y === this.snakeCells[i].y) {
					//self.defeat();
                    this.death = 1;
                    this.dX = 0;
		            this.dY = 0;
                    //cancelAnimationFrame(game.animate);
                    //context.clearRect(0, 0, canvas.width, canvas.height);
                    //this.length = 2;
                    //gameStart.generate(context);
                    const btn = document.querySelector('.btn');
                    btn.style.display = "flex";
					
					//target.getNewCoordinates(field.cells, self.snakeCells);
				}
			}
        })
    }

    generate(context) {
        //генерация змейки
        context.beginPath();
        this.snakeCells.forEach((cell, index) => {
			if (index == 0) {
				context.fillStyle = "orangered";
			} else {
				context.fillStyle = this.color;
			}
			context.fillRect(cell.x, cell.y, this.cellSize, this.cellSize);
		});
        context.closePath();
    }

    modify(field, target, result) {
        //логика(условия) изменения змейки
        this.x += this.dX;
		this.y += this.dY;

        // проверка, жива ли змейка
        this.defeat();

        if (!this.death) {
            //действия при достижении границы поля
            if (this.x < field.preX) {
                this.x = (this.cellSize * 10 + field.preX) - this.cellSize;
            } else if (this.x >= this.cellSize * 10 + field.preX) {
                this.x = field.preX;
            }
        
            if (this.y < field.preY) {
                this.y = (this.cellSize * 10 + field.preY) - this.cellSize;
            } else if (this.y >= this.cellSize * 10 + field.preY) {
                this.y = field.preY;
            }
    
            // добавляем текущие x,y в начало как голову змейки при движении
            this.snakeCells.unshift( { x: this.x, y: this.y });
    
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
