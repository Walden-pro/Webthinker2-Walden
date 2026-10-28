let p1, p2;
let gameState = 'select';
let winner = '';
let projectiles = [];
const keys = {};

const roster = [
    { name: 'Mario', color: '#e74c3c', accent: '#f1c40f', speed: 4, jumpForce: -12, special: 'Fireball' },
    { name: 'Pikachu', color: '#f1c40f', accent: '#3498db', speed: 5, jumpForce: -13, special: 'Thunder Dash' },
    { name: 'Link', color: '#27ae60', accent: '#ecf0f1', speed: 4, jumpForce: -12.5, special: 'Sword Spin' },
    { name: 'Samus', color: '#f39c12', accent: '#1abc9c', speed: 3.8, jumpForce: -11, special: 'Charge Shot' }
];

// Platforms layout
const platforms = [
    { x: 150, y: 380, width: 500, height: 20 },
    { x: 250, y: 260, width: 300, height: 15 },
    { x: 100, y: 160, width: 150, height: 15 },
    { x: 550, y: 160, width: 150, height: 15 }
];

function setup() {
    createCanvas(800, 500);
    textFont('Trebuchet MS');
}

function draw() {
    background(43, 43, 48);

    if (gameState === 'select') {
        drawSelectScreen();
        return;
    }

    if (gameState === 'gameover') {
        drawArena();
        drawGameOver();
        return;
    }

    drawArena();
    updateProjectiles();
    p1.update();
    p2.update();
    checkAttacks(p1, p2);
    checkAttacks(p2, p1);
    p1.draw();
    p2.draw();
    projectiles.forEach(projectile => projectile.draw());

    textAlign(LEFT, CENTER);
    textSize(20);
    textStyle(BOLD);
    fill(p1.fighter.color);
    text(`${p1.fighter.name}: ${p1.damage}% | Stocks: ${p1.stocks}`, 35, 450);
    fill(p2.fighter.color);
    textAlign(RIGHT, CENTER);
    text(`${p2.fighter.name}: ${p2.damage}% | Stocks: ${p2.stocks}`, 765, 450);

    textAlign(CENTER, CENTER);
    textSize(13);
    textStyle(NORMAL);
    fill(220);
    text(`A/D Move | W Jump | S Attack | E ${p1.fighter.special}${p1.specialCooldown ? ` (${ceil(p1.specialCooldown / 60)}s)` : ''}`, 400, 485);

    if (p1.stocks <= 0 || p2.stocks <= 0) {
        winner = p1.stocks <= 0 ? 'CPU Wins!' : `${p1.fighter.name} Wins!`;
        gameState = 'gameover';
    }
}

function drawArena() {
    fill(127, 140, 141);
    noStroke();
    platforms.forEach(platform => rect(platform.x, platform.y, platform.width, platform.height));
}

function drawSelectScreen() {
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(38);
    text('CHOOSE YOUR FIGHTER', 400, 55);
    textSize(15);
    textStyle(NORMAL);
    fill(180);
    text('The CPU will randomly choose a different fighter.', 400, 95);

    const cardWidth = 170;
    const cardHeight = 230;
    const gap = 12;
    const startX = (800 - (cardWidth * 4 + gap * 3)) / 2;

    roster.forEach((fighter, index) => {
        const x = startX + index * (cardWidth + gap);
        const y = 125;
        fill(48, 52, 64);
        stroke(fighter.color);
        strokeWeight(3);
        rect(x, y, cardWidth, cardHeight, 8);
        drawCharacter(x + cardWidth / 2, y + 82, fighter, 1, false);
        noStroke();
        fill(255);
        textStyle(BOLD);
        textSize(23);
        text(fighter.name, x + cardWidth / 2, y + 145);
        textStyle(NORMAL);
        fill(210);
        textSize(14);
        text(fighter.special, x + cardWidth / 2, y + 176);
        fill(fighter.accent);
        textSize(12);
        text(`Speed ${fighter.speed.toFixed(1)} | Jump ${abs(fighter.jumpForce).toFixed(1)}`, x + cardWidth / 2, y + 203);
    });
}

function drawGameOver() {
    fill(0, 0, 0, 180);
    rect(0, 0, width, height);
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(48);
    text(winner, 400, 210);
    textSize(20);
    fill(210);
    text('Click to choose again', 400, 270);
}

