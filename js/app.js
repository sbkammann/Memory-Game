let card1 = null;
let card2 = null;
let moveNum = 0;
//winNum will be used to determine if the user won the game
let winNum = null;
let starNum = 3;
//this is for the text that tells the user how many starts they had when they won. If they only have one star this gets set to '!'
let plural = 's!';
// set up an array with values which will be assigned to cards to determine what the graphic will be and what card will pair with it
let cardValue = [];
for (let i=1; i<=8; i++){
  cardValue[2*(i-1)]=[i];
  cardValue[2*i-1]=[i];
}
// allows users to click next card pair before previous card pair has flipped
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
        container.setAttribute('class', 'container'); //was container
        flipCard.setAttribute('class', 'flipCard');
        back.setAttribute('class', 'r'+rn + 'c' + cn +' '+'cell'+' '+'back');
        front.setAttribute('class', 'front'+' '+'cell'); //back
        //set position

        let picWidth = 128;
        if (window.innerWidth < 530){
          picWidth = 65;
        }
        const margin = (window.innerWidth - (picWidth*4))/2;
        container.style.top = (j * (picWidth+12) + 220).toString() + 'px';
        container.style.left = (i * (picWidth+8) + margin).toString() + 'px';
        //append step
        flipCard.appendChild(front)
        flipCard.appendChild(back)
        container.appendChild(flipCard) //was container
        row.appendChild(container)

        //adds an image to the back
        const  img = document.createElement('img');
        img.setAttribute('src', 'img/001-insignia.png');
        img.setAttribute('class', 'pic');
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
        // const cardAssign =
        cardFront.setAttribute('value', value);
        cardBack.setAttribute('value', value);
         //remove assigned value from array
        cardValue.splice(rand,1);
      }
    }
  }

  //this adds graphic later
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
        // img.setAttribute('value', value);
        // img.setAttribute('class', 'r'+ rn + 'c' + cn);
        card.appendChild(img);
      }
    }
  }

  // checks to see if the cards  you click are a match
  function check(event){

    // event.target.style.backgroundColor = 'grey';
    if (cardQueue.length % 2 === 1){
      card2 = event.target;
      cardQueue.push(card2);
      cQcounter++;
      flipping(card2);
      if (cardQueue[cQcounter-2].parentElement.getAttribute('value') === cardQueue[cQcounter-1].parentElement.getAttribute('value')){
      //  if (card1.parentElement.getAttribute('value') === card2.parentElement.getAttribute('value')  && card2.parentElement.getAttribute('class').split(' ')[0] === 'front' && card1.parentElement.getAttribute('class').split(' ')[0] === 'front'){  //&& card1.getAttribute('class').split(' ')[0] !== card2.getAttribute('class').split(' ')[0]
        //maybe add a check to see if the card has already been matched. should not have cards count towards move if it has already been flipped
        moveNum++;
        winNum++;
        // yellow is supposed to indicate a match
        // card1.style.backgroundColor = 'red';
        // card2.style.backgroundColor = 'red';
        console.log('match');
        cardQueue.splice(cQcounter-2, 2);
        cQcounter = cQcounter- 2;
        //reset(); // remove from card queue isntead of reset
        if(winNum === 8){
          //save moveNum for win.html
          sessionStorage.setItem('moveNum', moveNum.toString());
          setTimeout(function(){window.location.href = "win.html";}, 1000);
          // I would like to add some code that makes the transition smoother. It's very abrupt and jarring. Maybe an animation.
        }
      }
      else{
        moveNum++;
        // setting the background color to white is supposed to simulte turning the card around again
        card1.style.backgroundColor = 'white';
        card2.style.backgroundColor = 'white';

        // setTimeout(flipping(event), 5000); // delay of 3 seconds
        setTimeout(function(){ flipping(cardQueue[cQcounter-2])}, 1000); //put card 2
        setTimeout(function(){ flipping(cardQueue[cQcounter-1])}, 1000);
        setTimeout(function(){ cardQueue.splice(cQcounter-2, 2)}, 1001);
        setTimeout(function(){ cQcounter = cQcounter- 2;}, 1001);


        // setTimeout(function(){ flipping(card2)}, 1000); //original
        // setTimeout(function(){ flipping(card1)}, 1000);
        // setTimeout(function(){ reset()}, 1001);
        // flipping(event);
      }
    }
    else {
      card1 = event.target;  // there was a return here
      cardQueue.push(card1);
      cQcounter++;
      flipping(card1);
      return card1; // return cardQueue?

    }

  movesCounter.textContent = moveNum.toString();
  star();
  }

  // reset the card variables
  function reset(){
    card1 = null;
    card2 = null;
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

  function flipping(card){ //was event
    // const flipCard = document.querySelector('.flipCard');
    const flipCard = card.parentElement.parentElement;  //I don't want this to grab container had event.target
    if (flipCard.getAttribute('style') !== 'transform: rotateY(0deg);' && flipCard.getAttribute('style') != null){
      flipCard.style.transform = 'rotateY(0deg)';
    }
    else {
      flipCard.style.transform = 'rotateY(180deg)';
    }
   }

   // timer


   setInterval(function() {
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
   }, 1000);


   //dynamically change position of cards
   // function positionGrid(){
   //   for (let i = 0; i < 4; i++){
   //     for (let j = 0; j < 4; j++){
   //
   //       const rn = (i+1).toString();
   //       const cn = (j+1).toString();
   //       const back = document.querySelector('.' +'r'+ rn + 'c' + cn);
   //       const container = back.parentElement.parentElement;
   //       const margin = (window.innerWidth - 512)/2;
   //       // container.style.top = (j * 128 + 200).toString() + 'px';
   //       container.style.left = (i * 128 + margin).toString() + 'px';
   //    }
   //  }
   // }

  makeGrid();
  randomNum();
  addPara();

  parent.addEventListener('click', check);
  // window.addEventListener('sizemodechange', positionGrid);
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
  })

  function stars(s){
    const two = document.getElementById('two');
    // const three = document.getElementById('three');
    // const spanBox = document.querySelector('#spanBox');
    const  img = document.createElement('img');
    img.setAttribute('src', 'img/013-star.png');
    img.setAttribute('id', 'star');
   for (let i = 0; i < s; i++){
     const  img = document.createElement('img');
     img.setAttribute('src', 'img/013-star.png');
     img.setAttribute('class', 'star');
     two.appendChild(img);
   }
   // let message2 = `Star${text3}`;
   //  three.textContent = message2;
  }
}
