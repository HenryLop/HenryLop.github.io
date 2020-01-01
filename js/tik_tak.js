
var cells = [];
var type = 'x';
var winned;
var full;
var player;
var wins = [];
function initCells(){
    cells.push(new cell(45,45,''));
    cells.push(new cell(115,45,''));
    cells.push(new cell(185,45,''));
    
    cells.push(new cell(45,115,''));
    cells.push(new cell(115,115,''));
    cells.push(new cell(185,115,''));
    
    cells.push(new cell(45,185,''));
    cells.push(new cell(115,185,''));
    cells.push(new cell(185,185,''));
    winned = false;
    full = false;
    player = 1;
    
    wins.push([0,1,2]);
    wins.push([3,4,5]);
    wins.push([6,7,8]);
    
    wins.push([0,3,6]);
    wins.push([1,4,7]);
    wins.push([2,5,8]);
    
    wins.push([0,4,8]);
    wins.push([2,4,6]);
}



class cell{
    constructor(x,y,type){
        this.x = x;
        this.y = y;
        this.type = type;
    }
    paint(){
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");  
        ctx.font = "60px Arial";
        ctx.fillText(this.type,this.x-25,this.y+5);        
    }   
}

window.onload = function(){
    drawGrid();
    addEvent();
    initCells();
}

function drawGrid(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");  

    ctx.moveTo(0, 70);
    ctx.lineTo(210,70);
    ctx.stroke();     
    
    ctx.moveTo(0, 140);
    ctx.lineTo(210,140);
    ctx.stroke();  
    
    ctx.moveTo(70, 0);
    ctx.lineTo(70,210);
    ctx.stroke();  
    
    ctx.moveTo(140, 0);
    ctx.lineTo(140,210);
    ctx.stroke();  
                  
}

function addEvent(){
    var canvasElem = document.getElementById("canvas");
          
    canvasElem.addEventListener("mousedown", function(e) 
    { 
        play(canvasElem, e);         
    }); 
}
function play(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left; 
    let y = event.clientY - rect.top; 
     checkWin();
     checkFull();   
    
    if(!full && !winned){
        if(x < 70){
            if(y < 70){
                if(cells[0].type == ''){
                    cells[0].type = type;
                    cells[0].paint();
                    type = (type == 'x') ? 'o' : 'x';
                }else{
                    player = 2;
                }
            }else if(y < 140){
                if(cells[3].type == ''){
                    cells[3].type = type;
                    cells[3].paint();
                    type = (type == 'x') ? 'o' : 'x';
                }else{
                    player = 2;
                }
            } else{
                if(cells[6].type == ''){
                    cells[6].type = type;
                    cells[6].paint();
                    type = (type == 'x') ? 'o' : 'x';
                }else{
                    player = 2;
                }
            }
        }else if(x < 140){
            if(y < 70){
                if(cells[1].type == ''){
                    cells[1].type = type;
                    cells[1].paint();
                    type = (type == 'x') ? 'o' : 'x';
                }
            }else if(y < 140){
                if(cells[4].type == ''){
                    cells[4].type = type;
                    cells[4].paint();
                    type = (type == 'x') ? 'o' : 'x';
                }else{
                    player = 2;
                }
            } else{
                if(cells[7].type == ''){
                    cells[7].type = type;
                    cells[7].paint();
                    type = (type == 'x') ? 'o' : 'x';
                }else{
                    player = 2;
                }
            }
        }else{
            if(y < 70){
                if(cells[2].type == ''){
                    cells[2].type = type;
                    cells[2].paint();
                    type = (type == 'x') ? 'o' : 'x';
                }else{
                    player = 2;
                }
            }else if(y < 140){
                if(cells[5].type == ''){
                    cells[5].type = type;
                    cells[5].paint();
                    type = (type == 'x') ? 'o' : 'x';
                }else{
                    player = 2;
                }
            } else{
                if(cells[8].type == ''){
                    cells[8].type = type;
                    cells[8].paint();
                    type = (type == 'x') ? 'o' : 'x';
                }else{
                    player = 2;
                }
            }
        }
        if(player == 2){
            player = 1;  
            checkWin();
            checkFull();   
        }else if(player == 1){
            player = 2;            
            playEnemy();
        }
    }else{
        if(player == 1){
            resart();
        }else{
            player = 1;
        }
    }

} 

