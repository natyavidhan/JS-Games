const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

let score = {
    player1: 0,
    player2: 0
}

class Paddle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    move(direction) {
        if (direction === 'up') {
            this.y -= 10;
        } else if (direction === 'down') {
            this.y += 10;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = 2;
        this.dy = -2;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
    }

    wallCollision() {
        if (this.x + this.radius > width || this.x - this.radius < 0) {
            this.dx = -this.dx * 1.1;
        }
        if (this.y + this.radius > height || this.y - this.radius < 0) {
            this.dy = -this.dy * 1.1;
        }
    }

    paddleCollision(paddle) {
        if (this.x - this.radius < paddle.x + paddle.width &&
            this.x + this.radius > paddle.x &&
            this.y + this.radius > paddle.y &&
            this.y - this.radius < paddle.y + paddle.height) {
            this.dy = -this.dy;
            this.dx = -this.dx;
        }
    }
}

const paddle1 = new Paddle(10, height / 2 - 100 / 2, 10, 100, 'red');
const paddle2 = new Paddle(width - 10 - 10, height / 2 - 100 / 2, 10, 100, 'blue');
const ball = new Ball(width / 2, height / 2, 10, 'black');


document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp') {
        paddle1.move('up');
    } else if (event.key === 'ArrowDown') {
        paddle1.move('down');
    }
}, true);

function check_score() {
    if (ball.x - ball.radius < 0) {
        score.player2++;
        ball.x = width / 2;
        ball.y = height / 2;
        ball.dx = 2;
        ball.dy = -2;
    } else if (ball.x + ball.radius > width) {
        score.player1++;
        ball.x = width / 2;
        ball.y = height / 2;
        ball.dx = -2;
        ball.dy = -2;
    }
}

function draw_score() {
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`Player 1: ${score.player1}`, 10, 20);
    ctx.fillText(`Player 2: ${score.player2}`, width - 100, 20);
}

function drive_paddle_2() {
    if (ball.y + ball.radius > paddle2.y + paddle2.height / 2) {
        paddle2.move('down');
    } else if (ball.y - ball.radius < paddle2.y - paddle2.height / 2) {
        paddle2.move('up');
    }
}

function draw() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);
    paddle1.draw();
    paddle2.draw();
    ball.update();
    ball.wallCollision();
    ball.paddleCollision(paddle1);
    ball.paddleCollision(paddle2);
    ball.draw();
    drive_paddle_2();
    check_score();
    draw_score();
}

setInterval(draw, 10);