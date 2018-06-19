const parent = document.querySelector('#parent');

// set up an array with values which will be assigned to cards to determine what the graphic will be and what card will pair with it
let cardValue = [];
for (let i=1; i<=8; i++){
  cardValue[2*(i-1)]=[i];
  cardValue[2*i-1]=[i];
}

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



makeGrid();
randomNum();
addPara();
