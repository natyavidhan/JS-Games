const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

class Board{
    constructor(){
        this.board = [[0,0,0],[0,0,0],[0,0,0]];
    }
    draw(){
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(this.board[i][j] == 1){
                    ctx.fillStyle = 'red';
                    ctx.fillRect(i*100,j*100,100,100);
                }
                else if(this.board[i][j] == 2){
                    ctx.fillStyle = 'blue';
                    ctx.fillRect(i*100,j*100,100,100);
                }
            }
        }
    }
    checkWin(){
        let combinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
        let flatBoard = this.board.flat();
        for(let i = 0; i < combinations.length; i++){
            if (flatBoard[combinations[i][0]] == flatBoard[combinations[i][1]] && flatBoard[combinations[i][1]] == flatBoard[combinations[i][2]] && flatBoard[combinations[i][0]] != 0){
                return flatBoard[combinations[i][0]];
            }
        }
        return 0;
    }
    isEmpty(i,j){
        if (i != undefined && j != undefined){
            return this.board[i][j] == 0;
        }
    }
    place(i,j,player){
        this.board[i][j] = player;
    }
    isFull(){
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(this.board[i][j] == 0){
                    return false;
                }
            }
        }
        return true;
    }

}

class Player{
    constructor(symbol){
        this.symbol = symbol;
    }
}

class Game{
    constructor(){
        this.board = new Board();
        this.players = [new Player('X'), new Player('O')];
        this.currentPlayer = this.players[0];
        this.winner = null;
        this.draw = false;
        this.gameOver = false;
    }
    play(x, y){
        if(this.gameOver) return;
        if(this.board.isEmpty(x, y)){
            this.board.place(x, y, this.currentPlayer.symbol);
            this.currentPlayer = this.players[(this.players.indexOf(this.currentPlayer) + 1) % 2];
            console.log(this.currentPlayer);
            this.winner = this.board.checkWin();
            this.draw = this.board.isFull();
            this.gameOver = this.winner || this.draw;
        }
    }
}

let game = new Game();

function drawBoard(){
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            ctx.strokeRect(i*100,j*100,100,100);
            if (game.board.board[i][j] != 0){
                ctx.font = '100px Arial';
                ctx.fillStyle = 'white';
                ctx.fillText(game.board.board[i][j] == 'X' ? 'X' : 'O', i*100+15, j*100+85);
            }
        }
    }
    //draw the current player
    ctx.font = '25px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(game.currentPlayer.symbol + "'s Turn", width/2-45, 335);
}

document.addEventListener('click', function(e){
    let x = Math.floor(e.offsetX/100);
    let y = Math.floor(e.offsetY/100);
    if (x >= 0 && x < 3 && y >= 0 && y < 3){
        game.play(x,y);
        game.board.draw();
        if(game.winner){
            alert(game.winner + ' wins!');
        }
        else if(game.draw){
            alert('Draw!');
        }
    }
}
);

function draw(){
    ctx.clearRect(0,0,width,height);
    drawBoard();
    game.board.draw();
}

setInterval(draw, 10);