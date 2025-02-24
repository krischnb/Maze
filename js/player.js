let activeKeys = new Set(); // set, ki vsebuje trenutne pritiskane tipke
let isMoving = false; // se uporablja, da blokira animacijo za druge smeri, kadar ze potuje v eno smer

document.addEventListener("keydown", function (event) { // zazna ko kliknemo na tipko
    if (!gameStart) return; 

    const key = event.key.toUpperCase(); // tipka na katero kliknemo, postane velika, da zazna tudi mali WASD
    activeKeys.add(key); // zaporedja pritisnjenih tipk se hranijo v set

    if (!isMoving)  // se izvede, ce animacija ni v teku
        moveCharacter();
});

document.addEventListener("keyup", function (event) { // zazna, ko spustimo tipko
    const key = event.key.toUpperCase(); 
    activeKeys.delete(key); // izbrise tipko, ki smo jo spustili iz aktivnega seta
});

function moveCharacter() {
    if (!gameStart || activeKeys.size === 0) {  // zacne se, ko kliknemo na gumb Play - Ce je gameStart false skoci ven iz funkcije, al pa ce ni nobene aktivne tipke v setu
        isMoving = false; 
        return; 
    }

    const cell = grid[moveY][moveX]; // trenutna pozicija playerja
    let targetX = moveX; // nova pozicija (v katero se bomo premaknili) dobi vrednost trenutne, potem ko preveri smer
    let targetY = moveY;


    if ((activeKeys.has("W") || activeKeys.has("ARROWUP")) && !cell.top) { // gor, zazna klik na WASD ali puscice, ce odzgoraj ni zida, se lahko premaknemo navzgor, cell.top predstavlja zid nad trenutne celico
        targetY--; // nova pozicija se odsteje za ena od trenutne, eno celico navzgor se bomo premaknili
    } else if ((activeKeys.has("S") || activeKeys.has("ARROWDOWN")) && !cell.bottom) { // dol
        targetY++;
    } else if ((activeKeys.has("A") || activeKeys.has("ARROWLEFT")) && !cell.left) { // levo
        targetX--;
    } else if ((activeKeys.has("D") || activeKeys.has("ARROWRIGHT")) && !cell.right) { // desno
        targetX++;
    }


    if ((targetX !== moveX && targetY !== moveY) && (cell.left || cell.right || cell.top || cell.bottom)) { 
        // ce sta spremenjeni X IN Y kordinati, to je nevarno, ker se lahko zgodi diagonel premik, zato to blokiramo
        // in ce so zidi okrog celice
        return; // blokira diagonalen movement, da ne skoci skozi zid
    }

    if ((targetX !== moveX || targetY !== moveY) && activeKeys.size) { // ce je spremenjena samo ena smer, X ali Y
        isMoving = true; // oznacimo, da animacija premikanja se izvaja
        moveAnimation(targetX, targetY, moveCharacter); // poklicemo metodo, s katero animiramo premik
        // klice metodo moveCharacter ponovno, ce tipko drzimo - drag
    } else {
        isMoving = false; // ce se premik ne izvede, oznacimo premik na false, da vstavimo nadaljni premik
    }
}

function moveAnimation(targetX, targetY, callback) { // animacija premika characterja od trenutne do nove pozicije
    if (targetX === cols - 1 && targetY === rows - 1) { // ce smo prisli na konec labirinta, ustavimo igro
        gameStart = false;
        swal("Finish!", "You have escaped the maze!", "success").then(gameToggle); // koncno sporocilo, ki nas obvesca da smo prisli do konca
    }

    let newX = moveX; // na zacetku se shrani trenutna pozicija characterja, potem se bo pristevala nova pozicija po majhnih delckih (frames)
    let newY = moveY;
    let frames = 15; // frames odlocajo, v kolikih korakih, bo bila izvedena animacija (npr. 10 frames, 10 delckov animacije premika)
    let stepX = (targetX - moveX) / frames; // izracun, koliko se bomo premaknili na en korak, en frame, ce bo 60 framov, se bo animacija izvajala 1 sekundo za premik ene celice
    let stepY = (targetY - moveY) / frames; // nova pozicija se odsteje od trenutne, da izvemo kam se premaknemo, potem to delimo z frames - da postavimo potek animacije na korake
    let i = 0;

    moveStep();
    function moveStep() {
        if (i < frames) { // ustavimo animacijo, ko narisemo vse korake, frames
            newX += stepX; // v novo pozicijo se pristevajo koraki, in to pozicijo narisemo, s tem ustvarimo animacijo premika
            newY += stepY;
            moveX = newX;
            moveY = newY;
            drawCharacter();
            requestAnimationFrame(moveStep);
            i++;
        } else {
            moveX = targetX;
            moveY = targetY;
            drawCharacter();
            callback(); // nadaljni movement, ce drzimo na tipko, to je metoda moveCharacter
        }
    }
}

function drawCharacter() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    ctxChar.clearRect(0,0, canvasChar.width, canvasChar.height);
    ctx.drawImage(portal, (cols - 1) * size, (rows - 1) * size, size, size);
    ctxChar.drawImage(char1, moveX * size, moveY * size, size, size); // risanje characterja
}

function gameToggle() {
    if (playButton) { // Play button
        gameStart = true;
        playButton = false;
        playBtn.textContent = "Stop";

        gridSizeBtn.disabled = true; // onemogocimo tipke, ko je igra aktivna
        generateBtn.disabled = true;
        solveBtn.disabled = true;
        speedBtn.disabled = true;
    }
    else { // Stop button
        gameStart = false;
        playButton = true;
        playBtn.textContent = "Play";    
        moveY = 0; // reset values, lokacija playerja
        moveX = 0; 

        gridSizeBtn.disabled = false;  // omogocimo ostale tipke, ce ustavimo igro
        generateBtn.disabled = false;
        solveBtn.disabled = false;
        speedBtn.disabled = false;
        
        drawCharacter();
    }
};
