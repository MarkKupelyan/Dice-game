"use strict";

//Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active"); //TOGGLE ADDS THE CLASS IF ITS NOT THERE, AND IF IT IS THERE IT WILL REMOVE IT
  player1El.classList.toggle("player--active");
};

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //eventlistener pro btn klik
    //1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1; //vybenerujeme nahodne cislo do 6, math.trunc gives us number between 0 and 5 so we add 1

    //2. display the dice
    diceEl.classList.remove("hidden"); //smazeme pomoci remove -> hidden class
    diceEl.src = `dice-${dice}.png`; //dinamicky zobrazi dice cislo co jsme udelali nahore a zmenime to pomoci .src

    //3. check for rolled 1
    if (dice !== 1) {
      //if its not 1 then we want to add the dice number to the current score
      currentScore += dice; //pridame to nahodne cislo do current score pokazdy kdyz dice hodime

      document.getElementById(`current--${activePlayer}`).textContent = //misto toho dole jsme to udelali dynamicky
        currentScore;

      //current0El.textContent = currentScore; // do current score pro player 1 textcontentu pridame cislo dicu
    } else {
      // switch to next player

      switchPlayer();

      //////nahore je funkce aby to bylo DRI
      /*  document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0; // cte se to po rovnase if the activePlayer is 0 then 1 else 0(TERNARI OPERATOR)
    currentScore = 0;
    player0El.classList.toggle("player--active"); //TOGGLE ADDS THE CLASS IF ITS NOT THERE, AND IF IT IS THERE IT WILL REMOVE IT
    player1El.classList.toggle("player--active"); */
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    /// 1. add current score to active players score
    scores[activePlayer] += currentScore; //tohle znamena jako scores[1] = scores[1]+ currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if players score is >= 100

    if (scores[activePlayer] >= 20) {
      playing = false; //kdyz nekdo vyhraje -> hrani nepokracovaluje bez new game
      // Finish the game
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer(); //switches to annother player
    }
  }
});
btnNew.addEventListener("click", init);
