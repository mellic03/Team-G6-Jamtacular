let textTimer = 0;
let stankyHidden = true;

// very bad code!! Change soon!!

function events(x, y) {
    
    textAlign(CENTER, CENTER);
    fill(255);

    if (textTimer < 240) {
        text("Oh boy I cant wait to get home", x, y);
        textTimer++;
    }


    if (dist(x, y, 1450, 720) < 150) {

        if (textTimer < 780) {

            player.controllable = false;
            player.sprite.velocity.x = 0;
            player.sprite.mirrorX(1);
            
            if (textTimer > 360 && textTimer < 480) {
                text("Huh,", x, y);
            }
            if (textTimer > 600) {
                text("you'd think I would have noticed that before...", x, y);
            }


            textTimer++;
        }
    }

    if (textTimer >= 780) {
        player.controllable = true;
    }

    if (player.sprite.position.dist(stanky.sprite.position) < 250) {
        stankyHidden = false;
    }
}



