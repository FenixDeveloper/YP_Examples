/*
constitution => health, mana, speed, agility
points => armour, weapon
skills => toggle effects on target

player => body => effects => state

step:
    — calculate affected state and effects
    — regen resources
    — take action by priority: skill, attack
    — apply actions
    — check alive
*/

function ranged(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

function proportional(base, spread, variation, range = []) {
    let value = base + ((variation / 50) * (spread / 100)) * base;
    return ranged(value, ...(range || [0,value]));
}

function random(p) {
    let min = proportional(50, 90, -p, [5,95]);
    let max = proportional(50, 90, p, [5,95]);
    let current = Math.random()*100;
    return (current > min) && (current < max); 
}

function resource(baseValue, baseRegen, spread, variation = 50) {
    let min = 0;
    let max = proportional(baseValue, spread, variation);
    let current = max;
    let regen = max * baseRegen;

    return {
        min,
        max,
        current,
        regen
    };
}

/*async function gameLoop(settings) {
    const context = await initContext(settings); //fill context
    context.players = await initPlayers(context); //get and fill every player

    do {
        context.temp = {};
        //onStep updates
        updateEffects(context); //check trigger on every effect on player
        updateResources(context); //call step on every resource on player

        //every player do action on every other player
        for (let currentPlayer of context.players) {
            let enemies = context.players.filter(player => player !== currentPlayer); //other players except current
            currentPlayer.planning( enemies );

            for (let currentEnemy of enemies) {
                currentPlayer.action(
                    currentEnemy, //current enemy
                    enemies.filter(enemy => enemy !== currentEnemy), //other enemies except current enemy
                    context
                );
            }
        }

        if (hasWinner(context)) {
            break; //we have winner, no more steps
        }
    } while (await nextStep(context)); //set context.winner

    return complete(context); //reset all, show winner message
}*/