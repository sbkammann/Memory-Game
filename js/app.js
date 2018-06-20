
let card1 = null;
let card2 = null;
let moveNum = 0;
//winNum will be used to determine if the user won the game
let winNum = null;
let starNum = null;
//this is for the text that tells the user how many starts they had when they won. If they only have one star this gets set to '!'
let plural = 's!';
// set up an array with values which will be assigned to cards to determine what the graphic will be and what card will pair with it
let cardValue = [];
for (let i=1; i<=8; i++){
  cardValue[2*(i-1)]=[i];
  cardValue[2*i-1]=[i];
}
// img file names stored as a string
const imgPool = ['004-snorlax', '005-venonat', '006-charmander', '007-bullbasaur', '008-eevee', '010-pikachu', '011-meowth'];

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
        const column = document.createElement('div');
        const rn = (i+1).toString();
        const cn = (j+1).toString();
        column.setAttribute('id','r'+rn + 'c' + cn);
        column.setAttribute('class', 'cell');
        row.appendChild(column)
      }
    }
  }

  //randomly assigns a value to a card
  function randomNum(){
    for (let i = 0; i < 4; i++){
      for (let j = 0; j < 4; j++){
        const rn = (i+1).toString();
        const cn = (j+1).toString();
        //selects card based on unique id
        const card = document.querySelector('#' +'r'+ rn + 'c' + cn);
        //generates random number
        const rand = Math.floor((Math.random()*(cardValue.length-1)));
        //assigns value to card
        const cardAssign = card.setAttribute('value', cardValue[rand]);
         //remove assigned value from array
        cardValue.splice(rand,1);
      }
    }
  }

  //this will be add graphic later
  function addPara() {
    for (let i = 0; i < 4; i++){
      for (let j = 0; j < 4; j++){
        const rn = (i+1).toString();
        const cn = (j+1).toString();
        //selects card based on unique id
        const card = document.querySelector('#' +'r'+ rn + 'c' + cn);
        const value = card.getAttribute('value');
        
        const t = document.createTextNode(value);
        const  para = document.createElement('p');
        para.appendChild(t);
        card.appendChild(para);
      }
    }
  }

  // checks to see if the cards  you click are a match
  function check(event){

    event.target.style.backgroundColor = 'grey';
    if (card2){
      card1 = event.target;
      if (card1.getAttribute('value') === card2.getAttribute('value')){
        //maybe add a check to see if the card has already been matched. should not have cards count towards move if it has already been flipped
        moveNum++;
        winNum++;
        // yellow is supposed to indicate a match
        card1.style.backgroundColor = 'yellow';
        card2.style.backgroundColor = 'yellow';
        reset();
        if(winNum === 8){
          //save moveNum for win.html
          sessionStorage.setItem('moveNum', moveNum.toString());
          window.location.href = "win.html";
          // I would like to add some code that makes the transition smoother. It's very abrupt and jarring. Maybe an animation.
        }
      }
      else{
        moveNum++;
        // setting the background color to white is supposed to simulte turning the card around again
        card1.style.backgroundColor = 'white';
        card2.style.backgroundColor = 'white';
        reset();
      }
    }
    else {
      return card2 = event.target;
    }

  movesCounter.textContent = moveNum.toString();
  star();
  }

  // reset the card variables
  function reset(){
    card1 = null;
    card2 = null;
  }

  function cookie(name, value) {
    document.cookie = name + "=" + value + ";";
  }
  // sets the star skill rating
  function star(){
    let t ='***';
    let starNum =3;
    if (moveNum > 8 && moveNum < 16){
      t ='**';
      starNum =2;
    }
    if (moveNum >= 16){
      t ='*';
      plural ='!';
      starNum =1;
    }
     starSpan.textContent = t;
     sessionStorage.setItem('starNum', starNum.toString());
     sessionStorage.setItem('plural', plural);
  }

  makeGrid();
  randomNum();
  addPara();

  parent.addEventListener('click', check);
}

// applies JS code of win.html
else {
  const para = document.querySelector('p');
  const button = document.querySelector('button');
  const text1 = sessionStorage.getItem('moveNum');
  const text2 = sessionStorage.getItem('starNum');
  const text3 = sessionStorage.getItem('plural');
  let message = `With ${text1} Moves and ${text2} Star${text3}`;
  para.textContent = message;
  button.addEventListener('click', function load(){
    sessionStorage.removeItem('moveNum', 'starNum', 'plural');
    window.location.href = "index.html";
  })
}
