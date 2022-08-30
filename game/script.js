const game = {};

function PlayPauseControl(id) {
    const $el = document.getElementById(id);
    let value = 0;

    const start = () => {
        value = 1;
        $el.classList.remove('icon-play-solid');
        $el.classList.add('icon-pause-solid');
    }
    const stop = () => {
        value = 0;
        $el.classList.remove('icon-pause-solid');
        $el.classList.add('icon-play-solid');
    }

    $el.addEventListener('click', () => {
       if ($el.className.includes('icon-play-solid')) start();
       else stop();
    });

    Object.defineProperties(this, {
        value: {
            get: () => value,
            set: (v) => v ? start() : stop()
        },
        start: { value: start },
        stop: { value: stop }
    });

    stop();

    return this;
}

function StepControl(id) {
    const $el = document.getElementById(id);
    let value = 1;

    const setStep = (v) => {
        value = v;
        $el.textContent = v;
    }

    Object.defineProperties(this, {
        value: {
            get: () => value,
            set: setStep
        }
    });

    setStep(1);

    return this;
}

function ResourceControl(id, name, variation, color) {
    const $el = document.getElementById(`${id}-${name}`);
    const $current = document.getElementById(`${id}-${name}-current`);
    const $max = document.getElementById(`${id}-${name}-max`);

    let value = resource(
        context.defaults[name],
        context.defaults[`${name}Regen`],
        context.defaults[`${name}Spread`],
        variation
    );

    const getPercent = (v, m) => 100 - Math.floor((v/m)*100)

    const setCurrent = (v) => {
        if (v > value.max) v = value.max;
        if (v < value.min) v = value.min;
        value.current = v;
        $current.textContent = v;
        $el.style = `--bg: ${color}; --val: -${getPercent(value.current, value.max)}%`;
    };

    const setMax = (v) => {
        value.max = v;
        $max.textContent = v;
        $el.style = `--bg: ${color}; --val: -${getPercent(value.current, value.max)}%`;
    }

    setCurrent(value.current);
    setMax(value.max);

    Object.defineProperties(this, {
        value: {
            get: () => value.current,
            set: (v) => setCurrent(v)
        },
        max: {
            get: () => value.max,
            set: (v) => setMax(v)
        },
        min: { get: () => value.min },
        regen: { get: () => value.regen },
        step: { value: () => {
            console.debug(`${id} regen ${value.regen} ${name}`);
            setCurrent(value.current + value.regen);
        }}
    });

    return this;
}

function PlayerControl(id, key) {
    const $title = document.getElementById(`${id}-title`);
    const $configure = document.getElementById(`${id}-configure`);
    const $info = document.getElementById(`${id}-info`);

    let state = {};
    let info = {};

    const infoItem = (label, value) => {
        let $it = document.createElement('span');
        $it.textContent = `${label}: ${value}`;
        return $it;
    }

    const setName = (v) => {
        return $title.value ? ($title.value = v) : ($title.textContent = v)
    };

    const updateInfo = () => {
        $info.innerHTML = "";
        $info.append( infoItem('regen', state.health.regen) );
        for (let key in info) {
            $info.append( infoItem(key, info[key]) );
        }
    };

    const setConstitution = (con) => {
        info.constitution = con;
        state = {
            health: new ResourceControl(id, 'health', con - 50, '#a5d6a7'),
            mana: new ResourceControl(id, 'mana', 50 - con, '#90caf9'),
        };
        Object.assign(info, {
            speed: Math.ceil(proportional(
                context.defaults.speed,
                context.defaults.speedSpread,
                con - 50,
                context.defaults.speedRange
            )),
            agility: Math.ceil(proportional(
                context.defaults.agility,
                context.defaults.agilitySpread,
                50 - con,
                context.defaults.agilityRange
            ))
        });
        updateInfo();
    };

    const setArmor = (a) => {
        info.armorPoints = a;
        info.armor = Math.ceil(proportional(
            context.defaults.armor,
            context.defaults.armorSpread,
            a - 50,
            context.defaults.armorRange
        ));
        updateInfo();
    }

    const setWeapon = (w) => {
        info.weaponPoints = w;
        info.weapon = Math.ceil(proportional(
            context.defaults.weapon,
            context.defaults.weaponSpread,
            w - 50,
            context.defaults.weaponRange
        ));
        updateInfo();
    }

    if ($configure) {
        $configure.addEventListener('click', () => {
            game.modal.collect(this, ({name, con, armor, weapon}) => {
                setName(name);
                setConstitution(con);
                setArmor(armor);
                setWeapon(weapon);
            });
        });
    }

    Object.defineProperties(this, {
        name: {
            get: () => $title.value || $title.textContent,
            set: setName
        },
        constitution: {
            get: () => info.constitution,
            set: setConstitution
        },
        armor: {
            get: () => info.armor,
            set: (v) => setArmor(v)
        },
        weapon: {
            get: () => info.weapon,
            set: (v) => setWeapon(v)
        },
        info: {
            get: () => ({
                speed: info.speed,
                agility: info.agility,
                armorPoints: info.armorPoints,
                weaponPoints: info.weaponPoints
            })
        },
        health: { get: () => state.health },
        mana: { get: () => state.mana },
        restore: { get: () => () => {
                state.health.step();
                state.mana.step();
            }},
        action: { get: () => ( step, enemy ) => {
                if (step % info.speed === 0) {
                    game.attack(key, enemy);
                }
            }}
    });

    setConstitution(context.defaults.constitution);
    setArmor(context.defaults.armorPoints);
    setWeapon(context.defaults.weaponPoints);

    return this;
}

