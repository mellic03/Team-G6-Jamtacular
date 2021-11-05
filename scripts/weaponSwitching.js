
function keyPressed() {

    if (keyCode === 50) {
        player.MELEE = false;
        player.GRAPPLE = true;
        player.RANGED = false;
    }
    
    if (keyCode === 51) {
        player.MELEE = false;
        player.GRAPPLE = false;
        player.RANGED = true;
    }

}