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

function drawSolution() {
    let currentPixel = 0; // trenuten pixel v tabeli pixels
    let pixels = []; // tabela v katero damo 
    let stopped = false;
    isAnimating = true;
    ctx.lineWidth = "4";
    ctx.strokeStyle = "rgb(134, 43, 127)";

    ctx.beginPath();
    // se premakne na zacetno tocko (* size + size / 2  se uporabi zato da se nahajanje zacne v sredini celice)
    ctx.moveTo(path[0].x * size + size / 2, path[0].y * size + size / 2);

    // iteracija skozi celotno pot (solution path), vzame 2 tocki (ena crta) iz trenutne celice (en korak) in jo spremeni v pixle
    for (let i = 1; i < path.length; i++) {
        const x1 = path[i - 1].x, y1 = path[i - 1].y;
        const x2 = path[i].x, y2 = path[i].y;
        // X 
        pixels.push(...getLinePixels(x1 * size + size / 2, y1 * size + size / 2,
            // Y
            x2 * size + size / 2, y2 * size + size / 2));
    }

    function animate() {
        if (currentPixel < pixels.length && !stopped) { // ce se risanje se ni koncalo
            for (let i = 0; i < speed && currentPixel < pixels.length; i++) {  // kontrolira koliko pixlov se narise na en korak - frame
                // vecji kot je speed vec pixlov naenkrat se narise = animacija bo hitrejsa
                const [x, y] = pixels[currentPixel];  // vzame pozicijo naslednjega pixla
                currentPixel++; // gre do naslednjega pixla

                ctx.lineTo(x, y);  //  narise linijo do naslednega pixla

                // uporablja se drugi canvas za risanje potovanje characterja, ker ce brises med tem ko rises crto se animacija popaci
                ctxChar.clearRect(0, 0, canvasChar.width, canvasChar.height);
                if (speed === 9999)
                    ctxChar.drawImage(char1, (cols - 1) * size, (rows - 1) * size, size, size);
                else
                    ctxChar.drawImage(char1, x - size / 2, y - size / 2, size, size);
            }

            ctx.stroke();
            animationFrameId = requestAnimationFrame(animate); // built in funkcija, 60 FPS default, narise se (speed * 60 pixlov) na sekundo
        } else {
            ctx.closePath();
            isAnimating = false;
        }
    }

    animate();
}

function stopAnimation() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId); // prekine animation frame
    }
    stopped = true;
    isAnimating = false;
    currentPixel = 0; // reset index na 0
    pixels = [];
}

function clearPath() {
    stopAnimation();
    drawMaze();
    ctxChar.clearRect(0, 0, canvasChar.width, canvasChar.height);
    ctx.drawImage(portal, (cols - 1) * size, (rows - 1) * size, size, size);
    ctxChar.drawImage(char1, 0 * size, 0 * size, size, size);
    moveY = 0; // reset values, lokacija playerja
    moveX = 0;
}

// RIŠI BRIŠI
solveBtn.addEventListener('click', () => {
    if (risi) { // ce je boolean risi true bo narisalo pot, v primeru da ni, jo izbriše
        if (isAnimating === false) {
            let visited = Array.from({ length: rows }, () => Array(cols).fill(false)); // ustvari 2d tabelo, ki preverja ce je celica bila obiskana
            path = [];
            solveMaze(0, 0, visited);
            drawSolution();
            solveBtn.textContent = "Clear";
            risi = false;

            gridSizeBtn.disabled = true;
            playBtn.disabled = true;
            generateBtn.disabled = true;
        }
    }
    else {
        clearPath();
        solveBtn.textContent = "Solve";
        risi = true;

        gridSizeBtn.disabled = false;
        playBtn.disabled = false;
        generateBtn.disabled = false;
    }
});

speedBtn.addEventListener("change", function () {
    speed = parseInt(speedBtn.value, 10);
});


function getLinePixels(x1, y1, x2, y2) {
    const pixels = [];
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;

    while (true) {
        pixels.push([x1, y1]);

        if (x1 === x2 && y1 === y2) break;

        const e2 = err * 2;
        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }
    }

    return pixels;
}
