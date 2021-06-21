const newGame = document.getElementById('newGame');
const stayButton = document.getElementById('stay');
const hitButton = document.getElementById('hit');
const playHand = document.getElementById('playHand');
const compHand = document.getElementById('compHand');
const wins = document.getElementById('wins');
const losses = document.getElementById('losses');
const ties = document.getElementById('ties');
const playerTotal = document.getElementById('playerTotal');
const computerTotal = document.getElementById('computerTotal');
const verif = document.getElementById('verification');
const nameBox = document.getElementById('name');
const birthMonths = document.getElementById('birthMonths')
const birthDays = document.getElementById('birthDay');
const birthYears = document.getElementById('birthYear');
const submit = document.getElementById('submit');
const messageBox = document.getElementById('messageBox');
const topHalf = document.getElementsByClassName('topHalf');
const amlostEmpty = document.getElementById('almostEmpty');

const deck = [];
const discardPile = [];
const pHand = [];
const cHand = [];
const suitList = ["C", "H", "D", "S"];
const faceList = ["J", "Q", "K"];

let name;
let age;
let win = 0;
let loss = 0;
let tie = 0;
let gameRunning = false;
let playerTurn = false;
let currentDeckSize = 0;

for (let i = 1; i <= 31; i++) {
    let temp = document.createElement('option');
    temp.innerText = i;
    birthDays.append(temp);
}

for (let i = 2021; i > 1900; i--) {
    let temp = document.createElement('option');
    temp.innerText = i;
    birthYears.append(temp);
}


submit.addEventListener('click', e => {
    if (nameBox.value) {
        let birthday = new Date(birthYears.value, birthMonths.value, birthDays.value);
        age = getAge(birthday);

        if (age < 16) {
            window.location.replace("https://www.coolmathgames.com/");
        } else {
            verif.classList.add('hide');
        }
    } else {
        messageBox.classList.remove('hide');
        messageBox.innerText = "Please enter a name"
    }
})

newGame.addEventListener('click', e => {
    let amount = document.querySelector('input[name="deckSize"]:checked').value;

    if (currentDeckSize != amount && gameRunning == false) {
        discard();
        emptyDeck(discardPile);
        emptyDeck(deck);
        currentDeckSize = amount;
        for (let k = 0; k < amount; k++) {
            for (let i = 0; i < 4; i++) {
                for (let j = 2; j <= 10; j++) {
                    deck.push({ value: j, face: j, suit: suitList[i] })
                }

                for (let j = 0; j < 3; j++) {
                    deck.push({ value: 10, face: faceList[j], suit: suitList[i] })
                }

                deck.push({ value: 11, face: "A", suit: suitList[i] })
            }
        }
        shuffle(deck);
    }
    if (gameRunning == false) {
        console.log(deck)
        discard();
        playHand.innerHTML = "";
        compHand.innerHTML = "";
        startGame();
    }
})

stayButton.addEventListener('click', e => {
    if (gameRunning == true && playerTurn == true) {
        playerTurn = false;
        compTurn();
    }

})

hitButton.addEventListener('click', e => {
    if (playerTurn == true && gameRunning == true) {
        deal(pHand);
        console.log(pHand);
    }
})

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function deal(hand) {
    if (deck.length < 10) {
        refillDeck();
    }
    hand.push(deck.pop())

    if (deck.length < 26) {
        for (let i = 0; i < topHalf.length; i++) {
            topHalf[i].classList.replace('draw', 'hide');
        }
    } else if (deck.length < 15) {
        amlostEmpty.classList.replace('draw', 'hide');
    }

    if (hand === cHand) {
        let temp = document.createElement('div');
        temp.classList.add('card');
        temp.classList.add('compCard');
        temp.value = cHand[cHand.length - 1].face;
        compHand.append(temp);
        if (compHand.length < 1) {
            let pic = document.createElement('img');
            pic.src = `images/cardback.png`;
            temp.append(pic);
        } else {
            let pic = document.createElement('img');
            pic.src = `images/${pHand[pHand.length - 1].face}${pHand[pHand.length - 1].suit}.png`;
            temp.append(pic);
        }
    } else {
        let temp = document.createElement('div');
        temp.classList.add('card');
        playHand.append(temp);
        let pic = document.createElement('img');
        pic.src = `images/${pHand[pHand.length - 1].face}${pHand[pHand.length - 1].suit}.png`;
        temp.append(pic);
    }
    if (checkScore(hand) > 21) {
        playerTurn = false;
        endGame();

    } else if (checkScore(hand) === 21 && hand.length == 2) {
        playerTurn = false;
        endGame();
    }
}