function ModalControl(id) {
    const $el = document.getElementById(id);
    const $close = document.getElementById('close');
    const $cancel = document.getElementById('cancel');
    const $save = document.getElementById('save');
    const $inputName = document.getElementById('player-configure-title');
    const $inputCon = document.getElementById('constitution');
    const $inputArmor = document.getElementById('armor');
    const $inputWeapon = document.getElementById('weapon');

    const player = new PlayerControl('player-configure');
    let callback = null;

    const show = () => $el.classList.add('is-active');
    const hide = () => $el.classList.remove('is-active');

    $inputCon.addEventListener('input', () => {
       player.constitution = $inputCon.value;
    });
    $inputArmor.addEventListener('input', () => {
        player.armor = $inputArmor.value;
    });
    $inputWeapon.addEventListener('input', () => {
        player.weapon = $inputWeapon.value;
    });

    $cancel.addEventListener('click', () => {
        hide();
        callback = null;
    });
    $close.addEventListener('click', () => {
        hide();
        callback = null;
    });

    $save.addEventListener('click', () => {
        callback();
        hide();
    });

    Object.defineProperties(this, {
        show: { value: show },
        hide: { value: hide },
        reset: { value: (p) => {
            $inputName.value = p.name;
            $inputCon.value = p.constitution;
            $inputArmor.value = p.info.armorPoints;
            $inputWeapon.value = p.info.weaponPoints;
            player.name = p.name;
            player.constitution = p.constitution;
            player.armor = p.info.armorPoints;
            player.weapon = p.info.weaponPoints;
        }},
        collect: { value: (p, cb) => {
            this.reset(p);
            this.show();

            callback = () => {
                cb({
                    name: player.name,
                    con: $inputCon.value,
                    armor: $inputArmor.value,
                    weapon: $inputWeapon.value
                });
                callback = null;
            };
        }}
    });

    return this;
}

function HistoryControl(id) {
    const $el = document.getElementById(id);
    let value = [];

    const clear = () => {
        $el.innerHTML = "";
        value = [];
    };

    const historyItem = (actor, name, step, message) => {
        const $it = document.createElement('article');
        $it.innerHTML = `<h3>Player: <span>«${name}»</span> on step <span>${step}</span></h3><p>${message}</p>`;
        $it.classList.add(actor);
        return $it;
    };

    Object.defineProperties(this, {
        value: { get: () => value },
        add: {value: (actor, name, step, message) => {
            value.push({ actor, name, step, message });
            let $it = historyItem(actor, name, step, message);
            $el.append( $it );
            $it.scrollIntoView();
        }}
    });

    clear();

    return this;
}

