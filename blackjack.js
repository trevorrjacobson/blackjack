let deck = [];
let discardPile = [];
let pHand = [];
let cHand = [];
let suitList = ["club", "heart", "diamond", "spade"];
let faceList = ["jack", "queen", "king"];
let wins = 0;
let losses = 0;
let ties = 0;
let gameRunning = false;
for (let i = 0; i < 4; i++) {
    for (let j = 2; j <= 10; j++) {
        deck.push({ value: j, face: j, suit: suitList[i] })
    }
    for (let j = 0; j < 3; j++) {
        deck.push({ value: 10, face: faceList[j], suit: suitList[i] })
    }
    deck.push({ value: 11, face: "ace", suit: suitList[i] })
}

shuffle(deck);

console.log(deck);

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function deal(hand) {
    if (deal.length < 10) {
        refill();
    }
    hand.push(deck.pop())
    if (checkScore(pHand) > 21) {
        endGame();
    }
    if (checkScore(hand) === 21) {
        endGame();
    }

}

function endGame() {
    if (checkScore(pHand) > 21) {
        losses++
        gameRunning = false
    } else if (checkScore(cHand) > 21) {
        wins++
        gameRunning = false

    } else {
        compareScore
    }
}

function discard() {
    while (pHand.length > 0) {
        discardPile.push(pHand.pop())
    }
    while (cHand.length > 0) {
        discardPile.push(cHand.pop())
    }
}

function refill() {
    while (discardPile.length > 0) {
        deck.push(discardPile.pop())
    }
    shuffle(deck);
}

function checkScore(hand) {
    let total = 0
    for (let i = 0; i < hand.length; i++) {
        total += hand[i].value;
    }
    return total;

}

function compTurn() {
    while (checkScore(cHand) < 17) {
        deal(cHand);
    }
    endGame();
}

function compareScore() {
    if (checkScore(pHand) == checkScore(cHand)) {
        ties++
        gameRunning = false

    } else if (checkScore(pHand) > checkScore(cHand)) {
        wins++
        gameRunning = false

    } else {
        losses++
        gameRunning = false

    }
}

function startGame() {
    if (gameRunning = false) {
        discard();
        refill();
        gameRunning = true;
        deal(pHand);
        deal(cHand);
        deal(pHand);
        if (gameRunning = true) {
            deal(cHand);
        }
    }
}