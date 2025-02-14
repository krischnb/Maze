document.addEventListener("keypress", function (event) {
    const cell = grid[moveY][moveX]; // celica v kateri se trenutno nahaja character

    if (event.key === "w" || event.key === "ArrowUp") { // self-explanatory
        if (!cell.top) // boundaries - ce zgornjega zida ni
            moveY--;  // Y se bo lahko zmanjsal, torej premaknemo se za eno celico navzgor
    }
    else if (event.key === "a" || event.key === "ArrowLeft") {
        if (!cell.left)
            moveX--;
    }
    else if (event.key === "s" || event.key === "ArrowDown") {
        if (!cell.bottom)
            moveY++;
    }
    else if (event.key === "d" || event.key === "ArrowRight") {
        if (!cell.right)
            moveX++;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    ctx.drawImage(portal, (cols - 1) * size, (rows - 1) * size, size, size);
    ctx.drawImage(char1, moveX * size, moveY * size, size, size);
});