class Player {
    constructor(n) {
        this.name = n;
        this.cards = [];
        this.points = 0;
    }
}

class Choice {
    constructor(playerIdx, card) {
        this.playerIdx = playerIdx;
        this.card = card;
    }
}

class Game {
    constructor() {
        this.prompt = null;
        this.options = [];
    }
}

var players = [];
let czar = 0;
let choosing = 0;
let game = new Game();
let to_choose;
let n_choosed = 0;
let round_winners = [];
let local_prompt;

let playersInput = [];
let playersSubmit;
let playersInputForm;
let playersInputLabel;
let playersNames;
let playersNamesDiv;
let promptDiv;
let deckDiv;
let pointsTo;
let prossimaMano;
let prossimaManoDiv;
let prossimoGiocatore;

let fastShuffleDeck = (deck) => {
    for (let i = 0; i < deck.length; i++) {
        let newPos = rndInt(0, deck.length - 1);
        let card = deck.shift();
        deck.splice(newPos, 0, card);
    }
    return deck;
}

let shuffleDeck = (deck) => {
    let originalCard = deck[0];
    let topCount = 0;

    while (topCount < 3) {
        let newPos = rndInt(0, deck.length - 1);
        let card = deck.shift();
        if (originalCard == card) {
            topCount += 1;
        }
        deck.splice(newPos, 0, card);
    }
    return deck;
}

let getPlayerCards = (player) => {
    while (player.cards.length < 10 && cards.length > 0) {
        player.cards.push(cards.shift());
    }
}

let playerUseCard = (player, index) => {
    cards.push(player.cards.splice(index, 1));
}

let updatePlayerLabels = () => {
    removeChildren(playersNamesDiv);
    players.forEach(function (p, index) {
        let playerNameLabel = document.createElement("div");
        playerNameLabel.style = `text-align: center; margin: 0 1em 0 1em; max-width: ${Math.floor(100/players.length)}vw;${index === czar ? "color: #fce200;" : ""}`

        if (index === choosing) {
            playerNameLabel.innerHTML = `<b>${p.name}</b><br/>${p.points}`;
        } else {
            playerNameLabel.innerHTML = `${p.name}<br/>${p.points}`;
        }

        playersNamesDiv.appendChild(playerNameLabel);
    });
}

let newPrompt = () => {
    removeChildren(promptDiv);
    game.prompt = prompts.shift();
    to_choose = (game.prompt.match(/@/g) || []).length;
    if (to_choose <= 0) {
        newPrompt();
    } else {

        let promptLabel = document.createElement("h3");
        promptLabel.innerHTML = game.prompt.replaceAll('@', '__________');
        promptDiv.appendChild(promptLabel);
    }
}

let updateLocalPrompt = () => {
    removeChildren(promptDiv);
    let promptLabel = document.createElement("h3");
    promptLabel.innerHTML = local_prompt.replaceAll('@', '__________');
    promptDiv.appendChild(promptLabel);
}

let setUpPlayerScene = () => {
    removeChildren(deckDiv);
    n_choosed = 0;
    local_prompt = game.prompt;
    updateLocalPrompt();

    if (choosing === czar) {
        game.options = shuffleDeck(game.options);
        
        for (let [c, pidx] of game.options) {
            let cardDiv = document.createElement("div");
            let cardLabel = document.createElement("h6");
            cardLabel.innerHTML = c;
            cardDiv.className = "card";
            cardDiv.onclick = () => {
                n_choosed++;
                players[pidx].points += 1;
                
                local_prompt = local_prompt.replace('@', `<em>${c}</em>`);
                updateLocalPrompt();

                round_winners.push(players[pidx].name);
                if (to_choose === n_choosed) {
                    czar = (((czar - 1) % players.length) + players.length) % players.length;
                    
                    game.options = [];
                    
                    updatePlayerLabels();
                    removeChildren(deckDiv);
                    if (round_winners.length > 1) {
                        pointsTo.innerHTML = `<h5>I punti vanno a: <em>${round_winners.join(', ')}</em></h5>`
                    } else {
                        pointsTo.innerHTML = `<h5>Il punto va a: <em>${round_winners[0]}</em></h5>`
                    }
                    show(pointsTo);
                    show(prossimaMano);
                    cardDiv.remove();
                }

            }
            cardDiv.appendChild(cardLabel);
            deckDiv.appendChild(cardDiv);
        }
        
        return;
    }

    let player = players[choosing];
    for (let c of player.cards) {
        let cardDiv = document.createElement("div");
        let cardLabel = document.createElement("h6");
        cardLabel.innerHTML = c;
        cardDiv.className = "card";
        cardDiv.onclick = () => {
            n_choosed++;
            let chosen = player.cards.splice(player.cards.indexOf(c), 1);
            game.options.push([chosen, choosing]);
            local_prompt = local_prompt.replace('@', `<em>${c}</em>`);
            updateLocalPrompt();
            if (n_choosed == to_choose) {
                choosing++;
                choosing = choosing % players.length;
                removeChildren(deckDiv);
                show(prossimoGiocatore);
            }
            cardDiv.remove();
        }
        cardDiv.appendChild(cardLabel);
        deckDiv.appendChild(cardDiv);
    }
}

window.onload = () => {
    cards = shuffleDeck(cards);
    prompts = shuffleDeck(prompts);

    for (let i = 1; i <= 10; i++) {
        playersInput.push(document.getElementById(`giocatore${i}`));
    }
    playersInput[0].focus()
    playersInputForm = document.getElementById("partecipanti");
    playersInputLabel = document.getElementById("playersinputlabel");
    playersSubmit = document.getElementById("inseritogiocatori");
    playersNames = document.getElementById("playersnames");
    playersNamesDiv = document.getElementById("names");
    promptDiv = document.getElementById("prompt");
    deckDiv = document.getElementById("scelta");
    pointsTo = document.getElementById("punti-a");
    prossimaMano = document.getElementById("prossima-mano");
    prossimaManoDiv = document.getElementById("prossima-mano-div");
    prossimoGiocatore = document.getElementById("prossimo-giocatore");

    playersSubmit.onclick = () => {
        // get names
        for (let input of playersInput) {
            if (input.value && input.value.length !== 0) {
                players.push(new Player(input.value.substring(0,16)));
            }
        }

        if (players.length < 3) {
            playersInputLabel.innerHTML = "<span style=\"color: red;\"><b>DEVI INSERIRE ALMENO 3 GIOCATORI PER POTER GIOCARE</b></span>"
            playersInputLabel.scrollIntoView()
            players = [];
            return;
        }
        playersInputLabel.innerHTML = "Inserisci almeno 3 partecipanti..."
        hide(playersInputForm);

        // set name labels
        czar = players.length - 1;
        updatePlayerLabels();
        show(playersNames);
        
        
        for (let p of players) {
            getPlayerCards(p);
        }

        show(prossimaManoDiv);
        show(promptDiv);
        newPrompt();
        show(deckDiv)
        setUpPlayerScene();
    }
    prossimaMano.onclick = () => {
        choosing = (czar + 1) % players.length;
        round_winners = [];
        game.options = [];
        for (let p of players) {
            getPlayerCards(p);
        }
        hide(pointsTo);
        hide(playersInputForm);
        newPrompt();
        setUpPlayerScene();
    }
    prossimoGiocatore.onclick = () => {
        hide(prossimoGiocatore);
        updatePlayerLabels();
        setUpPlayerScene();
    }
};