const parent = document.querySelector('#parent');
let card1 = null;
let card2 = null;
const movesCounter = document.querySelector('#movesCounter')
let moveNum = null;
//winNum will be used to determine if the user won the game
let winNum = null;
// set up an array with values which will be assigned to cards to determine what the graphic will be and what card will pair with it
let cardValue = [];
for (let i=1; i<=8; i++){
  cardValue[2*(i-1)]=[i];
  cardValue[2*i-1]=[i];
}

//checks what html file is being used and uses only applicable code on that page
if (document.URL.includes('index.html')){

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
    moveNum++;
    movesCounter.textContent = moveNum.toString();
    event.target.style.backgroundColor = 'grey';
    if (card2){
      card1 = event.target;
      if (card1.getAttribute('value') === card2.getAttribute('value')){
        winNum++;
        // yellow is supposed to indicate a match
        card1.style.backgroundColor = 'yellow';
        card2.style.backgroundColor = 'yellow';
        reset();
        if(winNum === 8){
          window.location.href = "win.html";
          // I would like to add some code that makes the transition smoother. It's very abrupt and jarring. Maybe an animation.
        }
      }
      else{
        // setting the background color to white is supposed to simulte turning the card around again
        card1.style.backgroundColor = 'white';
        card2.style.backgroundColor = 'white';
        reset();
      }
    }
    else {
      return card2 = event.target;
    }
  }

  // reset the card variables
  function reset(){
    card1 = null;
    card2 = null;
  }

  makeGrid();
  randomNum();
  addPara();

  parent.addEventListener('click', check);
}

// applies JS code of win.html
else {

  const button = document.querySelector('button');
  button.addEventListener('click', function load(){
    window.location.href = "index.html";
  })

}