function mousePressed() {
    if (gameState === 'gameover') {
        if (mouseY > 390) {
            gameState = 'select';
            projectiles = [];
        }
        return;
    }
    if (gameState !== 'select') return;

    const cardWidth = 170;
    const gap = 12;
    const startX = (800 - (cardWidth * 4 + gap * 3)) / 2;
    for (let i = 0; i < roster.length; i++) {
        const x = startX + i * (cardWidth + gap);
        if (mouseX >= x && mouseX <= x + cardWidth && mouseY >= 125 && mouseY <= 355) startFight(i);
    }
}

function startFight(playerIndex) {
    let cpuIndex = floor(random(roster.length));
    while (cpuIndex === playerIndex) cpuIndex = floor(random(roster.length));

    p1 = new Fighter(200, 100, roster[playerIndex], { left: 65, right: 68, jump: 87, attack: 83, special: 69 }, false);
    p2 = new Fighter(560, 100, roster[cpuIndex], {}, true);
    p1.facing = 1;
    p2.facing = -1;
    projectiles = [];
    gameState = 'playing';
}

// Track key states
function keyPressed() {
    keys[keyCode] = true;
}

function keyReleased() {
    keys[keyCode] = false;
}

class Fighter {
    constructor(x, y, fighter, controls, isCPU) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 60;
        this.vx = 0;
        this.vy = 0;
        this.speed = fighter.speed;
        this.jumpForce = fighter.jumpForce;
        this.gravity = 0.5;
        this.grounded = false;
        this.fighter = fighter;
        this.controls = controls;
        this.isCPU = isCPU;
        
        this.damage = 0;
        this.stocks = 3;
        this.facing = 1; // 1 = right, -1 = left

        this.isAttacking = false;
        this.attackTimer = 0;
        this.hitbox = null;
        this.specialCooldown = 0;
        this.dashTimer = 0;
    }

    update() {
        if (this.specialCooldown > 0) this.specialCooldown--;
        if (this.dashTimer > 0) this.dashTimer--;
        if (this.isCPU) {
            // Simple CPU AI Logic: Track Player 1's position
            if (p1.x < this.x - 15) {
                this.vx = -this.speed * 0.8;
                this.facing = -1;
            } else if (p1.x > this.x + 15) {
                this.vx = this.speed * 0.8;
                this.facing = 1;
            } else {
                this.vx *= 0.8;
            }

            // CPU Jump behavior if player is higher up or randomly
            if ((p1.y < this.y - 40 || random() < 0.015) && this.grounded) {
                this.vy = this.jumpForce;
                this.grounded = false;
            }

            // CPU Attack behavior when close to player
            let distToPlayer = abs(this.x - p1.x);
            if (distToPlayer < 55 && abs(this.y - p1.y) < 40 && !this.isAttacking && random() < 0.15) {
                this.triggerAttack();
            }
            if ((distToPlayer < 260 || random() < 0.01) && this.specialCooldown <= 0 && random() < 0.012) {
                this.triggerSpecial();
            }
        } else {
            // Player Controls
            if (keys[this.controls.left]) {
                this.vx = -this.speed;
                this.facing = -1;
            } else if (keys[this.controls.right]) {
                this.vx = this.speed;
                this.facing = 1;
            } else {
                this.vx *= 0.8;
            }

            // Jump
            if (keys[this.controls.jump] && this.grounded) {
                this.vy = this.jumpForce;
                this.grounded = false;
            }

            // Attack Input
            if (keys[this.controls.attack] && !this.isAttacking) {
                this.triggerAttack();
            }
            if (keys[this.controls.special] && this.specialCooldown <= 0 && !this.isAttacking) {
                this.triggerSpecial();
            }
        }

        // Gravity
        this.vy += this.gravity;

        // Apply velocities
        this.x += this.vx;
        this.y += this.vy;

        // Platform Collisions
        this.grounded = false;
        for (let p of platforms) {
            if (
                this.x + this.width > p.x &&
                this.x < p.x + p.width &&
                this.y + this.height >= p.y &&
                this.y + this.height - this.vy <= p.y + 10 &&
                this.vy >= 0
            ) {
                this.y = p.y - this.height;
                this.vy = 0;
                this.grounded = true;
            }
        }

        // Handle attack active frames
        if (this.isAttacking) {
            this.attackTimer--;
            if (this.hitbox) {
                this.hitbox.x = this.facing === 1 ? this.x + this.width : this.x - 40;
                this.hitbox.y = this.y + 10;
            }
            if (this.attackTimer <= 0) {
                this.isAttacking = false;
                this.hitbox = null;
            }
        }

        // Screen Boundaries (Blast zones)
        if (this.x < -100 || this.x > width + 100 || this.y > height + 100 || this.y < -200) {
            this.respawn();
        }
    }

    triggerAttack() {
        this.isAttacking = true;
        this.attackTimer = 15;
        this.hitbox = {
            x: this.facing === 1 ? this.x + this.width : this.x - 40,
            y: this.y + 10,
            width: 40,
            height: 30
        };
    }

    triggerSpecial() {
        this.specialCooldown = 150;
        if (this.fighter.name === 'Pikachu') {
            this.dashTimer = 24;
            this.vx = this.facing * 11;
            this.isAttacking = true;
            this.attackTimer = 24;
            this.hitbox = { x: this.x - 10, y: this.y, width: this.width + 20, height: this.height };
        } else if (this.fighter.name === 'Link') {
            this.isAttacking = true;
            this.attackTimer = 30;
            this.hitbox = { x: this.x - 25, y: this.y - 10, width: this.width + 50, height: this.height + 20 };
        } else {
            projectiles.push(new Projectile(
                this.x + (this.facing === 1 ? this.width : 0),
                this.y + 24,
                this.facing,
                this.fighter,
                this
            ));
        }
    }

    respawn() {
        this.stocks--;
        this.damage = 0;
        this.x = width / 2 - this.width / 2;
        this.y = 50;
        this.vx = 0;
        this.vy = 0;
    }

    draw() {
        drawCharacter(this.x + this.width / 2, this.y + this.height / 2, this.fighter, this.facing, true);

        if (this.isAttacking && this.hitbox && this.dashTimer <= 0) {
            fill(255, 255, 255, 85);
            noStroke();
            rect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
        }
    }
}