function discard() {
    while (cHand.length > 0) {
        discardPile.push(cHand.pop());
    }
    while (pHand.length > 0) {
        discardPile.push(pHand.pop());
    }
}

function refillDeck() {
    while (discardPile.length > 0) {
        deck.push(discardPile.pop());
    }
    amlostEmpty.classList.replace('hide', 'draw');
    for (let i = 0; i < topHalf.length; i++) {
        topHalf[i].classList.replace('hide', 'draw');
    }
    shuffle(deck);

}

function checkScore(hand) {
    let total = 0;
    for (let i = 0; i < hand.length; i++) {
        total += hand[i].value;
    }
    if (total > 21) {
        total = adjustAces(hand, total);
    }
    if (hand === pHand) {
        playerTotal.innerText = total;
    } else {
        computerTotal.innerText = total;
    }


    return total;
}

function compTurn() {
    while (checkScore(cHand) < 17) {
        deal(cHand);
    }

    if (gameRunning == true) {
        endGame();
    }
}

function compareScore() {
    if (checkScore(cHand) === checkScore(pHand)) {
        ties.innerText++;;
        gameRunning = false;
    } else if (checkScore(cHand) > checkScore(pHand)) {
        losses.innerText++;;
        gameRunning = false;
    } else {
        wins.innerText++;
        gameRunning = false;
    }
}

function endGame() {
    let temp = document.getElementsByClassName('compCard');
    for (let i = 0; i < temp.length; i++) {
        temp[i].innerHTML = "";
        let pic = document.createElement('img');
        pic.src = `images/${cHand[i].face}${cHand[i].suit}.png`;
        temp[i].append(pic);
    }
    computerTotal.classList.remove('hide');


    if (checkScore(pHand) > 21) {
        losses.innerText++;;
        gameRunning = false;
    } else if (checkScore(cHand) > 21) {
        wins.innerText++;
        gameRunning = false;
    } else {
        compareScore();
    }
}

function startGame() {
    if (gameRunning == false) {
        gameRunning = true;
        computerTotal.classList.add('hide');
        adjustAces(deck);

        deal(pHand);
        deal(cHand);
        deal(pHand);
        console.log(pHand)
        console.log(cHand)
        if (gameRunning == true) {
            deal(cHand);
            playerTurn = true;
            console.log(pHand)
            console.log(cHand)
        }
    }

}

function adjustAces(hand, total) {
    if (hand == deck) {
        for (let i = 0; i < hand.length; i++) {
            if (hand[i].face == 'A') {
                hand[i].value = 11;
            }
        }
    } else {
        for (let i = 0; i < hand.length; i++) {
            if (hand[i].face == "A" && hand[i].value == 11 && total > 21) {
                hand[i].value = 1;
                total -= 10;
            }
        }
        return total;
    }
}

function getAge(birth) {
    let current = new Date();
    let currentYear = current.getFullYear();
    let difference = currentYear - birth.getFullYear();
    var currentYearBirthday = new Date(currentYear, birth.getMonth(), birth.getDate());
    var afterBirthday = (current >= currentYearBirthday);

    if (afterBirthday) {
        return difference;
    } else {
        return difference - 1;
    }

}

function emptyDeck(deckName) {
    while (deckName.length > 0) {
        deckName.pop();
    }
}