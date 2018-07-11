var board;
var board_size = 300;
var turn = 1;
var win = 0;
var moves = 0;
var result = 0;

function setup(){
    createCanvas(board_size + 1, board_size + 1)
    noLoop();
    
}

function draw(){
    turn = 1;
    win = 0;
    moves = 0;
    result = 0;

    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    rect(0, 0, board_size, board_size)
    line(board_size/3, 0, board_size/3, board_size)
    line(2 * board_size/3, 0, 2 * board_size/3,board_size)
    line(0, board_size/3, board_size, board_size/3)
    line(0, 2 * board_size/3, board_size, 2 * board_size / 3)
}

function mousePressed(){
    if(!win){
        var pos = detectBox(mouseX, mouseY)
        if(pos){
            if(board[pos[0] - 1][pos[1] - 1] == 0){
                turn = 1 - turn;
                board[pos[0] - 1][pos[1] - 1] = turn + 1;
                drawMove(pos, turn);
                moves++;
                if(checkWin()){
                    win = 1;
                }
            }
        }
    }
    else if(win == 1){
        if(skipMousePress() && result == 0){
            fill(0, 0, 0);
            rect(0, 0, board_size, board_size)
            fill(255, 255, 255);
            textSize(board_size / 14)
            text("Player " + str(turn + 1) +" Won", board_size/6,board_size/3);

            textSize(board_size / 14)
            text("( Click to continue... )", (board_size/6) - board_size / 48, (board_size/3) + board_size / 6);
            result = 1;
        }
        else if(result = 1){
            redraw();
        }
    }
    else{
        if(skipMousePress() && result == 0){
            fill(0, 0, 0);
            rect(0, 0, board_size, board_size)
            fill(255, 255, 255);
            textSize(board_size / 14)
            text("Match Draw!", board_size/6,board_size/3);

            textSize(board_size / 14)
            text("( Click to continue... )", (board_size/6) - board_size / 48, (board_size/3) + board_size / 6);
            
            result = 1;
        }
        else if(result = 1){
            redraw();
        }
    }
}

function detectBox(x, y){

    pos = [99, 99];

    if(x > 0 && x < board_size / 3){
        //first column\
        pos[0] = 1;
    }
    else if (x > board_size / 3 && x < 2 * board_size / 3){
        //second column
        pos[0] = 2;
    }
    else if (x > 2 * board_size / 3 && x < board_size){
        //third column
        pos[0] = 3;
    }

    if(y > 0 && y < board_size / 3){
        pos[1] = 1;
    }
    else if(y > board_size / 3 && y < 2 * board_size / 3){
        pos[1] = 2;
    }
    else if(y > 2 * board_size / 3 && y < board_size){
        pos[1] = 3;
    }

    return pos[0] == 99 || pos[1] == 99 ? undefined : pos;

}

function drawMove(pos, player){
    player ? fill(0 ,0, 0) : fill(255, 255, 255);
    ellipse((pos[0] * board_size / 3) - (board_size / 6), (pos[1] * board_size / 3) - (board_size / 6), board_size / 6, board_size / 6)
}

function checkWin(){

    for(i = 0; i < 3; i++){
        if(board[0][i] == board[1][i] && board[0][i] != 0){
            if(board[1][i] == board[2][i]){
                stroke(50);
                line(0 + board_size / 24, (i * 2 + 1) * board_size / 6, board_size - board_size/24, (i * 2 + 1) * board_size / 6)
                return board[0][i];
            }
        }
    }

    for(i = 0; i < 3; i++){
        if(board[i][0] == board[i][1] && board[i][0] != 0){
            if(board[i][1] == board[i][2]){
                line((i * 2 + 1) * board_size / 6, 0 + board_size / 24, (i * 2 + 1) * board_size / 6, board_size - board_size/24)
                return board[i][0];
            }
        }
    }
 
    if(board[0][0] == board[1][1] && board[0][0] != 0){
        if(board[1][1] == board[2][2]){
            line(0 + board_size / 12, board_size/12, 11 * board_size / 12, 11 * board_size / 12)
            return board[0][0];
        }
    }
    
    if(board[0][2] == board[1][1] && board[0][2] != 0){
        if(board[1][1] == board[2][0]){
            line(11 * board_size / 12, 0 + board_size / 12, board_size/12, 11 * board_size / 12)
            return board[0][2];
        }
    }

    if(moves == 9){
        win = 2;
    }
}

var mousePresses = 0;
function skipMousePress(){
    mousePresses++;
    if(mousePresses > 0){
        mousePresses = 0;
        return true;
    }
    return false;
}