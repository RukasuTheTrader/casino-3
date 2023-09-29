let playerJack = 1000;
let playerScore = 0;
let hostScore = 0;

document.addEventListener('DOMContentLoaded', (event) => {
    let betSlider = document.getElementById('bet');
    let betNumber = document.getElementById('betNumber');
    
    betSlider.addEventListener('input', function (e) {
        betNumber.value = e.target.value;
    });

    betNumber.addEventListener('input', function (e) {
        betSlider.value = e.target.value;
    });

    document.getElementById('startButton').addEventListener('click', startGame); 
    document.getElementById('reset').addEventListener('click', resetGame);

    updateBetLimits(); 
});

function startGame() {
    let bet = parseInt(document.getElementById('betNumber').value);
    if (isNaN(bet) || playerJack < bet || bet < 10) {
        alert('Invalid bet!');
        return;
    }

    playerJack -= bet;
    updateJackDisplay();
    document.getElementById('playerArea').classList.remove('hidden');
    document.getElementById('startButton').classList.add('hidden');
}

function rollDice() {
    let roll = Math.floor(Math.random() * 100) + 1;
    if (roll <= 4) {
        endGame(false);
        return;
    }
    playerScore += roll;
    if (playerScore > 100) endGame(false);
    document.getElementById('playerScore').innerText = playerScore.toString();
}

function hold() {
    document.getElementById('hostArea').classList.remove('hidden');
    do {
        let roll = Math.floor(Math.random() * 100) + 1;
        hostScore += roll;
    } while (hostScore < playerScore && hostScore <= 100);
    document.getElementById('hostScore').innerText = hostScore.toString();
    if (hostScore > 100 || hostScore < playerScore) {
        endGame(true);
    } else {
        endGame(false);
    }
}

function endGame(playerWins) {
    document.getElementById('reset').classList.remove('hidden');
    let bet = parseInt(document.getElementById('betNumber').value);
    if (playerWins) playerJack += bet * 2; // If player wins, he gets double the bet.
    updateJackDisplay(); // Neu hinzugefügte Zeile
    alert(playerWins ? 'You win!' : 'You lose!');
}

function resetGame() {
    document.getElementById('reset').classList.add('hidden');
    document.getElementById('playerArea').classList.add('hidden');
    document.getElementById('hostArea').classList.add('hidden');
    document.getElementById('startButton').classList.remove('hidden'); // Show the start button
    playerScore = 0;
    hostScore = 0;
    document.getElementById('playerScore').innerText = '0';
    document.getElementById('hostScore').innerText = '0';
}

function updateJackDisplay() {
    document.getElementById('jackAmount').innerText = playerJack.toLocaleString('en-US');
    updateBetLimits(); // rufe updateBetLimits auf, anstatt den betSlider hier zu aktualisieren
}

function updateBetLimits() {
    let betSlider = document.getElementById('bet');
    let betNumber = document.getElementById('betNumber');

    betSlider.max = playerJack;
    betNumber.max = playerJack;

    if (playerJack < 10) {
        betSlider.disabled = true;
        betNumber.disabled = true;
    } else {
        betSlider.disabled = false;
        betNumber.disabled = false;
        // Sicherstellen, dass der Einsatz innerhalb der gültigen Grenzwerte liegt
        if (betSlider.value < 10) {
            betSlider.value = 10;
            betNumber.value = 10;
        } else if (betSlider.value > playerJack) {
            betSlider.value = playerJack;
            betNumber.value = playerJack;
        }
    }
}
