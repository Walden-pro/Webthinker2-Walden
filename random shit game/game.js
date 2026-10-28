let p1, p2;
const keys = {};

// Platforms layout
const platforms = [
    { x: 150, y: 380, width: 500, height: 20 },
    { x: 250, y: 260, width: 300, height: 15 },
    { x: 100, y: 160, width: 150, height: 15 },
    { x: 550, y: 160, width: 150, height: 15 }
];

function setup() {
    createCanvas(800, 500);
    
    // Player 1 (You)
    p1 = new Fighter(200, 100, '#e74c3c', {
        left: 65,  // 'A'
        right: 68, // 'D'
        jump: 87,  // 'W'
        attack: 83 // 'S'
    }, false);

    // Player 2 (CPU Bot)
    p2 = new Fighter(560, 100, '#3498db', {}, true);
}

function draw() {
    background(43, 43, 43);

    // Draw Platforms
    fill(127, 140, 141);
    noStroke();
    for (let p of platforms) {
        rect(p.x, p.y, p.width, p.height);
    }

    // Update and Draw Players
    p1.update();
    p2.update();

    checkAttacks(p1, p2);
    checkAttacks(p2, p1);

    p1.draw();
    p2.draw();

    // Draw HUD (Damage & Stocks)
    textSize(22);
    textStyle(BOLD);
    
    fill(231, 76, 60);
    text(`Player: ${p1.damage}% | Stocks: ${'♥'.repeat(Math.max(0, p1.stocks))}`, 50, 450);

    fill(52, 152, 219);
    text(`CPU: ${p2.damage}% | Stocks: ${'♥'.repeat(Math.max(0, p2.stocks))}`, 450, 450);
}

// Track key states
function keyPressed() {
    keys[keyCode] = true;
}

function keyReleased() {
    keys[keyCode] = false;
}

class Fighter {
    constructor(x, y, color, controls, isCPU) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 60;
        this.vx = 0;
        this.vy = 0;
        this.speed = 4;
        this.jumpForce = -12;
        this.gravity = 0.5;
        this.grounded = false;
        this.color = color;
        this.controls = controls;
        this.isCPU = isCPU;
        
        this.damage = 0;
        this.stocks = 3;
        this.facing = 1; // 1 = right, -1 = left

        this.isAttacking = false;
        this.attackTimer = 0;
        this.hitbox = null;
    }

    update() {
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

    respawn() {
        this.stocks--;
        this.damage = 0;
        this.x = width / 2 - this.width / 2;
        this.y = 50;
        this.vx = 0;
        this.vy = 0;
    }

    draw() {
        // Draw Fighter body
        fill(this.color);
        noStroke();
        rect(this.x, this.y, this.width, this.height);

        // Draw eyes to show direction
        fill(255);
        let eyeX = this.facing === 1 ? this.x + 25 : this.x + 5;
        rect(eyeX, this.y + 10, 10, 10);

        // Draw Hitbox if attacking
        if (this.isAttacking && this.hitbox) {
            fill(255, 0, 0, 100);
            rect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
        }
    }
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
            attacker.isAttacking = false;
            receiver.damage += 10;
            
            let knockbackMultiplier = 1 + (receiver.damage / 20);
            let direction = attacker.facing;
            receiver.vx = 8 * direction * knockbackMultiplier;
            receiver.vy = -6 * knockbackMultiplier;
        }
    }
}