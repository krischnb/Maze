let solution;
let labirint;
let canvas;
let ctx;
let currentPixel;
let speed;
let stopped;
let pixels = [];
let img;
document.addEventListener("DOMContentLoaded", function () {
    currentPixel = 0;
    speed = 1;
    stopped = false;
    solution = [
        [234, 2], [234, 10], [218, 10], [218, 42], [202, 42], [202, 26], [186, 26],
        [186, 10], [170, 10], [170, 26], [154, 26], [154, 42], [138, 42], [138, 10],
        [42, 10], [42, 42], [58, 42], [58, 26], [74, 26], [74, 42], [90, 42], [90, 58],
        [106, 58], [106, 42], [122, 42], [122, 58], [154, 58], [154, 74], [106, 74],
        [106, 90], [90, 90], [90, 74], [74, 74], [74, 90], [58, 90], [58, 138],
        [26, 138], [26, 186], [10, 186], [10, 202], [26, 202], [26, 234], [10, 234],
        [10, 282], [58, 282], [58, 298], [122, 298], [122, 282], [138, 282], [138, 266],
        [122, 266], [122, 218], [154, 218], [154, 250], [170, 250], [170, 314],
        [186, 314], [186, 362], [202, 362], [202, 314], [218, 314], [218, 298],
        [202, 298], [202, 282], [218, 282], [218, 266], [234, 266], [234, 250],
        [186, 250], [186, 218], [170, 218], [170, 170], [186, 170], [186, 186],
        [234, 186], [234, 170], [202, 170], [202, 154], [186, 154], [186, 138],
        [170, 138], [170, 154], [122, 154], [122, 122], [106, 122], [106, 106],
        [154, 106], [154, 90], [170, 90], [170, 74], [202, 74], [202, 58], [266, 58],
        [266, 90], [282, 90], [282, 122], [250, 122], [250, 170], [314, 170],
        [314, 154], [282, 154], [282, 138], [298, 138], [298, 90], [314, 90],
        [314, 74], [282, 74], [282, 10], [298, 10], [298, 42], [314, 42], [314, 26],
        [346, 26], [346, 10], [362, 10], [362, 42], [346, 42], [346, 74], [330, 74],
        [330, 90], [346, 90], [346, 122], [378, 122], [378, 154], [394, 154],
        [394, 138], [426, 138], [426, 154], [442, 154], [442, 106], [426, 106],
        [426, 90], [458, 90], [458, 106], [474, 106], [474, 138], [458, 138],
        [458, 170], [474, 170], [474, 186], [458, 186], [458, 218], [474, 218],
        [474, 234], [426, 234], [426, 266], [394, 266], [394, 282], [378, 282],
        [378, 298], [410, 298], [410, 314], [426, 314], [426, 346], [442, 346],
        [442, 362], [458, 362], [458, 378], [410, 378], [410, 410], [426, 410],
        [426, 394], [442, 394], [442, 426], [394, 426], [394, 458], [378, 458],
        [378, 410], [362, 410], [362, 426], [330, 426], [330, 410], [314, 410],
        [314, 426], [266, 426], [266, 442], [346, 442], [346, 474], [314, 474],
        [314, 458], [282, 458], [282, 474], [250, 474], [250, 482]

    ];

    canvas = document.querySelector(".maze");
    ctx = canvas.getContext("2d");
    img = document.getElementById('mazeImg');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

});

// CLEAR SOLUTION
function reset() {
    stopped = true;
    currentPixel = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}


// SOLUTION - DRAW
function solve() {
    if (stopped) {
        currentPixel = 0;
        stopped = false;
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