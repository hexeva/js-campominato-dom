// L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro. 

// QUANDO PREMO PLAY:
    // [1] sparisce l'h2 e appare la griglia
    // [2] verificare cosa ha scelto l'utente
     // appaiono tanti quadrati quanto la scelta di difficoltà dell'utente i quadrati dando classe square e popolare il quadrato con span e numero + dare altezza e larghezza al quadrato a seconda della difficoltà.

// al singolo CLICK della cella aggiungo la classe color 

// AL PLAY:
// seleziono il pulsante e lo salvo in una variabile
const playButton = document.getElementById('play-btn');

// aggiungo evento al pulsante collegato alla funzione creata START_GAME

playButton.addEventListener('click',startGame); 





// FUNZIONI

// funzione di inizio gioco

function startGame(){
    //  sparisce l'h2 dandogli classe hidden appare la griglia togliendo la classe hidden
    // seleziono l'h2
    const gameText = document.getElementById('game-istructions');
    console.log(gameText);
    // aggiungo la classe hidden
    gameText.classList.add('hidden');
    // seleziono la griglia 
    const gameGrid = document.querySelector('.game-table');
    console.log(gameGrid);
    // rimuovo la classe hidden
    gameGrid.classList.remove('hidden');
    // resetto il la griglia a ogni start
    gameGrid.innerHTML = '';

    // [2] verificare cosa ha scelto l'utente
    // prima richiamo e memorizzo in una variabile cosa la select dell'html

    const levelSelect = document.getElementById('choose').value;
    
    // let level;

    // creo un numero di quadrati in base alla selezione della difficoltà
    // definisco una variabile per il numero di quadrati e una variabile per le sue dimensioni:
    let maxGridNumber;
    let squareDimension;
    // a seconda della scelta select MaxGridNumber prenderà un valore
    if(levelSelect == 'easy'){
        maxGridNumber = 100;
        squareDimension = 10;
    }else if(levelSelect == 'hard'){

        maxGridNumber =  81;
        squareDimension = 9;

    }else {

        maxGridNumber = 49;
        squareDimension = 7;

    }

    // creo ora un ciclo for per andare volta volta a popolare la main grid con un nuovo quadrato

    // IL quadrato sarà il risultato della funzione che ho creato (generatedSquare)
    for(let i = 1; i <= maxGridNumber; i++){
        const newGeneratedSquare = generatedSquare(i,squareDimension);

        // creo anche l'evento al click che vada ad aggiungere a ogni singolo quadrato la classe color 
        // cellClick è la funzione di callback per il quadratino
        newGeneratedSquare.addEventListener('click',cellClick),

        // appendo ora il nuovo elemento al padre

        gameGrid.appendChild(newGeneratedSquare);


    }

}
// fine funzione principale

// funzione per generare i quadrati:
    // argomenti:
//    innerNumber = il numero che è dentro ogni quadrato
//    cellDimension = la dimensione del quadrato
//  return = la cella completa pronta per essere appeso

// variabile della funzione 



function generatedSquare(innerNumber,cellDimension){
    // creo il nuovo elemnto
    const newCell = document.createElement('div');
    // aggiungere classe square
    newCell.classList.add('square');
    // popolare il quadrato con lo span e il suo contenuto
    newCell.innerHTML = `<span>${innerNumber}</span>`;
    // dare dimensioni ai quadrati
    newCell.style.width = `calc(100% / ${cellDimension})`;
    newCell.style.height = `calc(100% / ${cellDimension})`;
    // return
    return newCell;


}
// fine funzione generatedSquare

// funzione cellClick per aggiungere la classe color al singolo quadrato

function cellClick(){
    this.classList.add('color');
}


