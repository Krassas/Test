const player1 = 'x';
const player2 = 'circle';
const combinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

const score = {
    player1 : 0,
    player2 : 0
};

const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');

const winnerPopup = document.getElementById('popup');

const player1Arrow = document.getElementById('currentPlayer1');
const player2Arrow = document.getElementById('currentPlayer2');

const player1Score = document.getElementById('score1');
const player2Score = document.getElementById('score2');

const winner = document.getElementById('winner');
const finalScore = document.getElementById('score');
const drawMessage = document.getElementById('drawMessage');
const winnerMessage = document.getElementById('winnerMessage');
const closePopupBtn = document.getElementById('closePopup');

let player2turn = false;

gameStart();

//prepare the game
function gameStart(){

	player2turn = false;

    if(player1Arrow.classList.contains('d-none')){
        player1Arrow.classList.remove('d-none');
        player2Arrow.classList.add('d-none');
    }

	cells.forEach(cell => {
		cell.classList.remove(player1);
		cell.classList.remove(player2);
        cell.innerHTML = '';
		cell.removeEventListener('click', handleCellClick);
		cell.addEventListener('click', handleCellClick);
	});
	
	winnerPopup.classList.add('d-none');

}

function handleCellClick(event) {
	const cell = event.target;
    if(!cell.classList.contains(player1) && !cell.classList.contains(player2)){
        const currentClass = player2turn ? player2 : player1;
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            endRound(false, currentClass);
        } else if (isDraw()) {
            endRound(true, currentClass);
        } else {
            swapTurns();
        }
    }
}

function endRound(draw, winner) {

    if (!draw){
        if(winner == player1){
            score.player1 += 1;
            player1Score.innerHTML = score.player1; 
        }else {
            score.player2 += 1;
            player2Score.innerHTML = score.player2;
        }
    } 

    gameStart();
}

function isDraw() {
	return [...cells].every(cell => {
		return cell.classList.contains(player1) || cell.classList.contains(player2);
	})
}

function placeMark(cell, currentClass) {
   
    cell.classList.add(currentClass);
    if(currentClass == player1){
        cell.innerHTML = "X";
    } else {
        cell.innerHTML = "O";
    }
    
}

function swapTurns() {
	player2turn = !player2turn;
    if(player1Arrow.classList.contains('d-none')){
        player1Arrow.classList.remove('d-none');
        player2Arrow.classList.add('d-none');
    }else{
        player1Arrow.classList.add('d-none');
        player2Arrow.classList.remove('d-none');
    }

}

function checkWin(currentClass) {
	return combinations.some(combination => {
		return combination.every(index => {
			return cells[index].classList.contains(currentClass);
		});
	});
}

//timer

document.getElementById('timer').innerHTML = 03 + ":" + 00;

startTimer();

function startTimer() {
  let presentTime = document.getElementById('timer').innerHTML;
  let timeArray = presentTime.split(/[:]+/);
  let m = timeArray[0];
  let s = checkSecond((timeArray[1] - 1));
  if(s==59){
      m=m-1
    }

  if(m == 0 && s == 00){

    if(score.player1 > score.player2){
        winner.innerHTML = 'Player 1';
        finalScore.innerHTML = score.player1 + '/' + score.player2; 
    } else if (score.player1 < score.player2){
        winner.innerHTML = 'Player 2';
        finalScore.innerHTML = score.player2 + '/' + score.player1; 
    } else {
        winnerMessage.classList.add('d-none');
        drawMessage.classList.remove('d-none');
    }

    winnerPopup.classList.remove('d-none');
  }
  if(m<0){
    return
  }
  
  document.getElementById('timer').innerHTML = m + ":" + s;
  
  setTimeout(startTimer, 1000);
  
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {
      sec = "0" + sec
    }; // add zero in front of numbers < 10
  if (sec < 0) {
      sec = "59"
    };
  return sec;
}

//close popup, reset game

closePopupBtn.addEventListener('click', function(){

    winnerPopup.classList.add('d-none');
    score.player1 = 0;
    score.player2 = 0;
    player1Score.innerHTML = score.player1; 
    player2Score.innerHTML = score.player2; 

    gameStart();

    if(!drawMessage.classList.contains('d-none')){
        drawMessage.classList.add('d-none');
        winnerMessage.classList.remove('d-none');
    }

    document.getElementById('timer').innerHTML = 03 + ":" + 00;

    startTimer();

})