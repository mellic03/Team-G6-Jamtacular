
function trigger(triggerEntity, xpos, ypos, callback, debug) {

    let triggerPos = createVector(xpos, ypos);

    // function text at trigger location
    if (debug) {
        textSize(12);
        text(eval(callback), triggerPos.x, triggerPos.y);
    }

    if (triggerEntity.sprite.position.dist(triggerPos) < 100) {
        callback(triggerEntity);
    }
}


function events(x, y) {
    
    textAlign(CENTER, CENTER);
    fill(255);

    // transition between map1 and map3 (100, 1800)
    transitionMap(map1, 700, 700, map3, 100, 3100);

    trigger(player, 2400, 4700, giveGrapple, true);

}

function giveGrapple(entity) {
    entity.CAN_GRAPPLE = true;
}

function giveRanged(entity) {
    entity.CAN_RANGED = true;
}