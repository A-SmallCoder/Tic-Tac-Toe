//variable to keep track of which board is beign used
var currentBoard = 3;

//sets board at the start of the game
function setboard(){
    let div;
    if (currentBoard == 3){
        div = document.getElementById("board");
    }else if(currentBoard == 7){
        div = document.getElementById("board7");
    }else{
        div = document.getElementById("board5");
    }

    let eachSquare = div.getElementsByTagName("div");
    
    for (i=0; i < eachSquare.length; i++){
        eachSquare[i].setAttribute("id",i);
        eachSquare[i].className="square";
        eachSquare[i].addEventListener("click",play)
        
    }

    draw.pause();
    draw.currentTime = 0
    win.pause();
    win.currentTime = 0
}

//initialize variable which holds the previous move (first move is X)
let lastMove = "O";

//sets a square's value to either "X" or "O"
function play(e){    
    let clicked = e.target.id;
    let square = document.getElementById(clicked);

    if (square.innerHTML == ""){
        move.play();

        if (lastMove == "O"){
            lastMove = "X";
        }else {
            lastMove ="O"
        }
        square.innerHTML=lastMove;
        square.classList.add(lastMove);
        
        console.log(square.innerHTML)

        if(currentBoard == 3){
            gameTracker[clicked] = lastMove;
            checkWinner();
        }else if(currentBoard == 7){
            gameTracker7[clicked] = lastMove;
            //checkWinner7();
        }else{
            gameTracker5[clicked] = lastMove;
            checkWinner5();
        }
        
        console.log("square id = " +clicked);
    }
    
}

//arrays that keeps track of state of the game
var gameTracker = ["","","","","","","","",""];
var gameTracker5 = ["","","","","","","","","","","","","","","","","","","","","","","","",""];


//checks if there is a winner after each move
function checkWinner(){

    var row1 = [gameTracker[0],gameTracker[1],gameTracker[2]];
    var row2 = [gameTracker[3],gameTracker[4],gameTracker[5]];
    var row3 = [gameTracker[6],gameTracker[7],gameTracker[8]];
    var col1 = [gameTracker[0],gameTracker[3],gameTracker[6]];
    var col2 = [gameTracker[1],gameTracker[4],gameTracker[7]];
    var col3 = [gameTracker[2],gameTracker[5],gameTracker[8]];
    var diag1= [gameTracker[0],gameTracker[4],gameTracker[8]];
    var diag2= [gameTracker[2],gameTracker[4],gameTracker[6]];
    var lines = [row1,row2,row3,col1,col2,col3,diag1,diag2];

    for (var i=0;i<lines.length;i++){
        if(lines[i][0]+lines[i][1]+lines[i][2] == "XXX"){
            document.getElementById("status").innerHTML="Congratulations! X is the winner! You have the first play in the next game.";
            document.getElementById("status").classList.add("you-won");
            document.getElementById("status").classList.remove("draw");
            document.getElementById("blocker3").style.display = "block";
            lastMove = "O";

            win.play();
            if(theme.currentTime>0){
                theme.currentTime = 0;
                theme.pause()
            }
        }else if(lines[i][0]+lines[i][1]+lines[i][2] == "OOO"){
            document.getElementById("status").innerHTML="Congratulations! O is the winner! You have the first play in the next game.";
            document.getElementById("status").classList.add("you-won");
            document.getElementById("status").classList.remove("draw");
            document.getElementById("blocker3").style.display = "block";
            lastMove = "X";
            win.play();
            if(theme.currentTime>0){
                theme.currentTime = 0;
                theme.pause()
            }
        }else{
            checkDraw();
        }
    }
}
function checkWinner5(){

    var row1 = [gameTracker5[0],gameTracker5[1],gameTracker5[2],gameTracker5[3],gameTracker5[4]];
    var row2 = [gameTracker5[5],gameTracker5[6],gameTracker5[7],gameTracker5[8],gameTracker5[9]];
    var row3 = [gameTracker5[10],gameTracker5[11],gameTracker5[12],gameTracker5[13],gameTracker5[14]];
    var row4 = [gameTracker5[15],gameTracker5[16],gameTracker5[17],gameTracker5[18],gameTracker5[19]];
    var row5 = [gameTracker5[20],gameTracker5[21],gameTracker5[22],gameTracker5[23],gameTracker5[24]];
    var col1 = [gameTracker5[0],gameTracker5[5],gameTracker5[10],gameTracker5[15],gameTracker5[20]];
    var col2 = [gameTracker5[1],gameTracker5[6],gameTracker5[11],gameTracker5[16],gameTracker5[21]];
    var col3 = [gameTracker5[2],gameTracker5[7],gameTracker5[12],gameTracker5[17],gameTracker5[22]];
    var col4 = [gameTracker5[3],gameTracker5[8],gameTracker5[13],gameTracker5[18],gameTracker5[23]];
    var col5 = [gameTracker5[4],gameTracker5[9],gameTracker5[14],gameTracker5[19],gameTracker5[24]];

    var diag1= [gameTracker5[3],gameTracker5[7],gameTracker5[11],gameTracker5[15]];
    var diag2= [gameTracker5[4],gameTracker5[8],gameTracker5[12],gameTracker5[16],gameTracker5[20]];
    var diag3= [gameTracker5[9],gameTracker5[13],gameTracker5[17],gameTracker5[21]];
    var diag4=[gameTracker5[5],gameTracker5[11],gameTracker5[17],gameTracker5[23]];
    var diag5=[gameTracker5[0],gameTracker5[6],gameTracker5[12],gameTracker5[18],gameTracker5[24]];
    var diag6=[gameTracker5[1],gameTracker5[7],gameTracker5[13],gameTracker5[19]];
    var lines = [row1,row2,row3,row5,row4,col4,col5,col1,col2,col3,diag1,diag2,diag3,diag4,diag5,diag6];

    for (var i=0;i<lines.length;i++){

        if(lines[i][0]+lines[i][1]+lines[i][2]+lines[i][3] == "XXXX" ||
         lines[i][0]+lines[i][1]+lines[i][2]+lines[i][3]+lines[i][4] ==("XXXX") ||
         lines[i][0]+lines[i][1]+lines[i][2]+lines[i][3]+lines[i][4] == ("XXXXO")||
         lines[i][0]+lines[i][1]+lines[i][2]+lines[i][3]+lines[i][4] == ("OXXXX")||
         lines[i][0]+lines[i][1]+lines[i][2]+lines[i][3]+lines[i][4] == ("XXXXX")){
            document.getElementById("status5").innerHTML="Congratulations! X is the winner! You have the first play in the next game.";
            document.getElementById("status5").classList.add("you-won");
            document.getElementById("status5").classList.remove("draw");
            document.getElementById("blocker5").style.display = "block";
            lastMove = "O";
            win.play();
            if(theme.currentTime>0){
                theme.currentTime = 0;
                theme.pause()
            }
        }else if(lines[i][0]+lines[i][1]+lines[i][2]+lines[i][3] == "OOOO" ||
         lines[i][0]+lines[i][1]+lines[i][2]+lines[i][3]+lines[i][4] ==("XXXX") ||
         lines[i][0]+lines[i][1]+lines[i][2]+lines[i][3]+lines[i][4] ==("XOOOO")||
         lines[i][0]+lines[i][1]+lines[i][2]+lines[i][3]+lines[i][4] ==("OOOOX")||
         lines[i][0]+lines[i][1]+lines[i][2]+lines[i][3]+lines[i][4] ==("OOOOO")){
            document.getElementById("status5").innerHTML="Congratulations! O is the winner! You have the first play in the next game.";
            document.getElementById("status5").classList.add("you-won");
            document.getElementById("status5").classList.remove("draw");
            document.getElementById("blocker5").style.display = "block";
            lastMove = "X";
            win.play();            
            if(theme.currentTime>0){
                theme.currentTime = 0;
                theme.pause()
            }
        }else{
            checkDraw5();
        }
    }
}


