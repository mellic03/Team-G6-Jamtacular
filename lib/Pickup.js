class Pickup {

    constructor(target, type, x, y) {

        this.position = createVector(x, y);
        this.sprite = createSprite(this.position.x, this.position.y, 20, 20);

        this.target = target;

        this.type = type;

        this.active = true;
    }


    draw() {
        if (this.active) {
            ellipse(this.position.x, this.position.y, 50);

            if (this.target.sprite.position.dist(this.position) < 50) {
                this.collect();
                this.active = false;
            }
        }
    }

    collect() {

        if (this.type == "health") {
            this.target.health += 50;
        }

        else if (this.type == "ammo") {
            this.target.ammo += 50;
        }
    }
}