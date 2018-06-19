const parent = document.querySelector('#parent');

// sets up 16 x 16 card grid
function makeGrid(){
  for (let i = 0; i < 4; i++){
    const row = document.createElement('div');
    parent.appendChild(row)
    for (let j = 0; j < 4; j++){
      const column = document.createElement('div');
      const rn = (i+1).toString();
      const cn = (j+1).toString();
      column.setAttribute('class', 'cell');
      column.setAttribute('id',rn + cn);
      row.appendChild(column)
    }
  }
}

makeGrid();
