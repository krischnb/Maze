// mazeGen.js
const gridSizeBtn = document.getElementById("gridSize");
const generateBtn = document.getElementById("generateMaze");

// mazeSolve.js
const solveBtn = document.getElementById("solveMaze");
const speedBtn = document.getElementById("speedSolve");

// player.js
const playBtn = document.getElementById("playBtn");


// variables - mazeGen.js

let size = 40; // default size
// cell size v pixlah: size 20 = 30x30 grid, size 30 = 20x20 grid, size 40 = 15x15 grid, size 60 = 10x10 grid
const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const canvasChar = document.getElementById('canvasChar');
const ctxChar = canvasChar.getContext('2d');
let cols = Math.floor(canvas.width / size); // stevilo stolpcev
let rows = Math.floor(canvas.height / size); // stevilo vrstic
let charX = 0;
let chary = 0;
let grid = []; // struktura mreze, ki se potem ustvari v labirint    
const finish = document.getElementById("finish");

let startX, startY; // kordinati, kjer se maze zacne (tam bo bil postavljen character)
let endX, endY; // kordinati, kjer se maze konca (tam bo bila postavljena zastavica, ki prikazuje cilj)
let random;

// slike, vseh 4 smeri, ko character miruje
const charDown = document.getElementById("charDown"); // default smer characterja
const charUp = document.getElementById("charUp");
const charLeft = document.getElementById("charLeft");
const charRight = document.getElementById("charRight");

// slike za dol
const charDown1 = document.getElementById("charDown1");
const charDown2 = document.getElementById("charDown2");

// slike za levo
const charLeft1 = document.getElementById("charLeft1");
const charLeft2 = document.getElementById("charLeft2");
const charLeft3 = document.getElementById("charLeft3");

// slike za desno
const charRight1 = document.getElementById("charRight1");
const charRight2 = document.getElementById("charRight2");
const charRight3 = document.getElementById("charRight3");

// slike za gor
const charUp1 = document.getElementById("charUp1");
const charUp2 = document.getElementById("charUp2");

// variables from file mazeSolve.js
let path = [];
let isAnimating = false;
let animationTimeout;
let animationFrameId;
let risi = true;
let speed = 3; // default speed

// variables from file player.js
let moveX;
let moveY;
let gameStart = false;
let playButton = true;


//variables from dragObject.js
let offsetX = 0;
let offsetY = 0;


/**
 * ustvari grid - mrežo: stevilo celic = vrstice*stolpci, vsaka celica ima vse 4 zide
 */
function createGrid() {
    grid = [];
    for (let y = 0; y < rows; y++) {
        grid[y] = [];
        for (let x = 0; x < cols; x++) {
            grid[y][x] = { // smeri predstavljajo zid posamezne celice v labirintu (left = zid na levi strani celice)
                top: true,
                right: true,
                bottom: true,
                left: true,
                visited: false
            };
        }
    }
}

function randomStartEnd() { // funckija, ki nakljucno generira zacetno in koncno pozicijo. (nastopajo le v kotih labirinta)
    random = Math.floor(Math.random() * 4) + 1; // od 1 do 4
    switch (random) {
        case 1:
            startX = 0;
            startY = 0; // zacetna pozicija - v zgornjem levem kotu
            endX = cols - 1;
            endY = rows - 1; // konca pozicija - v spodnjem desnem kotu
            break;
        case 2:
            startX = cols - 1;
            startY = rows - 1; // zacetna pozicija - v spodnjem desnem kotu
            endX = 0;
            endY = 0; // koncna pozicija - v zgornjem levem kotu
            break;
        case 3:
            startX = 0;
            startY = rows - 1; // zacetna pozicija - v spodnjem levem kotu
            endX = cols - 1;
            endY = 0; // koncna pozicija - v zgornjem desnem kotu
            break;
        case 4:
            startX = cols - 1;
            startY = 0; // zacetna pozicija - v zgornjem desnem kotu
            endX = 0;
            endY = rows - 1; // koncna pozicija - v spodnjem levem kotu
            break;
    }
}

// Recursive Backtracking Algoritem. Ustvari poti tako, da odstrani zide in gre nazaj, ko pride do dead-enda
// Rekurzija, konca se takrat, ko so vse celice obiskane (visited)
function generateMaze(x, y) {
    grid[y][x].visited = true; // oznaci trenutno celico kot visited, da jo ne ponovno obisce

    // vse 4 smeri, odstrani zid v katero smer gre, in odstrani nasprotni zid v sosedni celici, tako zdruziz 2 celici v eno
    let directions = [
        { dx: 1, dy: 0, wall: 'right', opposite: 'left' },
        { dx: -1, dy: 0, wall: 'left', opposite: 'right' },
        { dx: 0, dy: 1, wall: 'bottom', opposite: 'top' },
        { dx: 0, dy: -1, wall: 'top', opposite: 'bottom' }
    ];

    shuffleArray(directions); // random

    // gre skozi vsako smer, kalkulira novo pozicijo za sosednjo celico
    for (const dir of directions) {
        const nx = x + dir.dx;
        const ny = y + dir.dy;

        // preveri ce je sosednja celica v mejah (v labirintu) in ce je unvisited
        if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && !grid[ny][nx].visited) {
            grid[y][x][dir.wall] = false; // odstrani zid v trenutni smeri
            grid[ny][nx][dir.opposite] = false; // odstrani nasportni zid v sosedni celici
            generateMaze(nx, ny); // Recursive backtracking - metoda poklice samega sebe na poziciji nove sosednje celice (unvisited)
        }
    }
}

// risanje labirinta

function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 1;

    // iteracija skozi vsako celico v labirintu
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const cell = grid[y][x];

            // če zid obstaja, ga nariše
            if (cell.top) {
                ctx.moveTo(x * size, y * size);
                ctx.lineTo((x + 1) * size, y * size);
            }
            if (cell.right) {
                ctx.moveTo((x + 1) * size, y * size);
                ctx.lineTo((x + 1) * size, (y + 1) * size);
            }
            if (cell.bottom) {
                ctx.moveTo(x * size, (y + 1) * size);
                ctx.lineTo((x + 1) * size, (y + 1) * size);
            }
            if (cell.left) {
                ctx.moveTo(x * size, y * size);
                ctx.lineTo(x * size, (y + 1) * size);
            }
        }
    }
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

// Fisher-yates algoritm - premese podatke v tabeli: sepravi premeša smeri

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function genMaze() {
    stopAnimation();
    createGrid();
    randomStartEnd();
    generateMaze(endX , endY); // rekurzija se zacne na koncni pozicji, in se generira proti cilj
    drawMaze();
    solveBtn.textContent = "Solve";
    risi = true; // risi brisi button postane solve v vsakem primeru

    ctx.drawImage(finish, endX * size + 2.5, endY * size + 2.5, size - 5, size - 5);
    ctxChar.clearRect(0, 0, canvasChar.width, canvasChar.height);
    ctxChar.drawImage(charDown, startX * size, startY * size, size, size); // privzeta slika, ko character miruje in je obrnjen proti nam
    // (cols - 1), (rows - 1) --- array pozicija spodnjega desnega kota
    // (cols - 1) * size, (rows - 1) * size --- pixel pozicija spodnjega desnega kota

}

// spreminjanje tezavnosti = velikosti labirinta
gridSizeBtn.addEventListener("change", function () {
    stopAnimation();
    size = parseInt(gridSizeBtn.value, 10);
    cols = Math.floor(canvas.width / size);
    rows = Math.floor(canvas.height / size);
    genMaze();
});
