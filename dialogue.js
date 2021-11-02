let textTimer = 0;


// very bad code!! Change soon!!

function dialogue(x, y) {
    
    textAlign(CENTER, CENTER);


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
            player.sprite.velocity.x = 0;
            player.sprite.velocity.y = 3;
            player.sprite.changeAnimation("idle");
            textTimer++;
        }
    }

    if (textTimer >= 780) {
        textTimer++;
    }

    if (player.sprite.position.y < 0 && textTimer > 1100) {
        
        text("This game doesn't feel finished...", x, y);

    }

}