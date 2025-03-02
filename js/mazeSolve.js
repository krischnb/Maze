// Depth First Search Algoritem (DFS) - obiskuje vse mozne poti od zacetne tocke do koncne, ko pride do dead enda, backtracka in gre naprej po unvisited poti

function solveMaze(x, y, visited) {
    if (x === endX && y === endY) { // ce pride do koncne tocke - je iskanje opravljeno in se konca
        path.push({ x, y }); // endpoint se shrani v path. (push se uporablja za dodajanje elementov v array (polje)). "Podobno" kot .append() v SB JAVA
        return true;
    }

    // če je celica out of bounds ali visited vrne false - tako ostane x,y v labirintu in se izogne ciklom (zato ker preveri ce je obiskano)
    if (x < 0 || x >= cols || y < 0 || y >= rows || visited[y][x])
        return false;

    visited[y][x] = true; // oznaci trenutno celico kot obiskano
    path.push({ x, y }); // doda celico v solution path

    // rekurzivno se premika v možne smeri. Preverja če obstaja zid 
    if (!grid[y][x].right && solveMaze(x + 1, y, visited)) return true;  // NPR. to pomeni, če ne obstaja zid na desni strani bo šlo pogledat v desno
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
    ctx.strokeStyle = "green";

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

    let charDirectionSolve = charDown;
    let picToggle = false;  // boolean, za menjavo dveh slik
    let picToggle3 = 1; // stevec za menjavo 3 slik v krogu
    let frameCounter = 0; // Nek counter. Vsakic ko doseze vrednost frameLimita, se bodo slike zamenjale (frameCounter % frameLimit === 0)
    let frameLimit = size; // frameLimit ima vrednost od velikosti celice. To pomeni, da za vsako celico bo nova slika, ce se premikamo v isto smer

    function animate() {
        if (currentPixel < pixels.length && !stopped) { // ce se risanje se ni koncalo
            for (let i = 0; i < speed && currentPixel < pixels.length; i++) {  // kontrolira koliko pixlov se narise na en korak - frame
                // vecji kot je speed vec pixlov naenkrat se narise = animacija bo hitrejsa
                const [x, y] = pixels[currentPixel];  // vzame pozicijo naslednjega pixla

                if (speed !== 9999) {  // ce je hitrost instant, se to NE izvede, zato da se ne riše slik za brezveze

                    let prevX, prevY; // predhodnik X in Y, uporabljalo se jih bo za primerjavo prejsnih in trenutnih  kordinatov, na ta nacin bomo vedli v katero smer se premikamo
                    if (currentPixel === 0) { // v primeru da je index (currentPixel) nič, se podatki samo prekopirajo, zato da ne bo Indexoutofbounds exception
                        prevX = x;
                        prevY = y;
                    } else {
                        [prevX, prevY] = pixels[currentPixel - 1]; // shrani se X in Y prejsnih kordinat 
                    }

                    if (frameCounter % frameLimit === 0) {  // zgodi se vsakic ko pretecemo razdaljo ene celice
                        picToggle = !picToggle;
                        if (picToggle3 === 4)
                            picToggle3 = 0;
                        picToggle3++;  // nova slika
                    }

                    // Smeri v katere se premikamo
                    if (y < prevY) {  // ce se premikamo GOR
                        if (picToggle) {
                            charDirectionSolve = charUp1;
                        }
                        else {
                            charDirectionSolve = charUp2;
                        }
                    }
                    else if (y > prevY) { // DOL
                        if (picToggle) {
                            charDirectionSolve = charDown1;
                        }
                        else {
                            charDirectionSolve = charDown2;
                        }
                    }
                    else if (x < prevX) { // LEVO
                        if (picToggle3 === 1) {
                            charDirectionSolve = charLeft1;
                        }
                        else if (picToggle3 === 2) {
                            charDirectionSolve = charLeft2;
                        }
                        else {
                            charDirectionSolve = charLeft3;
                        }
                    }
                    else if (x > prevX) { // DESNO
                        if (picToggle3 === 1) {
                            charDirectionSolve = charRight1;
                        }
                        else if (picToggle3 === 2) {
                            charDirectionSolve = charRight2;
                        }
                        else {
                            charDirectionSolve = charRight3;
                        }
                    }

                    ctxChar.clearRect(0, 0, canvasChar.width, canvasChar.height);
                    ctxChar.drawImage(charDirectionSolve, x - size / 2, y - size / 2, size, size);

                    frameCounter++;
                }
                else { // ce je hitrost instant, se animacije ne bo risalo, ampak character bo avtomatsko bil postavljen na konec
                    ctxChar.clearRect(0, 0, canvasChar.width, canvasChar.height);
                    ctxChar.drawImage(charDown, (endX) * size, (endY) * size, size, size);
                }

                currentPixel++; // gre do naslednjega pixla
                ctx.lineTo(x, y);  //  narise linijo do naslednega pixla
            }

            ctx.stroke();
            animationFrameId = requestAnimationFrame(animate); // built in funkcija, 60 FPS default, narise se (speed * 60 pixlov) na sekundo
        } else { // ko pridemo na konec
            ctxChar.clearRect(0, 0, canvasChar.width, canvasChar.height);
            ctxChar.drawImage(charDown, (endX) * size, (endY) * size, size, size);
            ctx.closePath();
            isAnimating = false;

            swal({
                title: "Success!",
                text: "The solution path has been found!",
                icon: "success",
                buttons: {
                    confirm: {
                        text: "Clear path",
                        value: true, // boolean restart pridobi vrednost true
                        visible: true,
                        closeModal: true 
                    },
                    cancel: {
                        text: "Close",
                        value: false,
                        visible: true,
                        closeModal: true
                    }
                }
            }).then((restart) => {
                if (restart) {
                    clearPath();
                    risiBrisi();
                }
            });
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
    ctx.drawImage(finish, endX * size + 2.5, endY * size + 2.5, size - 5, size - 5);
    ctxChar.drawImage(charDown, startX * size, startY * size, size, size);
    moveY = 0; // reset values, lokacija playerja
    moveX = 0;
}

// RIŠI BRIŠI
solveBtn.addEventListener('click', () => {
    risiBrisi();
});
function risiBrisi() {
    if (risi) { // ce je boolean risi true bo narisalo pot, v primeru da ni, jo izbriše
        if (isAnimating === false) {
            let visited = Array.from({ length: rows }, () => Array(cols).fill(false)); // ustvari 2d tabelo, ki preverja ce je celica bila obiskana
            path = [];
            solveMaze(startX, startY, visited);  // kje se zacne resevanje
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
}

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
