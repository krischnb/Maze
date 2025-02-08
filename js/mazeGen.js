let size = 40; // default size
// cell size v pixlah: size 20 = 30x30 grid, size 30 = 20x20 grid, size 40 = 15x15 grid, size 60 = 10x10 grid
const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
let cols = Math.floor(canvas.width / size); // stevilo stolpcev
let rows = Math.floor(canvas.height / size); // stevilo vrstic
var pick = document.getElementById("difficulty");
let charX = 0;
let chary = 0;
let grid = []; // struktura mreze, ki se potem ustvari v labirint
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
    ctx.beginPath(); // zacetek risanja labirinta
    ctx.lineWidth = 2;

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
function genMaze(){
    stopAnimation();
    createGrid();
    generateMaze(cols - 1, rows - 1); // rekurzija se zacne v spodnjem desnem kotu, zato da je labirint tezji, ker starting tocka je na nasportni strani
    drawMaze();
    solveBtn.textContent = "Solve";
    risi = true; // risi brisi button postane solve v vsakem primeru
}

// spreminjanje tezavnosti = velikosti labirinta
pick.addEventListener("change", function () {
    stopAnimation();
    size = parseInt(pick.value, 10);
    cols = Math.floor(canvas.width / size);
    rows = Math.floor(canvas.height / size);
    genMaze();
});
