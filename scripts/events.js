let textTimer = 0;
let stankyHidden = true;

// very bad code!! Change soon!!

// create a trigger function and fill this file with triggers


function trigger(triggerEntity, xpos, ypos, triggerDist, triggerFunction) {

    let triggerPos = createVector(xpos, ypos);

    if (triggerEntity.sprite.position.dist(triggerPos) < triggerDist) {

        triggerFunction();
        
    }


}



function events(x, y) {
    
    textAlign(CENTER, CENTER);
    fill(255);


}



