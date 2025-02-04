let currentPixel = 0; 
const speed = 1;      
let stopped = false;  
let pixels = [];      

// SOLUTION - DRAW
function solve() {
    if (stopped) {
        currentPixel = 0;
        stopped = false;   
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        drawMaze();      
    }

    ctx.strokeStyle = "green";
    ctx.lineWidth = 4;
    ctx.lineCap = "square";
    ctx.beginPath();

    pixels.length = 0; 
    for (let i = 1; i < solution.length; i++) {
        const x1 = solution[i - 1][0];
        const y1 = solution[i - 1][1];
        const x2 = solution[i][0];
        const y2 = solution[i][1];

        pixels.push(...getLinePixels(x1, y1, x2, y2));
    }

    function animate() {
        if (currentPixel < pixels.length && !stopped) {
            const [x, y] = pixels[currentPixel];
            ctx.lineTo(x, y);
            ctx.stroke();
            currentPixel++;

            setTimeout(() => {
                requestAnimationFrame(animate);
            }, speed);
        } else {
            ctx.closePath();
        }
    }

    animate(); 
}

// METHOD - returna dolzine posamezne crte v pixlah, potem pa rise pixel po pixli
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

function reset() {
    stopped = true;  
    currentPixel = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze(); 
}