function drawCharacter(centerX, centerY, fighter, facing, showBody) {
    push();
    translate(centerX, centerY);
    scale(facing, 1);
    noStroke();
    fill(fighter.color);
    ellipse(0, -4, 42, 52);
    fill(fighter.accent);
    ellipse(-8, -14, 8, 10);
    ellipse(8, -14, 8, 10);
    fill(255);
    ellipse(-8, -15, 4, 6);
    ellipse(8, -15, 4, 6);
    if (showBody) rect(-21, 20, 42, 8);
    pop();
}

class Projectile {
    constructor(x, y, direction, fighter, owner) {
        this.x = x;
        this.y = y;
        this.width = fighter.name === 'Samus' ? 22 : 16;
        this.height = fighter.name === 'Samus' ? 14 : 16;
        this.vx = direction * (fighter.name === 'Samus' ? 9 : 7);
        this.fighter = fighter;
        this.owner = owner;
        this.life = 110;
    }

    update(receiver) {
        this.x += this.vx;
        this.life--;
        if (
            this.x < receiver.x + receiver.width && this.x + this.width > receiver.x &&
            this.y < receiver.y + receiver.height && this.y + this.height > receiver.y
        ) {
            applyHit(this.owner, receiver, this.fighter.name === 'Samus' ? 16 : 10, this.vx * 0.45);
            this.life = 0;
        }
    }

    draw() {
        fill(this.fighter.accent);
        noStroke();
        ellipse(this.x + this.width / 2, this.y + this.height / 2, this.width, this.height);
        fill(this.fighter.color);
        ellipse(this.x + this.width / 2, this.y + this.height / 2, this.width * 0.4, this.height * 0.4);
    }
}

function updateProjectiles() {
    const remaining = [];
    projectiles.forEach(projectile => {
        const receiver = projectile.owner === p1 ? p2 : p1;
        projectile.update(receiver);
        if (projectile.life > 0 && projectile.x > -30 && projectile.x < width + 30) remaining.push(projectile);
    });
    projectiles = remaining;
}

function applyHit(attacker, receiver, damage, baseKnockback) {
    receiver.damage += damage;
    const knockback = baseKnockback * (1 + receiver.damage / 45);
    receiver.vx = knockback * attacker.facing;
    receiver.vy = -7 * (1 + receiver.damage / 100);
}

function checkAttacks(attacker, receiver) {
    if (attacker.isAttacking && attacker.hitbox) {
        let hb = attacker.hitbox;
        if (
            hb.x < receiver.x + receiver.width &&
            hb.x + hb.width > receiver.x &&
            hb.y < receiver.y + receiver.height &&
            hb.y + hb.height > receiver.y
        ) {
            const damage = attacker.dashTimer > 0 ? 14 : attacker.fighter.name === 'Link' && attacker.specialCooldown > 120 ? 12 : 10;
            applyHit(attacker, receiver, damage, 8);
            attacker.isAttacking = false;
            attacker.hitbox = null;
        }
    }
}