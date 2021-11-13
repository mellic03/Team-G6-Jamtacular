
function keyPressed() {

    if (keyCode === 49 && player.CAN_MELEE) {
        player.MELEE = true;
        player.GRAPPLE = false;
        player.RANGED = false;
        player.BLUE_KEY = false;
        player.RED_KEY = false;
    }

    if (keyCode === 50 && player.CAN_GRAPPLE) {
        player.MELEE = false;
        player.GRAPPLE = true;
        player.RANGED = false;
        player.BLUE_KEY = false;
        player.RED_KEY = false;
    }
    
    if (keyCode === 51 && player.CAN_RANGED) {
        player.MELEE = false;
        player.GRAPPLE = false;
        player.RANGED = true;
        player.BLUE_KEY = false;
        player.RED_KEY = false;
    }

    if (keyCode === 52 && player.CAN_RED_KEY) {
        player.MELEE = false;
        player.GRAPPLE = false;
        player.RANGED = false;
        player.BLUE_KEY = false;
        player.RED_KEY = true;
    }

    if (keyCode === 53 && player.CAN_BLUE_KEY) {
        player.MELEE = false;
        player.GRAPPLE = false;
        player.RANGED = false;
        player.BLUE_KEY = true;
        player.RED_KEY = false;
    }
}
