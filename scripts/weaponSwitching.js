
function keyPressed() {

    if (keyCode === 49 && player.CAN_MELEE) {
        player.MELEE = true;
        player.GRAPPLE = false;
        player.RANGED = false;
    }

    if (keyCode === 50 && player.CAN_GRAPPLE) {
        player.MELEE = false;
        player.GRAPPLE = true;
        player.RANGED = false;
    }
    
    if (keyCode === 51 && player.CAN_RANGED) {
        player.MELEE = false;
        player.GRAPPLE = false;
        player.RANGED = true;
    }
}
