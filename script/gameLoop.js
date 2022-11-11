export default class gameLoop {
    constructor( modify, generate ) {
        this.frame = 0;
        this.frameFrequency = 4; // для замедления частоты кадров в 4 раза(60/4)
        this.modify = modify;
        this.generate = generate;
        this.animate();
    }

    animate() {
        requestAnimationFrame(this.animate);
        //пропускаем первые 3 кадра и начинаем игровой цикл
        if (++this.frame < this.frameFrequency) {
            return;
        }
        this.frame = 0;
        this.modify();
        this.generate();
    }

}