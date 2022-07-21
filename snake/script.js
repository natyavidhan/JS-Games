const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height-50;

class Snake{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.tail = [];
        this.tailLength = 1;
    }
    draw(){
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x, this.y, 10, 10);
        for(let i = 0; i < this.tail.length; i++){
            ctx.fillRect(this.tail[i].x, this.tail[i].y, 10, 10);
        }
    }
    update(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.tail.push({x: this.x, y: this.y});
        if(this.tail.length > this.tailLength){
            this.tail.shift();
        }
    }
    changeDirection(x, y){
        this.xSpeed = x;
        this.ySpeed = y;
    }
    checkCollision(){
        for(let i = 1; i < this.tail.length; i++){
            if (i != this.tail.length - 1){
            let distance = Math.sqrt(Math.pow(this.x - this.tail[i].x, 2) + Math.pow(this.y - this.tail[i].y, 2));
            if(distance < 1){
                return true;
            }
        }
        }
        if(this.x < 0 || this.x > width - 10 || this.y < 0 || this.y > height - 10){
            return true;
        }
        return false;
    }
}

class Game{
    constructor(){
        this.snake = new Snake();
        this.food = {
            x: 0,
            y: 0
        };
        this.score = 0;
        this.init();
    }
    init(){
        ctx.fillStyle = '#000';
        this.snake.x = width / 2;
        this.snake.y = height / 2;
        this.snake.xSpeed = 0;
        this.snake.ySpeed = 0;
        this.snake.tail = [];
        this.snake.tailLength = 1;
        this.score = 0;
        this.generateFood();
    }
    generateFood(){
        this.food.x = Math.floor(Math.random() * width/10) * 10;
        this.food.y = Math.floor(Math.random() * height/10) * 10;
    }
    draw(){
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, width, height);
        this.snake.draw();
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.food.x, this.food.y, 10, 10);
    }
    update(){
        this.snake.update();
        if(this.snake.checkCollision()){
            this.init();
        }
        if(this.snake.x === this.food.x && this.snake.y === this.food.y){
            this.score++;
            this.snake.tailLength++;
            this.generateFood();
        }
    }
}


const game = new Game();
game.init();

function draw_score(){
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + game.score, 165, 425);
}

document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowUp' && game.snake.ySpeed !== 10){
        game.snake.changeDirection(0, -10);
    }
    if(e.key === 'ArrowDown' && game.snake.ySpeed !== -10){
        game.snake.changeDirection(0, 10);
    }
    if(e.key === 'ArrowLeft' && game.snake.xSpeed !== 10){
        game.snake.changeDirection(-10, 0);
    }
    if(e.key === 'ArrowRight' && game.snake.xSpeed !== -10){
        game.snake.changeDirection(10, 0);
    }
}, false);


setInterval(() => {
    ctx.clearRect(0, 0, width, height+50);
    game.update();
    game.draw();
    draw_score();
}
, 100);