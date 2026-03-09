console.log("loaded");

//width board / width cell * height board / height cell
//width board / width cell * width board / width cell
const NUM_CELLS = 80;
const CHECK_FREQUENCY = 10;

let board;
let restartBtn;
let tabCells = [];
let tabAlive = [];
let interval;

const generateBoard = () => {
  //générer le board
  //	créer une div (createElement), autant que de NUM_CELLS
  //	ajouter la classe cell
  //	injecter dans le board (appendChild)

  for (let i = 0; i < NUM_CELLS; i++) {
    // x 40 lignes

    tabCells.push([]);

    for (let j = 0; j < NUM_CELLS; j++) {
      // x40 colonnes
      let cell = document.createElement("div");
      cell.classList.add("cell");
      board.appendChild(cell);

      //Math.random() -> aléatoire en 0 et 1
      //vrai ou faux
      if (Math.random() >= 0.5) {
        cell.classList.add("alive");
      }

      //à chaque cellule créée, l'ajoute dans le tableau tabCells
      tabCells[i].push(cell);
    }
  }
  // tabCells[19][0].classList.add("alive");

  //change la 644e cellule en alive
  //tabCells[643].classList.add("alive");
};

const checkBoard = () => {
  //stocke quelques cellules sont vivantes ou morte à l'entrée de la verification
  tabAlive = [];
  for (let y = 0; y < NUM_CELLS; y++) {
    tabAlive.push([]);
    for (let x = 0; x < NUM_CELLS; x++) {
      let currentCell = tabCells[y][x];
      if (currentCell.classList.contains("alive")) {
        tabAlive[y][x] = true;
      } else {
        tabAlive[y][x] = false;
      }
    }
  }

  //console.log(tabAlive);

  //prends chaque cellule et vérifie si ses voisins sont vivants
  for (let y = 0; y < NUM_CELLS; y++) {
    for (let x = 0; x < NUM_CELLS; x++) {
      let currentCell = tabCells[y][x];

      let aliveNeighbours = 0;

      //NW
      //limite pour ne pas interroge une cellule avant 0 en x et en y et récupération de la cellule en haut à gauche de la cellule actuelle
      if (x > 0 && y > 0 && tabAlive[y - 1][x - 1]) {
        if (tabAlive[y - 1][x - 1]) {
          //  console.log("NW est vivant");
          aliveNeighbours++;
        }
      }

      //N
      if (y > 0 && tabAlive[y - 1][x]) {
        if (tabAlive[y - 1][x]) {
          //  console.log("N est vivant");
          aliveNeighbours++;
        }
      }

      //NE
      if (x < NUM_CELLS - 1 && y > 0 && tabAlive[y - 1][x + 1]) {
        if (tabAlive[y - 1][x + 1]) {
          //  console.log("NE est vivant");
          aliveNeighbours++;
        }
      }

      //W
      if (x > 0 && tabAlive[y][x - 1]) {
        if (tabAlive[y][x - 1]) {
          //  console.log("W est vivant");
          aliveNeighbours++;
        }
      }

      //E
      if (x < NUM_CELLS - 1 && tabAlive[y][x + 1]) {
        if (tabAlive[y][x + 1]) {
          //  console.log("E est vivant");
          aliveNeighbours++;
        }
      }

      //SW
      if (x > 0 && y < NUM_CELLS - 1 && tabAlive[y + 1][x - 1]) {
        if (tabAlive[y + 1][x - 1]) {
          //  console.log("SW est vivant");
          aliveNeighbours++;
        }
      }

      //S
      if (y < NUM_CELLS - 1 && tabAlive[y + 1][x]) {
        if (tabAlive[y + 1][x]) {
          //  console.log("S est vivant");
          aliveNeighbours++;
        }
      }

      //SE
      if (x < NUM_CELLS - 1 && y < NUM_CELLS - 1 && tabAlive[y + 1][x + 1]) {
        if (tabAlive[y + 1][x + 1]) {
          //  console.log("SE est vivant");
          aliveNeighbours++;
        }
      }

      //  console.log(aliveNeighbours);

      //dire à la cellule courante si
      //si il y a 3 ou plus voisins vivant tu meurs ou si tu as moins de deux voisins vivant tu meurs
      //si il y a exactement trois voisins vivants tu deviens vivant

      // || OU en informatique
      if (aliveNeighbours > 3 || aliveNeighbours < 2) {
        currentCell.classList.remove("alive");
      }

      if (aliveNeighbours == 3) {
        currentCell.classList.add("alive");
      }
    }
  }
};

const onRestart = () => {
  //vide le tableau tabCell
  tabCells = [];

  //vide les div du board
  board.innerHTML = "";

  //generate board
  generateBoard();

  //clearInterval()
  clearInterval(interval);

  // nouveau setInterval
  interval = setInterval(checkBoard, CHECK_FREQUENCY);
};

const onDOMLoaded = () => {
  console.log("DOM loaded");

  //aller chercher la div avec l'ID board et le mettre dans la variable board
  board = document.querySelector("#board");
  restartBtn = document.querySelector("#restart");
  console.log(board, restartBtn);

  //génere le board et rempli la tableau à deux dimensions
  generateBoard();

  //setInterval permet d'executer une fonction à un intervalle régulier
  interval = setInterval(checkBoard, CHECK_FREQUENCY);

  //ecouteur pour le bouton restart();
  restartBtn.addEventListener("click", onRestart);
};

//attendre que le DOM (Document Object Model) soit chargé
document.addEventListener("DOMContentLoaded", onDOMLoaded);