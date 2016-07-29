/**
 * Created by Gjorgji Kirkov on 29.06.2016.
 */


// TODO: Create selectable board


// unnecessary code
/*function renderBoard(XOBoard) {
    
    for (var i = 0; i < 9; i++) {
        if (XOBoard[i] === 1) {
            $("#tile"+move).text("X");
        } else if (XOBoard[i] === -1) {
            $("#tile"+move).text("O");
        }
    }  
}
*/

function playerState(XOBoard) {
    //////////////////// WORKING CODE
    var move = 0;
    move = parseInt(window.prompt("Select a move: [0-8]"));
    console.log(move);
    for (;;) {
        if (move > 8 || move < 0 || XOBoard[move] !== 0){
            alert("Invalid move");
            move = parseInt(window.prompt("Select a move: [0-8]"));   
            console.log(move);
        } else {
            break;                                                                  
        }        

    }

    $("#tile"+move).text("X");
    $("#tile"+move).attr("selectedTile","true"); // set selectedTile unselectable
    XOBoard[move] = -1;
}

function computerState(XOBoard) {
    var move = -1;
    var score = -2;
    for (var i = 0; i < 9; i++) {
        if (XOBoard[i] == 0) {
            XOBoard[i] = 1;
            var tmpScore = -minmax(XOBoard,-1);
            XOBoard[i] = 0;
            if (tmpScore > score) {
                score = tmpScore;
                move = i;
            }
        }
    }

    $("#tile"+move).attr("selectedTile","true"); // set selectedTile unselectable     
    $("#tile"+move).text("O");
    XOBoard[move] = 1;

}

function minmax(XOBoard,player) {
    var winner = win(XOBoard);
    if (winner != 0) {
        return winner * player;
    }

    var move = -1;
    var score = -2;

    for (var i = 0; i < 9; i++) {
        if (XOBoard[i] == 0) {
            XOBoard[i] = player;
            var tmpScore = -minmax(XOBoard,player*-1);
            if (tmpScore > score) {
                score = tmpScore;
                move = i;
            }
            XOBoard[i] = 0;
        }
    }

    if (move == -1) {
        return 0;
    }

    return score;
}

function win(XOBoard)  {

    var matrix = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (var i = 0; i < 8; i++) {
        if(XOBoard[matrix[i][0]] !== 0 && XOBoard[matrix[i][0]] === XOBoard[matrix[i][1]] && XOBoard[matrix[i][0]] === XOBoard[matrix[i][2]])
            return XOBoard[matrix[i][2]];
    }
    return 0;
}

function driverFunction() {
    
    XOBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    var player;
    var selected = $("#options input[type='radio']:checked");
    if (selected.length > 0) {
        player = selected.val();
         $("#options").hide();
    } else {
         $("#options").hide();
    }

    $("#XOBoard").css('padding-top','110px'); // pull down to see all the tiles
    
    console.log(player);

    player = parseInt(player);

    for (var i = 0; i < 9 && win(XOBoard) == 0; i++) {        
        if ((i + player) % 2 == 0) {
            computerState(XOBoard);		
        } else {
            playerState(XOBoard);
        }
        
        console.log(XOBoard);
    }

    for (var i = 0; i < 9; i++) {
        console.log($("#tile"+i).attr("selectedTile") + " #tile"+i);
    }

    if (win(XOBoard) === 0) {
        alert("Draw");
    } else if (win(XOBoard) === -1){
        alert("You win");
    } else if (win(XOBoard) === 1) {
        alert("You lost");
    }

    $("#XOBoard").css('padding-top','0px');  // pull up after finishing
    $("#playAgain").show();

}


$(document).ready(function () {
    $("#playAgain").hide();


    $("#play").click(function() {
        $("#play").hide();
        driverFunction();
    });

    $("#playAgain").click(function() {
        location.reload();
    });
});
