/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevScore;

init();

// ANONYMOUS FUNCTION
document.querySelector('.btn-roll').addEventListener('click', function(){
  console.log('prevScore',prevScore);
  if(gamePlaying){
    // 1. random Number
    var dice = Math.floor(Math.random() * 6) + 1;
    // var dice = 6;

    // 2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';


    // 3. Update the round score IF the number was NOT 1
    if(dice > 1 ){

      // loose score if 2 consecutive sixes
      if(dice === 6 && prevScore === 6){
          // Next Player
          console.log('Player '+ activePlayer + ' double 6!');
          prevScore = 0;
          nextPlayer();
      }
      else {
        //add score
        roundScore += dice;
        prevScore = dice;

        document.querySelector('#current-' + activePlayer).textContent = roundScore;
      }
    } else {
      // Next Player
      nextPlayer();
    }
  }
});


document.querySelector('.btn-hold').addEventListener('click', function(){
  if(gamePlaying){
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if player won the Game
    if(scores[activePlayer] >= 20){
      document.querySelector('#name-'+ activePlayer).textContent = 'Winner!';
      document.querySelector('.btn-roll').classList.add('disable');
      document.querySelector('.dice').style.display = 'none'; // hide dice
      document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    }else {
      // Change active player
      nextPlayer();
    }
  }
});

function nextPlayer(){

  activePlayer = activePlayer === 0 ? 1 : 0;    // TERNARY OPERATION
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // document.querySelector('.player-0-panel').classList.remove('active');
  // document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none'; // hide dice
}

function init(){
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none'; // hide dice
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

document.querySelector('.btn-new').addEventListener('click', init);

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>' ; // always needs to be String


// read DOM
// var x = document.querySelector('#score-0').textContent;
// console.log(x);


// callback function
// function btn(){
//   // Do something here
// }
// document.querySelector('.btn-roll').addEventListener('click', btn); // written without parenthesis
