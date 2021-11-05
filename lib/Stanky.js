
class Stanky {

    constructor(x, y, target) {

        this.x = x;
        this.y = y;

        this.target = target;
        
        this.weapon = new RangedWeapon();
    }
    

    draw() {
        
        ellipse(this.x, this.y, 20, 20);


    }



    attack() {

    }



}