function checkDraw(){
    if (!gameTracker.includes("") && !document.getElementById("status").classList.contains("you-won")){
        
        if(lastMove == "X"){
            document.getElementById("status").innerHTML="Draw! There is no winner. X has the first move in the next game.";
            lastMove = "O";
        }else{
            document.getElementById("status").innerHTML="Draw! There is no winner. O has the first move in the next game.";
            lastMove = "X";
        }        
        document.getElementById("status").classList.add("draw");
        //draw.play();
        if(theme.currentTime>0){
            theme.currentTime = 0;
            theme.pause()
        }
    }
}
function checkDraw5(){
    if (!gameTracker5.includes("") && !document.getElementById("status5").classList.contains("you-won")){
        //console.log(document.getElementById("status").classList); 
        if(lastMove == "X"){
            document.getElementById("status5").innerHTML="Draw! There is no winner. X has the first move in the next game.";
            lastMove = "O";
        }else{
            document.getElementById("status5").innerHTML="Draw! There is no winner. O has the first move in the next game.";
            lastMove = "X";
        }        
        document.getElementById("status5").classList.add("draw");
        //draw.play();
        if(theme.currentTime>0){
            theme.currentTime = 0;
            theme.pause()
        }
    }
}

//restarts the game
function restart(){
    var squares = document.getElementsByClassName("square");
    for(i=0;i<squares.length;i++){
        //console.log(i,squares[i].classList);
        if(squares[i].classList.contains("X")){
            squares[i].classList.remove("X")
        }else{
            squares[i].classList.remove("O")
        }
        squares[i].innerHTML = ""
        gameTracker[i] = "";      
        gameTracker5[i] = "";
        squares[i].removeAttribute("id");
    }
    if(currentBoard==3){
        document.getElementById("status").innerHTML="Move your mouse over a square and click to play an X or an O.";
        document.getElementById("status").classList.remove("you-won");
        document.getElementById("status").classList.remove("draw");
        document.getElementById("blocker3").style.display = "none";
    }else{
        document.getElementById("status5").innerHTML="Move your mouse over a square and click to play an X or an O.";
        document.getElementById("status5").classList.remove("you-won");
        document.getElementById("status5").classList.remove("draw");
        document.getElementById("blocker5").style.display = "none";
    }
}

function changeBoard(dimension){
    if(dimension == 3 && currentBoard!=3){
        restart();
        $("#game3").toggle();
        $("#game5").toggle();
        currentBoard = 3;
        console.log("changed")
        
        setboard();
        
        $("#s").toggleClass("active")
        $("#ss").toggleClass("active")

    }else if(dimension == 5 && currentBoard !=5){
        restart();
        $("#game3").toggle();
        $("#game5").toggle();
                
        console.log("board5")
        currentBoard = 5;
        setboard();
        
        $("#ss").toggleClass("active")
        $("#s").toggleClass("active")
        
    }
}

var move = new Audio('sounds/hit.wav');
var theme = new Audio('sounds/theme.mp3');
var draw = new Audio('sounds/draw.wav');
var win = new Audio('sounds/win.wav');


function toggleSound(){
    if(theme.paused == true){
        theme.play();
        theme.loop = true;
    }else{
        theme.pause();
    }
}

window.onload = () => {
    setboard();
}