let path = []; 
let isAnimating = false;
let animationTimeout; 

// zacetna tocka (0,0) - koncna tocka (cols-1, rows-1)
// Depth First Search Algoritem (DFS) - obiskuje vse mozne poti od zacetne tocke do koncne, ko pride do dead enda, backtracka in gre naprej po unvisited poti

function solveMaze(x, y, visited) {
    if (x === cols - 1 && y === rows - 1) { // ce pride do koncne tocke (cols-1, rows-1) - je iskanje opravljeno in se konca
        path.push({ x, y }); // endpoint se shrani v path. (push se uporablja za dodajanje elementov v array (polje)). "Podobno" kot .append() v SB JAVA
        return true;
    }

    // če je celica out of bounds ali visited vrne false - tako ostane x,y v labirintu in se izogne ciklom (zato ker preveri ce je obiskano)
    if (x < 0 || x >= cols || y < 0 || y >= rows || visited[y][x])
        return false;

    visited[y][x] = true; // oznaci trenutno celico kot obiskano
    path.push({ x, y }); // doda celico v solution path

    // rekurzivno se premika v možne smeri. Preverja če obstaja zid 
    if (!grid[y][x].right && solveMaze(x + 1, y, visited)) return true;  // NPR. to pomeni, če obstaja zid na desni strani bo šlo pogledat v desno
    if (!grid[y][x].bottom && solveMaze(x, y + 1, visited)) return true;
    if (!grid[y][x].left && solveMaze(x - 1, y, visited)) return true;
    if (!grid[y][x].top && solveMaze(x, y - 1, visited)) return true;

    path.pop(); // ce ne najde poti naprej, gre nazaj in izbrise solution path
    return false;
}

function stopAnimation() {
    isAnimating = false; 
    clearTimeout(animationTimeout);
}

function drawSolution() {
    let index = 0; // trenutna tocka v path solution tabeli
    isAnimating = true; 

    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 4;

    ctx.moveTo(path[0].x * size + size / 2, path[0].y * size + size / 2); // prikaze zacetno tocko (* size + size / 2  se uporabi zato da se nahajanje zacne v sredini celice)

    function animate() {
        if (!isAnimating || index >= path.length) {
            ctx.stroke(); 
            isAnimating = false; 
            return; // ustavi animacijo, ko se konca risati
        }

        let p = path[index];
        ctx.lineTo(p.x * size + size / 2, p.y * size + size / 2); // dejansko risanje, ohranja sredino celice
        ctx.stroke();

        index++; // gre na nasleden korak v tabeli solution path

        animationTimeout = setTimeout(animate, 0); // 25ms delay, animacija
    }

    animate(); // Start animation
}

// function drawSolution() {
//     let index = 0;
//     isAnimating = true; 

//     ctx.fillStyle = 'red';  
//     const pixelSize = 20;   

//     function animate() {
//         if (!isAnimating || index >= path.length) {
//             isAnimating = false; 
//             return; 
//         }
//         moveCharacterAnimation();
//         let p = path[index];
//         ctx.fillRect(p.x * size + size / 2 - pixelSize / 2, p.y * size + size / 2 - pixelSize / 2, pixelSize, pixelSize);
//         index++;                                                                                         
//         animationTimeout = setTimeout(animate, 100); 
//     }
//     animate();
// }


function moveCharacterAnimation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
}
function clearPath(){
    stopAnimation(); 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
}
document.getElementById('solveMaze').addEventListener('click', () => {
    if (!isAnimating) {
        let visited = Array.from({ length: rows }, () => Array(cols).fill(false)); // ustvari 2d tabelo, ki preverja ce je celica bila obiskana
        path = [];  
        solveMaze(0, 0, visited); 
        drawSolution(); 
    }
});