const context = {
    defaults: {
        constitution: 50,
        health: 1000,
        healthRegen: 0.02,
        healthSpread: 50,
        mana: 300,
        manaRegen: 0.08,
        manaSpread: 50,
        speed: 4,
        speedSpread: 100,
        speedRange: [1, 8],
        agility: 40,
        agilitySpread: 100,
        agilityRange: [0, 80],
        armor: 50,
        armorSpread: 80,
        armorRange: [10,90],
        armorPoints: 25,
        weapon: 50,
        weaponSpread: 80,
        weaponRange: [10,90],
        weaponPoints: 50,
        gameSpeed: 1000,
        gameSpeedOptions: [
            ['0.25x', 4000],
            ['0.5x', 2000],
            ['1x', 1000],
            ['1.5x', 750],
            ['2x', 500],
            ['4x', 250]
        ]
    },
    state: {},
    history: null,
    players: {}
};

game.initContext = () => {
    context.state = {
        run: new PlayPauseControl('game-play-pause'),
        step: new StepControl('current-step')
    };
    context.winner = null;
    context.complete = false;
    context.history = new HistoryControl('history');
}

game.initPlayers = () => {
    context.players = {
        left: new PlayerControl('player-left', 'left'),
        right: new PlayerControl('player-right', 'right')
    };
};

game.reset = () => {
    game.initContext();
    game.initPlayers();

    game.$start = document.getElementById('game-play-pause');
    game.$start.addEventListener('click', game.start);
};

game.attack = (from, to) => {
    let power = context.players[from].weapon;
    power = Math.floor(power + ((power * Math.random()) / 2));
    let isCriticalHit = random(context.players[from].info.agility);
    let isHit = random(100 - context.players[to].info.agility);
    let message = [`Attack player «${context.players[to].name}»`];

    console.debug(`attack ${from} to ${to}`, power, isCriticalHit, isHit);

    if (isCriticalHit) {
        power = power * 2;
    }
    if (isHit) {
        if (isCriticalHit) {
            // hit ${power} damage to health
            message.push(`critical hit ${power} damage to health`);
        } else {
            message.push(`hit ${power} damage to health`);
        }
    } else {
        if (isCriticalHit) {
            // hit ${power} damage to health
            message.push(`critical miss ${power} damage to health`);
        } else {
            message.push(`miss ${power} damage to health`);
        }
    }

    context.players[to].health.value -= power;
    console.debug(`${to} health: ${context.players[to].health.value}`);

    context.history.add(
        from,
        context.players[from].name,
        context.state.step.value,
        message.join(', ')
    );
}

async function nextStep() {
    return new Promise((resolve, reject) => {
        if (context.complete) {
            reject('complete');
        }
        if (context.state.run.value) {
            setTimeout(() => {
                resolve(context.state.step.value++);
            }, context.defaults.gameSpeed);
        } else {
            let timer = setInterval(() => {
                if (context.state.run.value) {
                    clearInterval(timer);
                    resolve(context.state.step.value++);
                }
            }, 100);
        }
    });
}

function hasWinner() {
    let alive = Object.values(context.players).filter(p => p.health.value !== 0);
    if (alive.length === 1) {
        context.winner = alive[0].name;
        context.complete = true;
    }
    if (alive.length === 0) {
        context.complete = true;
    }
    return context.complete;
}

async function mainLoop() {
    do {
        console.group(`step: ${context.state.step.value}`);
        context.players.left.restore();
        context.players.right.restore();
        context.players.left.action(
            context.state.step.value,
            'right'
        );
        context.players.right.action(
            context.state.step.value,
            'left'
        );
        if (hasWinner()) {
            break;
        }
        console.groupEnd();
    } while(await nextStep());

    game.complete();
}

game.start = () => {
    console.log('START');
    game.$start.removeEventListener('click', game.start);

    mainLoop()
        .then(winner => console.log(`game complete, win ${winner}`))
        .catch(err => console.log(`game stopped`, err));
}

game.complete = () => {
    if (context.winner) {
        alert(`${context.winner} win!!!`);
    } else {
        alert(`No winner, but game complete`);
    }
    context.state.run.stop();
};

game.modal = new ModalControl('configure-player');
//game.$reset = document.getElementById('game-stop');
//game.$reset.addEventListener('click', game.reset);

game.reset();