function playEnemy(){
    var rect = canvas.getBoundingClientRect(); 
    var cell = calcularBestMove();
    canvas.dispatchEvent(new MouseEvent('mousedown', {clientX:cell.x + rect.left,
                                            clientY:cell.y + rect.top}));    
}

function calcularBestMove(){
    var coincidencesX = 0;
    var coincidencesO = 0;
    var cellX;
    var cellO;
    var cell;
    for(var i = 0; i < wins.length;i++){
        coincidencesX = 0;
        coincidencesO = 0;        
        for(var j = 0; j < wins[i].length;j++){
            if(cells[wins[i][j]].type == 'x'){
                coincidencesX++;
            }else if(cells[wins[i][j]].type == 'o'){
                coincidencesO++;
            }else{
                cell = cells[wins[i][j]];
            }
        }
        if(coincidencesX == 2){
            cellX = cell;                    
        }else if(coincidencesO ==2){
            cellO = cell;
        }      
    }
    if(cellO != null) return cellO;
    if(cellX != null) return cellX;
    if(cells[4].type == '') return cells[4];
    if(cells[0].type == '') return cells[0];
    if(cells[2].type == '') return cells[2];
    if(cells[6].type == '') return cells[6];
    if(cells[8].type == '') return cells[8];
    if(cells[1].type == '') return cells[1];
    if(cells[3].type == '') return cells[3];
    if(cells[5].type == '') return cells[5];
    
    return cells[7];

}
function resart(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);    
    canvas.width = canvas.width;    
    drawGrid();
    for(var i = 0; i < cells.length;i++){
        cells[i].type = '';        
    }    
    winned = false;
    full = false;
    player = 1;
    type = 'x';
}
function checkFull(){
    for(var i = 0; i < cells.length;i++){
        if(cells[i].type == '') {
            return;
        }
    }
    full = true;
}
function checkWin(){
    if(cells[4].type != ''){
        if(cells[4].type == cells[0].type && cells[4].type == cells[8].type){
            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d"); 
            ctx.moveTo(0, 0);            
            ctx.lineTo(210, 210);
            ctx.stroke();
            winned = true;
        }
        if(cells[4].type == cells[2].type && cells[4].type == cells[6].type){
            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d"); 
            ctx.moveTo(210, 0);            
            ctx.lineTo(0, 210);
            ctx.stroke();
            winned = true;
        }
        if(cells[4].type == cells[1].type && cells[4].type == cells[7].type){
            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d"); 
            ctx.moveTo(105, 0);            
            ctx.lineTo(105, 210);
            ctx.stroke();
            winned = true;
        }
      if(cells[4].type == cells[3].type && cells[4].type == cells[5].type){
            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d"); 
            ctx.moveTo(0,105);            
            ctx.lineTo(210,105);
            ctx.stroke();
          winned = true;
        }        
    }
    if(cells[0].type != ''){
        if(cells[0].type == cells[3].type && cells[0].type == cells[6].type){
            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d"); 
            ctx.moveTo(35, 0);            
            ctx.lineTo(35, 210);
            ctx.stroke();
            winned = true;
        }
        if(cells[0].type == cells[1].type && cells[0].type == cells[2].type){
            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d"); 
            ctx.moveTo(0, 35);            
            ctx.lineTo(210,35);
            ctx.stroke();
            winned = true;
        }        
    }
    if(cells[2].type != ''){
       if(cells[2].type == cells[5].type && cells[2].type == cells[8].type){
           var canvas = document.getElementById("canvas");
           var ctx = canvas.getContext("2d"); 
           ctx.moveTo(175, 0);            
           ctx.lineTo(175, 210);
           ctx.stroke();
           winned = true;
       }
    }
    if(cells[6].type != ''){
        if(cells[6].type == cells[7].type && cells[6].type == cells[8].type){
            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d"); 
            ctx.moveTo(0,175);            
            ctx.lineTo(210,175);
            ctx.stroke();
            winned = true;
        }     
    }
    
}

