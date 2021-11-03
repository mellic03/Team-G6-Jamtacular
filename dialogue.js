let textTimer = 0;


// very bad code!! Change soon!!

function dialogue(x, y) {
    
    textAlign(CENTER, CENTER);
    fill(255);

    if (textTimer < 240) {
        text("Oh boy I cant wait to get home", x, y);
        textTimer++;
    }


    if (dist(x, y, 1500, -82) < 150) {

        if (textTimer < 780) {
            if (textTimer > 360 && textTimer < 480) {
                text("Huh,", x, y);
            }
            if (textTimer > 600) {
                text("you'd think I would have noticed that before...", x, y);
            }
            player.controllable = false;
            player.sprite.velocity.x = 0;
            player.sprite.mirrorX(1);
            textTimer++;
        }
    }

    if (textTimer >= 780) {
        player.controllable = true;
        textTimer++;
    }

    if (player.sprite.position.y < 0 && textTimer > 1100) {
        
        text("This game doesn't feel finished...", x, y);

    }
}