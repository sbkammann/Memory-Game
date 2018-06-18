const parent = document.querySelector('#parent');

// sets up 16 x 16 card grid
function makeGrid(){
  for (let i = 0; i < 4; i++){
    const row = document.createElement('div');
    parent.appendChild(row)
    for (let j = 0; j < 4; j++){
      const column = document.createElement('div');
      column.setAttribute('class', 'cell');
      row.appendChild(column)
    }
  }
}

makeGrid();
