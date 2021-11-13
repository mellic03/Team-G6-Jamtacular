
class Pickup {
    
    constructor(type, x, y) {
        this.type = type;
        this.pos = createVector(x, y);
        this.timer = 0;
    }

    draw() {

        switch(this.type) {

            case "health":
                if (this.timer < 1) {
                    image(health_pickup, this.pos.x, this.pos.y);

                    if (player.sprite.position.dist(this.pos) < 20 && player.health < player.maxHealth) {
                        player.health += 25;
                        this.timer = 1;
                    }
                }
            break;
            
            case "grapple":
                if (!player.CAN_GRAPPLE) {
                    image(grapple_open, this.pos.x, this.pos.y);
                
                    if (player.sprite.position.dist(this.pos) < 20) {
                        player.CAN_GRAPPLE = true;
                        player.GRAPPLE = true;
                        player.MELEE = false;
                    }
                }
            break;
            
            case "rangedWeapon":
                if (!player.CAN_RANGED) {

                    image(pistol_img, this.pos.x, this.pos.y);
                
                    if (player.sprite.position.dist(this.pos) < 20) {
                        player.GRAPPLE = false;
                        player.MELEE = false;
                        player.CAN_RANGED = true;
                        player.RANGED = true;
                    }
                }
            break;
            
            case "nightVision":
                if (!player.CAN_NIGHTVISION) {

                    image(eye_img, this.pos.x, this.pos.y);
        
                    if (player.sprite.position.dist(this.pos) < 20) {
                        player.CAN_NIGHTVISION = true;
                        frameCount = 0;
                    }
                }
            break;
            
            case "triggerJail":
                if (player.sprite.position.dist(this.pos) < 20) {
                    playerJail.place();
                }
            break;

            case "blueKey":
                if (!player.CAN_BLUE_KEY) {
                    image(blue_key_img, this.pos.x, this.pos.y);
                
                    if (player.sprite.position.dist(this.pos) < 20) {
                        player.GRAPPLE = false;
                        player.MELEE = false;
                        player.RANGED = false;
                        player.BLUE_KEY = true;
                    }
                }
            break;

            case "redKey":
                if (!player.CAN_RED_KEY) {
                    image(red_key_img, this.pos.x, this.pos.y);
                
                    if (player.sprite.position.dist(this.pos) < 20) {
                        player.GRAPPLE = false;
                        player.MELEE = false;
                        player.RANGED = false;
                        player.BLUE_KEY = false;
                        player.CAN_RED_KEY = true;
                        player.RED_KEY = true;
                    }
                }
            break;
            
            case "goldKey":
                if (!player.CAN_RED_KEY) {
                    image(red_key_img, this.pos.x, this.pos.y);
                
                    if (player.sprite.position.dist(this.pos) < 20) {
                        player.GRAPPLE = false;
                        player.MELEE = false;
                        player.RANGED = false;
                        player.BLUE_KEY = false;
                        player.RED_KEY = false;
                        player.CAN_BLUE_KEY = false;
                        player.CAN_RED_KEY = false;
                
                        player.CAN_GOLD_KEY = true;
                        player.GOLD_KEY = true;
                    }
                }
            break;
        }
    }
}


