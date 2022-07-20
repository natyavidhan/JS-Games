const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

const res = 10;

let paused = false;
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, width, height);

class Cell{
    constructor(x, y, alive=false){
        this.x = x;
        this.y = y;
        this.alive = alive;
    }

    draw(){
        if (this.alive){ctx.fillStyle = '#fff';}else{ctx.fillStyle = '#000';}
        ctx.fillRect(this.x, this.y, res, res);
    }
}

let grid = [];
for (let i = 0; i < width/res; i++){
    grid[i] = [];
    for (let j = 0; j < height/res; j++){
        grid[i][j] = new Cell(i*res, j*res);
    }
}

function draw(){
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[i].length; j++){
            grid[i][j].draw();
        }
    }
}

function update(){
    let newGrid = [];
    for (let i = 0; i < grid.length; i++){
        newGrid[i] = [];
        for (let j = 0; j < grid[i].length; j++){
            let neighbors = 0;
            for (let x = -1; x <= 1; x++){
                for (let y = -1; y <= 1; y++){
                    if (x == 0 && y == 0){continue;}
                    if (i+x < 0 || i+x >= grid.length || j+y < 0 || j+y >= grid[i].length){continue;}
                    if (grid[i+x][j+y].alive){neighbors++;}
                }
            }
            if (grid[i][j].alive){
                if (neighbors < 2 || neighbors > 3){
                    newGrid[i][j] = new Cell(i*res, j*res, false);
                }else{
                    newGrid[i][j] = new Cell(i*res, j*res, true);
                }
            }else{
                if (neighbors == 3){
                    newGrid[i][j] = new Cell(i*res, j*res, true);
                }else{
                    newGrid[i][j] = new Cell(i*res, j*res, false);
                }
            }
        }
    }
    grid = newGrid;
}

//on spacebar, pause/unpause
document.addEventListener('keydown', function(e){
    if (e.key == ' '){
        if (paused){
            paused = false;
            draw();
        }else{
            paused = true;
        }
        document.getElementById('pause').innerHTML = paused ? 'Paused':'Unpaused';
    }
}
);

//on click, toggle cell
canvas.addEventListener('click', function(e){
    let x = Math.floor(e.offsetX/res);
    let y = Math.floor(e.offsetY/res);
    if (grid[x][y].alive){
        grid[x][y].alive = false;
    }else{
        grid[x][y].alive = true;
    }
    draw();
}
);

setInterval(function(){
    if (!paused){
        update();
        draw();
    }
}
, 100);