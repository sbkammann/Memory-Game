let card1 = null;
let card2 = null;
let moveNum = 0;
//winNum will be used to determine if the user won the game
let winNum = null;
let starNum = 3;
// set up an array with values which will be assigned to cards to determine what the graphic will be and what card will pair with it
let cardValue = [];
for (let i=1; i<=8; i++){
  cardValue[2*(i-1)]=[i];
  cardValue[2*i-1]=[i];
}
let cardQueue = [];
let cQcounter = 0;
// img file names stored as a string
const imgPool = ['004-snorlax', '005-venonat', '006-charmander', '007-bullbasaur', '008-eevee', '009-squirtle', '010-pikachu', '011-meowth'];
//timer variables
let hours = 0;
let minutes = 0;
let seconds = 0;
let hourText = '00';
let minText = '00';
let secText = '00';
const timeArray = [[hours, hourText], [minutes, minText], [seconds, secText]];

// variable prevents user from flipping more than two cards at a time
let ready = true;

//triggers timer
let timerStart = false;

//checks what html file is being used and uses only applicable code on that page
if (document.URL.includes('index.html')){
  const parent = document.querySelector('#parent');
  const movesCounter = document.querySelector('#movesCounter');
  const starSpan = document.querySelector('#star');
  // sets up 16 x 16 card grid
  function makeGrid(){
    for (let i = 0; i < 4; i++){
      const row = document.createElement('div');
      parent.appendChild(row)
      for (let j = 0; j < 4; j++){
        // needed for unique card class
        const rn = (i+1).toString();
        const cn = (j+1).toString();
        // div creation step
        const container = document.createElement('div');
        const flipCard = document.createElement('div');
        const front = document.createElement('div');
        const back = document.createElement('div');
        // class set up step
        container.setAttribute('class', 'container');
        flipCard.setAttribute('class', 'flipCard');
        back.setAttribute('class', 'r'+ rn + 'c' + cn + ' ' + 'cell' + ' ' + 'back');
        front.setAttribute('class', 'front'+' '+'cell');
        //set position
        let picWidth = 128;
        let spaceTop =12;
        let spaceLeft =8;
        if (window.innerWidth < 530){
          picWidth = 65;
          spaceTop = 0;
          spaceLeft = 0;
        }
        const margin = (window.innerWidth - (picWidth*4))/2;
        container.style.top = (j * (picWidth+spaceTop) + 220).toString() + 'px';
        container.style.left = (i * (picWidth+spaceLeft) + margin).toString() + 'px';
        //append step
        flipCard.appendChild(front)
        flipCard.appendChild(back)
        container.appendChild(flipCard)
        row.appendChild(container)
        //adds an image to the back
        const  img = document.createElement('img');
        img.setAttribute('src', 'img/001-insignia.png');
        img.setAttribute('class', 'pic' + ' ' + i+j);
        front.appendChild(img);
      }
    }
  }

  //randomly assigns a value to a card
  function randomNum(){
    for (let i = 0; i < 4; i++){
      for (let j = 0; j < 4; j++){
        const rn = (i+1).toString();
        const cn = (j+1).toString();
        //selects card based on unique class
        const cardFront = document.querySelector('.' +'r'+ rn + 'c' + cn);
        const cardBack = cardFront.previousElementSibling;
        //generates random number
        const rand = Math.floor((Math.random()*(cardValue.length)));
        //assigns value to card
        const value = cardValue[rand];
        cardFront.setAttribute('value', value);
        cardFront.setAttribute('name', 'front');
        cardBack.setAttribute('value', value);
        cardBack.setAttribute('name', 'back');
        //remove assigned value from array
        cardValue.splice(rand,1);
      }
    }
  }

  //this adds graphic
  function addPara() {
    for (let i = 0; i < 4; i++){
      for (let j = 0; j < 4; j++){
        const rn = (i+1).toString();
        const cn = (j+1).toString();
        //selects card based on unique class
        const card = document.querySelector('.' +'r'+ rn + 'c' + cn);
        const value = card.getAttribute('value');
        const  img = document.createElement('img');
        img.setAttribute('src', 'img/' + imgPool[value-1]+'.png');
        img.setAttribute('class', 'pic');
        card.appendChild(img);
      }
    }
  }

  // checks to see if the cards  you click are a match
  function check(event){
    timerStart = true;
    if (event.target.parentElement.getAttribute('name') === 'back' && ready){
      if (cardQueue.length % 2 === 1){
        card2 = event.target;
        cardQueue.push(card2);
        cQcounter++;
        flipping(card2);
        ready = false;
        if (cardQueue[cQcounter-2].parentElement.getAttribute('value') === cardQueue[cQcounter-1].parentElement.getAttribute('value')){
          moveNum++;
          winNum++;
          cardQueue.splice(cQcounter-2, 2);
          cQcounter = cQcounter- 2;
          ready = true;
          if(winNum === 8){
            //save moveNum for win.html
            sessionStorage.setItem('moveNum', moveNum.toString());
            setTimeout(function(){window.location.href = "win.html";}, 1000);
          }
        }
        else{
          moveNum++;
          setTimeout(function(){ flipping(cardQueue[cQcounter-2])}, 1000);
          setTimeout(function(){ flipping(cardQueue[cQcounter-1])}, 1000);
          setTimeout(function(){ cardQueue.splice(cQcounter-2, 2)}, 1001);
          setTimeout(function(){ cQcounter = cQcounter- 2;}, 1001);
          setTimeout(function(){ ready = true}, 1001);
        }
      }
      else {
        card1 = event.target;
        cardQueue.push(card1);
        cQcounter++;
        flipping(card1);
        return card1;
      }
    movesCounter.textContent = moveNum.toString();
    star();
    }
  }

  //sets the star skill rating
  function star(){
    const star3 = document.getElementById('star3');
    if (moveNum === 9){
      const rm = star3.firstElementChild
      star3.removeChild(rm);
      starNum =2;
    }
    if (moveNum === 17){
      const rv = star3.firstElementChild
      star3.removeChild(rv);
      starNum =1;
    }
    sessionStorage.setItem('starNum', starNum.toString());
  }

  function flipping(card){
    const flipCard = card.parentElement.parentElement;
    if (flipCard.getAttribute('style') !== 'transform: rotateY(0deg);' && flipCard.getAttribute('style') != null){
      flipCard.style.transform = 'rotateY(0deg)';
    }
    else {
      flipCard.style.transform = 'rotateY(180deg)';
    }
   }

   // timer
   setInterval(function() {
     if (timerStart){
     timeArray[2][0]++;
     if (timeArray[2][0] === 60){
       timeArray[1][0]++;
       timeArray[2][0] = 0;
     }
     if (timeArray[1][0] === 60){
       timeArray[0][0]++;
       timeArray[1][0] =0;
     }
     for (let i = 0; i < timeArray.length; i++){
       if (timeArray[i][0].toString().length < 2){
         timeArray[i][1] = '0' + timeArray[i][0].toString();
       }
       else {
         timeArray[i][1] = timeArray[i][0].toString();
       }
      }
     let time = `${timeArray[0][1]}:${timeArray[1][1]}:${timeArray[2][1]}`;
     document.getElementById("timeDisplay").innerHTML = time;
     sessionStorage.setItem('time', time);
   }
   }, 1000);

  makeGrid();
  randomNum();
  addPara();

  parent.addEventListener('click', check);
  const restart = document.getElementById('restart');
  restart.addEventListener('click', function(){location.reload();});
  window.addEventListener('resize', function(){location.reload();});
}

// applies JS code of win.html
else {
  const para = document.getElementById('one');
  const button = document.querySelector('button');
  const text = sessionStorage.getItem('time');
  const text1 = sessionStorage.getItem('moveNum');
  const text2 = sessionStorage.getItem('starNum');
  const text3 = sessionStorage.getItem('plural');
  let message = `It took you ${text} with ${text1} moves and `;
  para.textContent = message;
  stars(text2);
  button.addEventListener('click', function load(){
    sessionStorage.removeItem('moveNum', 'starNum');
    window.location.href = "index.html";
  });

  function stars(s){
    const two = document.getElementById('two');
    const  img = document.createElement('img');
    img.setAttribute('src', 'img/013-star.png');
    img.setAttribute('id', 'star');
   for (let i = 0; i < s; i++){
     const  img = document.createElement('img');
     img.setAttribute('src', 'img/013-star.png');
     img.setAttribute('class', 'star');
     two.appendChild(img);
   }
  }
}
