let activeKeys = new Set(); // set, ki vsebuje trenutne pritiskane tipke
let isMoving = false; // se uporablja, da blokira animacijo za druge smeri, kadar ze potuje v eno smer
let charDirection;
let charStance;
let frameSwitch = false;
let leftIndex = 1;
let rightIndex = 1;


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

    charDirection = charDown; // smer, v katero je character obrnjen


    if ((activeKeys.has("W") || activeKeys.has("ARROWUP")) && !cell.top) { // gor, zazna klik na WASD ali puscice, ce odzgoraj ni zida, se lahko premaknemo navzgor, cell.top predstavlja zid nad trenutne celico
        targetY--; // nova pozicija se odsteje za ena od trenutne, eno celico navzgor se bomo premaknili

        charStance = charUp;  // slika, kadar character miruje, 4 razlicne slike za vse 4 smeri

        if (frameSwitch) { // boolean, ki se uporablja za menjavo med dvema slikoma. Ena slika na eno celico. 2 sliki za animacijo premika v eno smer.
            frameSwitch = false;
            charDirection = charUp1;
        }
        else {
            charDirection = charUp2;
            frameSwitch = true;
        }
    } else if ((activeKeys.has("S") || activeKeys.has("ARROWDOWN")) && !cell.bottom) { // dol
        targetY++;

        charStance = charDown;

        if (frameSwitch) {
            charDirection = charDown1;
            frameSwitch = false;
        }
        else {
            charDirection = charDown2;
            frameSwitch = true;
        }
    } else if ((activeKeys.has("A") || activeKeys.has("ARROWLEFT")) && !cell.left) { // levo
        targetX--;

        charStance = charLeft;

        if (leftIndex === 4) { // kadar gremo skozi vse 3 slike, se index resetira
            leftIndex = 1;
        }
        switch (leftIndex) {
            case 1:
                charDirection = charLeft1;
                leftIndex++;
                break;
            case 2:
                charDirection = charLeft2;
                leftIndex++;
                break;
            case 3:
                charDirection = charLeft3;
                leftIndex++;
                break;
        }

    } else if ((activeKeys.has("D") || activeKeys.has("ARROWRIGHT")) && !cell.right) { // desno
        targetX++;

        charStance = charRight;

        if (rightIndex === 4) {
            rightIndex = 1;
        }
        switch (rightIndex) {
            case 1:
                charDirection = charRight1;
                rightIndex++;
                break;
            case 2:
                charDirection = charRight2;
                rightIndex++;
                break;
            case 3:
                charDirection = charRight3;
                rightIndex++;
                break;
        }
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
    if (targetX === endX && targetY === endY) { // ce smo prisli na konec labirinta, ustavimo igro
        gameStart = false;
        charStance = charDown;
        ctxChar.clearRect(0, 0, canvasChar.width, canvasChar.height);
        ctxChar.drawImage(charStance, targetX * size, targetY * size, size, size);

        swal({
            title: "Congrats!",
            text: "You have found the solution!",
            icon: "success",
            buttons: {
                confirm: {
                    text: "New maze",
                    value: true, // boolean restart pridobi vrednost true
                    visible: true,
                    closeModal: true 
                },
                cancel: {
                    text: "End game",
                    value: false,
                    visible: true,
                    closeModal: true
                }
            }
        }).then((restart) => {
            if (restart) { // ce kliknemo na new maze
                genMaze();
                moveY = startY; // resetira kordinate playerja, po in pred igro
                moveX = startX;
                gameStart=true;
                
            }
            else{
                gameToggle();
            }
        });
    }

    let newX = moveX; // na zacetku se shrani trenutna pozicija characterja, potem se bo pristevala nova pozicija po majhnih delckih (frames)
    let newY = moveY;
    let frames = 12; // frames odlocajo, v kolikih korakih, bo bila izvedena animacija (npr. 10 frames, 10 delckov animacije premika na eno celico)
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

        }
        else {
            moveX = targetX;
            moveY = targetY;
            ctxChar.clearRect(0, 0, canvasChar.width, canvasChar.height);
            ctxChar.drawImage(charStance, moveX * size, moveY * size, size, size);
            callback(); // nadaljni movement, ce drzimo na tipko, to je metoda moveCharacter
        }
    }
}

function drawCharacter() {
    ctxChar.clearRect(0, 0, canvasChar.width, canvasChar.height);
    ctxChar.drawImage(charDirection, moveX * size, moveY * size, size, size); // risanje characterja
}

function gameToggle() {
    moveY = startY; // resetira kordinate playerja, po in pred igro
    moveX = startX;

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

        gridSizeBtn.disabled = false;  // omogocimo ostale tipke, ce ustavimo igro
        generateBtn.disabled = false;
        solveBtn.disabled = false;
        speedBtn.disabled = false;
        charDirection = charDown; // privzeta slika, ko character miruje in je obrnjen proti nam
        drawCharacter();
    }
};
