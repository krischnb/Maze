document.addEventListener("keydown", function (event) {
    if (!gameStart) // zacne se, ko kliknemo na gumb Play - Ce je gameStart false skoci ven iz funkcije
        return;

        
    const cell = grid[moveY][moveX]; // trenutna celica, v kateri se character nahaja

    if (event.key === "W" || event.key === "w" || event.key === "ArrowUp") { // gor
        if (!cell.top) // boundaries - ce zgornjega zida ni
            moveAnimation(moveX, moveY - 1); // se bo premaknilo eno celico
    }
    else if (event.key === "A" || event.key === "a" || event.key === "ArrowLeft") { // levo
        if (!cell.left)
            moveAnimation(moveX - 1, moveY);
    }
    else if (event.key === "S" || event.key === "s" || event.key === "ArrowDown") { // dol
        if (!cell.bottom)
            moveAnimation(moveX, moveY + 1);
    }
    else if (event.key === "D" || event.key === "d" || event.key === "ArrowRight") { // desno
        if (!cell.right)
            moveAnimation(moveX + 1, moveY);
    }
    else { // ce ni nobena od navedenih tipk, skoci ven iz funckije, da ne bo brisalo labirinta in ga znova risal z brez veze
        return;
    }


});

function moveAnimation(targetX, targetY) { // target je nova pozicija characterja, kamor se bomo premaknili, ustvarimo animacijo od zacetne do koncne pozicije
    if(targetX === rows-1 && targetY === cols-1){
        swal("Finish!", "You have escaped the maze!", "success").then(() =>{
            gameToggle(); // konec igre
        });
    }
    let newX = moveX; // se shrani zacetna pozicija characterja
    let newY = moveY;
    let steps = 10; // koraki oz. frames - vec kot jih je, bolj bo smooth animacija ampak tudi pocasnejsa
    let stepX = (targetX - newX) / steps; // izracun koraka - koliko se bo character premaknil na en frame - korak
    let stepY = (targetY - newY) / steps;
    let i = 0;

    moveStep();
    function moveStep() { // rekurzija z built-in metodo requestAnimationFrame
        if (i < steps) { // kolikor je framov, tolikokrat se bo ponovila ta funckija
            newX += stepX; // na en korak se character premika kolikor je velik stepX
            newY += stepY;
            moveX = newX; // segmenti novejse pozicije se shranjajo v staro, ko je animacija koncana, stara pozicija dobi novo
            moveY = newY;
            drawCharacter(); // risanje animacije s kordinatami moveX in moveY

            requestAnimationFrame(moveStep); // metoda "requestAnimationFrame" ima ponavadi 60FPS, ce je 60 steps-ov se bo animacija izvajala 1 sekundo
            // ----- steps / FPS = dolzina animacije 
            i++;
        } else { // konec animacije, nove pozicije se shranijo v stare
            moveX = targetX;
            moveY = targetY;
            drawCharacter();
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

        gridSizeBtn.disabled = true;
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

        gridSizeBtn.disabled = false;        
        generateBtn.disabled = false;
        solveBtn.disabled = false;
        speedBtn.disabled = false;
        
        drawCharacter();
    }
};