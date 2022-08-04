// load total wins from local storage if available
let bingoWins = 0;
let storedWins = localStorage.getItem('bingowins');
if (storedWins !== null){
  bingoWins = JSON.parse(storedWins);
  document.getElementById('wins').innerHTML = bingoWins;
}

// load text into squares
for(let i = 1; i <= text.length; i++){
  document.getElementById(i).innerHTML = text[i-1];
}

// change square to red if not already selected; turn back to white if already selected
// check bingo each time a new square is selected
selectSquare = (id) => {
  const square = document.getElementById(id);
    !selected(id)
      ? (square.style.backgroundColor = "rgb(255, 204, 203)")
      : (square.style.backgroundColor = "white");
    checkBingo(id);
}

// checks each type of bingo and saves bingo count
checkBingo = (id) => {
  if (columnBingo(id) || rowBingo(id) || diagBingo(id)) {
    setTimeout(() => { 
      window.alert("BINGO!");
    },25)
    bingoWins++;
  }
  window.localStorage.setItem('bingowins', bingoWins);
  document.getElementById("wins").innerHTML = bingoWins;
}

// check column for bingo
columnBingo = (id) => {
  const col = (id%5===0) ? 5 : id%5;
  for (let i = col; i <= 25; i += 5) {
    if (!selected(i)) return false;
  }
  return true;
}

// check row for bingo
rowBingo = (id) => {
  const col = (id%5===0) ? 5 : id%5;
  const rowToStart = id - col + 1;
  for (let i = rowToStart; i < (rowToStart + 5); i++){
    if (!selected(i)) return false;
  }
  return true;
}

// check for diagonal bingo (only two specific ways)
diagBingo = (id) => {
  if (id == 1 ||  id == 7 ||  id == 13 ||  id == 19 ||  id == 25){
    if (selected(1) && selected(7) && selected(13) && selected(19) && selected(25)) return true;
  } else if (id == 5 || id == 9 || id == 13 || id == 17 || id == 21) {
    if (selected(5) && selected(9) && selected(13) && selected(17) && selected(21)) return true;
  } else {
    return false;
  }
}

//check if square is selected (red)
selected = (id) => {
    result =
      document.getElementById(id).style.backgroundColor === "rgb(255, 204, 203)"
        ? true
        : false;
    return result;
}

resetBoard = () => {
  window.location.reload();
  return false;
}