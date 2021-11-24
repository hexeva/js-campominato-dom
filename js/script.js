// L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro. 

// QUANDO PREMO PLAY:
    // [1] sparisce l'h2 e appare la griglia
    // [2] verificare cosa ha scelto l'utente
     // appaiono tanti quadrati quanto la scelta di difficoltà dell'utente i quadrati dando classe square e popolare il quadrato con span e numero + dare altezza e larghezza al quadrato a seconda della difficoltà.

                                        // FASE 2
    //  Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
    //  I numeri nella lista delle bombe non possono essere duplicati.
    //  In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
    //  La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
    //  Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.


// al singolo CLICK della cella aggiungo la classe color 

// AL PLAY:
// seleziono il pulsante e lo salvo in una variabile
const playButton = document.getElementById('play-btn');

// aggiungo evento al pulsante collegato alla funzione creata START_GAME

playButton.addEventListener('click',startGame); 

// array delle bombe
 let bombArray =[];

//  array tentativi indovinati dall'utente
let rightAttempt =[];



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

    // GENERIAMO LE BOMBE con un array
    
    

    // ciclo while girerà finchè nn avrà pushato nell'array 16 elementi non uguali

    while(bombArray.length < 16){
        const randomBomb = getRndInteger(1,maxGridNumber);
        // se randomBomb non è presente nell'array lo pusho
        if(!bombArray.includes(randomBomb)){
            bombArray.push(randomBomb);

        }
        console.log(bombArray);
    }

    // creo ora un ciclo for per andare volta volta a popolare la main grid con un nuovo quadrato

    // IL quadrato sarà il risultato della funzione che ho creato (generatedSquare)
    for(let i = 1; i <= maxGridNumber; i++){
        const newGeneratedSquare = generatedSquare(i,squareDimension);

        // creo anche l'evento al click che vada ad aggiungere a ogni singolo quadrato la classe color 
        // cellClick è la funzione di callback per il quadratino
        newGeneratedSquare.addEventListener('click',cellClick);

        // appendo ora il nuovo elemento al padre

        
     gameGrid.appendChild(newGeneratedSquare);

    }




function cellClick(){

    // se clicco su un quadrato:
        // prelevo il numero scritto nel quadrato con il THIS
        const squareNumber = parseInt(this.querySelector('span').textContent);
        
       
        //  se il numero è presente nell'array BOMBE >> aggiungo classe bomb alla cella e tolgo la classe color

        if(bombArray.includes(squareNumber)){
            
            this.classList.add('bomb');
            this.style.pointerEvents ='none';
            
        } else{
            this.classList.add('color');
            this.style.pointerEvents ='none';
            // aggiungo i tentativi andati a buon fine nell'array rightAttempt
            rightAttempt.push(squareNumber);
            console.log(rightAttempt)
        }
    
}
// fine funzione callback del quadrato

    
}
// FINE FUNZIONE PRINCIPALE

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




function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }