let solution;
let labirint;
let canvas;
let ctx;
document.addEventListener('DOMContentLoaded', function () {

    labirint = [
        [2, 2, 130, 2], [146, 2, 226, 2], [226, 2, 482, 2], [18, 18, 34, 18], [82, 18, 114, 18],
        [146, 18, 194, 18], [258, 18, 306, 18], [338, 18, 354, 18], [386, 18, 418, 18], [450, 18, 466, 18],
        [34, 34, 82, 34], [114, 34, 130, 34], [162, 34, 178, 34], [194, 34, 226, 34], [258, 34, 322, 34],
        [354, 34, 386, 34], [402, 34, 434, 34], [466, 34, 482, 34], [2, 50, 34, 50], [66, 50, 98, 50],
        [146, 50, 162, 50], [178, 50, 194, 50], [226, 50, 258, 50], [274, 50, 322, 50], [386, 50, 434, 50],
        [450, 50, 466, 50], [18, 66, 34, 66], [50, 66, 66, 66], [82, 66, 114, 66], [130, 66, 146, 66],
        [162, 66, 226, 66], [242, 66, 274, 66], [290, 66, 306, 66], [370, 66, 418, 66], [434, 66, 450, 66],
        [98, 82, 130, 82], [146, 82, 162, 82], [178, 82, 194, 82], [210, 82, 258, 82], [306, 82, 322, 82],
        [338, 82, 402, 82], [450, 82, 466, 82], [2, 98, 114, 98], [178, 98, 242, 98], [322, 98, 338, 98],
        [354, 98, 370, 98], [402, 98, 482, 98], [34, 114, 50, 114], [66, 114, 82, 114], [98, 114, 130, 114],
        [146, 114, 226, 114], [242, 114, 274, 114], [338, 114, 354, 114], [370, 114, 418, 114], [450, 114, 466, 114],
        [18, 130, 34, 130], [50, 130, 66, 130], [82, 130, 130, 130], [162, 130, 194, 130], [226, 130, 242, 130],
        [274, 130, 306, 130], [322, 130, 354, 130], [386, 130, 434, 130], [18, 146, 50, 146], [66, 146, 82, 146],
        [114, 146, 130, 146], [194, 146, 210, 146], [258, 146, 418, 146], [434, 146, 466, 146], [34, 162, 66, 162],
        [82, 162, 114, 162], [130, 162, 178, 162], [242, 162, 306, 162], [370, 162, 402, 162], [418, 162, 434, 162],
        [466, 162, 482, 162], [18, 178, 50, 178], [98, 178, 130, 178], [146, 178, 162, 178], [178, 178, 194, 178],
        [210, 178, 242, 178], [290, 178, 306, 178], [322, 178, 386, 178], [402, 178, 418, 178], [434, 178, 450, 178],
        [2, 194, 34, 194], [50, 194, 114, 194], [194, 194, 210, 194], [242, 194, 258, 194], [274, 194, 290, 194],
        [306, 194, 338, 194], [370, 194, 418, 194], [450, 194, 482, 194], [2, 210, 18, 210], [34, 210, 66, 210],
        [82, 210, 98, 210], [114, 210, 130, 210], [146, 210, 178, 210], [210, 210, 226, 210], [258, 210, 306, 210],
        [338, 210, 354, 210], [386, 210, 402, 210], [450, 210, 466, 210], [18, 226, 34, 226], [50, 226, 114, 226],
        [130, 226, 258, 226], [274, 226, 290, 226], [306, 226, 338, 226], [354, 226, 386, 226], [434, 226, 450, 226],
        [66, 242, 82, 242], [98, 242, 130, 242], [146, 242, 194, 242], [242, 242, 290, 242], [370, 242, 418, 242],
        [450, 242, 466, 242], [18, 258, 66, 258], [82, 258, 114, 258], [178, 258, 210, 258], [258, 258, 322, 258],
        [354, 258, 370, 258], [418, 258, 434, 258], [2, 274, 18, 274], [66, 274, 82, 274], [98, 274, 114, 274],
        [130, 274, 178, 274], [226, 274, 242, 274], [258, 274, 290, 274], [338, 274, 386, 274], [434, 274, 450, 274],
        [18, 290, 34, 290], [50, 290, 66, 290], [82, 290, 98, 290], [114, 290, 162, 290], [178, 290, 242, 290],
        [258, 290, 274, 290], [322, 290, 354, 290], [370, 290, 418, 290], [66, 306, 82, 306], [114, 306, 146, 306],
        [162, 306, 178, 306], [210, 306, 226, 306], [258, 306, 290, 306], [306, 306, 322, 306], [354, 306, 370, 306],
        [418, 306, 434, 306], [466, 306, 482, 306], [2, 322, 18, 322], [34, 322, 50, 322], [82, 322, 114, 322],
        [146, 322, 162, 322], [178, 322, 210, 322], [226, 322, 242, 322], [290, 322, 306, 322], [370, 322, 386, 322],
        [402, 322, 466, 322], [18, 338, 34, 338], [66, 338, 146, 338], [194, 338, 226, 338], [242, 338, 290, 338],
        [322, 338, 338, 338], [386, 338, 466, 338], [18, 354, 50, 354], [66, 354, 162, 354], [178, 354, 210, 354],
        [242, 354, 258, 354], [338, 354, 386, 354], [418, 354, 434, 354], [450, 354, 466, 354], [2, 370, 34, 370],
        [114, 370, 130, 370], [162, 370, 178, 370], [194, 370, 242, 370], [274, 370, 290, 370], [306, 370, 354, 370],
        [370, 370, 450, 370], [466, 370, 482, 370], [50, 386, 114, 386], [130, 386, 194, 386], [226, 386, 258, 386],
        [386, 386, 402, 386], [418, 386, 434, 386], [450, 386, 466, 386], [34, 402, 66, 402], [114, 402, 130, 402],
        [146, 402, 162, 402], [194, 402, 210, 402], [306, 402, 322, 402], [354, 402, 434, 402], [450, 402, 482, 402],
        [18, 418, 34, 418], [50, 418, 82, 418], [114, 418, 162, 418], [210, 418, 242, 418], [258, 418, 306, 418],
        [322, 418, 338, 418], [386, 418, 418, 418], [2, 434, 18, 434], [34, 434, 114, 434], [130, 434, 146, 434],
        [162, 434, 178, 434], [194, 434, 242, 434], [274, 434, 290, 434], [306, 434, 322, 434], [338, 434, 370, 434],
        [18, 450, 34, 450], [66, 450, 82, 450], [98, 450, 130, 450], [146, 450, 194, 450], [242, 450, 274, 450],
        [290, 450, 338, 450], [354, 450, 386, 450], [402, 450, 418, 450], [2, 466, 50, 466], [66, 466, 98, 466],
        [130, 466, 162, 466], [210, 466, 242, 466], [274, 466, 290, 466], [338, 466, 354, 466], [386, 466, 402, 466],
        [434, 466, 466, 466], [2, 482, 242, 482], [258, 482, 482, 482], [2, 2, 2, 482], [18, 18, 18, 34],
        [18, 66, 18, 82], [18, 98, 18, 130], [18, 146, 18, 178], [18, 242, 18, 258], [18, 306, 18, 322],
        [18, 338, 18, 354], [18, 386, 18, 418], [18, 434, 18, 450], [34, 18, 34, 34], [34, 66, 34, 98],
        [34, 130, 34, 146], [34, 194, 34, 242], [34, 258, 34, 338], [34, 370, 34, 402], [34, 418, 34, 434],
        [50, 2, 50, 18], [50, 34, 50, 82], [50, 114, 50, 130], [50, 178, 50, 194], [50, 242, 50, 258],
        [50, 274, 50, 290], [50, 306, 50, 322], [50, 338, 50, 386], [50, 402, 50, 418], [50, 434, 50, 466],
        [66, 18, 66, 34], [66, 66, 66, 114], [66, 130, 66, 162], [66, 178, 66, 194], [66, 290, 66, 370],
        [66, 466, 66, 482], [82, 50, 82, 82], [82, 114, 82, 130], [82, 146, 82, 178], [82, 226, 82, 242],
        [82, 258, 82, 290], [82, 370, 82, 386], [82, 402, 82, 418], [82, 434, 82, 450], [98, 18, 98, 50],
        [98, 130, 98, 146], [98, 194, 98, 210], [98, 242, 98, 258], [98, 274, 98, 322], [98, 354, 98, 370],
        [98, 386, 98, 434], [114, 34, 114, 66], [114, 146, 114, 162], [114, 210, 114, 226], [114, 306, 114, 322],
        [114, 370, 114, 402], [114, 434, 114, 450], [114, 466, 114, 482], [130, 2, 130, 34], [130, 50, 130, 130],
        [130, 146, 130, 210], [130, 226, 130, 258], [130, 274, 130, 290], [130, 322, 130, 338], [130, 450, 130, 466],
        [146, 18, 146, 34], [146, 82, 146, 146], [146, 194, 146, 210], [146, 242, 146, 274], [146, 306, 146, 322],
        [146, 370, 146, 386], [146, 418, 146, 450], [162, 34, 162, 66], [162, 82, 162, 98], [162, 130, 162, 194],
        [162, 242, 162, 258], [162, 290, 162, 306], [162, 322, 162, 370], [162, 402, 162, 418], [178, 18, 178, 34],
        [178, 98, 178, 98], [178, 146, 178, 162], [178, 178, 178, 226], [178, 258, 178, 290], [178, 306, 178, 354],
        [178, 370, 178, 434], [178, 466, 178, 482], [194, 34, 194, 50], [194, 66, 194, 98], [194, 114, 194, 146],
        [194, 162, 194, 178], [194, 194, 194, 210], [194, 274, 194, 306], [194, 354, 194, 370], [194, 418, 194, 482],
        [210, 2, 210, 34], [210, 50, 210, 66], [210, 130, 210, 162], [210, 178, 210, 194], [210, 210, 210, 274],
        [210, 370, 210, 418], [210, 450, 210, 466], [226, 2, 226, 18], [226, 50, 226, 66], [226, 114, 226, 210],
        [226, 242, 226, 290], [226, 306, 226, 338], [226, 354, 226, 370], [226, 386, 226, 402], [226, 434, 226, 450],
        [242, 18, 242, 50], [242, 66, 242, 82], [242, 98, 242, 114], [242, 130, 242, 162], [242, 194, 242, 210],
        [242, 242, 242, 258], [242, 290, 242, 322], [242, 354, 242, 370], [242, 402, 242, 418], [242, 450, 242, 482],
        [258, 2, 258, 18], [258, 34, 258, 50], [258, 82, 258, 98], [258, 114, 258, 146], [258, 162, 258, 194],
        [258, 210, 258, 242], [258, 274, 258, 290], [258, 306, 258, 322], [258, 338, 258, 354], [258, 370, 258, 450],
        [258, 466, 258, 482], [274, 50, 274, 114], [274, 178, 274, 194], [274, 306, 274, 338], [274, 354, 274, 402],
        [274, 450, 274, 466], [290, 66, 290, 130], [290, 194, 290, 210], [290, 226, 290, 242], [290, 274, 290, 306],
        [290, 338, 290, 370], [290, 386, 290, 418], [290, 434, 290, 466], [306, 82, 306, 130], [306, 162, 306, 194],
        [306, 226, 306, 242], [306, 258, 306, 274], [306, 290, 306, 370], [306, 386, 306, 402], [306, 418, 306, 434],
        [306, 466, 306, 482], [322, 18, 322, 34], [322, 50, 322, 82], [322, 98, 322, 130], [322, 146, 322, 178],
        [322, 194, 322, 226], [322, 242, 322, 290], [322, 306, 322, 322], [322, 338, 322, 386], [322, 402, 322, 434],
        [322, 450, 322, 466], [338, 18, 338, 98], [338, 146, 338, 162], [338, 226, 338, 274], [338, 290, 338, 338],
        [338, 370, 338, 418], [338, 434, 338, 450], [338, 466, 338, 482], [354, 34, 354, 66], [354, 98, 354, 130],
        [354, 162, 354, 258], [354, 274, 354, 290], [354, 306, 354, 354], [354, 386, 354, 402], [354, 418, 354, 434],
        [370, 2, 370, 18], [370, 50, 370, 82], [370, 114, 370, 146], [370, 194, 370, 210], [370, 242, 370, 258],
        [370, 290, 370, 306], [370, 322, 370, 338], [370, 354, 370, 386], [370, 402, 370, 434], [370, 450, 370, 482],
        [386, 18, 386, 50], [386, 98, 386, 114], [386, 210, 386, 226], [386, 258, 386, 274], [386, 290, 386, 306],
        [386, 322, 386, 354], [386, 386, 386, 402], [386, 418, 386, 466], [402, 82, 402, 98], [402, 146, 402, 162],
        [402, 178, 402, 210], [402, 226, 402, 290], [402, 306, 402, 322], [402, 354, 402, 370], [402, 434, 402, 450],
        [418, 2, 418, 18], [418, 66, 418, 82], [418, 162, 418, 178], [418, 210, 418, 242], [418, 258, 418, 274],
        [418, 290, 418, 306], [418, 386, 418, 402], [418, 418, 418, 466], [434, 18, 434, 82], [434, 114, 434, 162],
        [434, 178, 434, 258], [434, 290, 434, 306], [434, 354, 434, 370], [434, 402, 434, 466], [450, 2, 450, 50],
        [450, 66, 450, 82], [450, 98, 450, 130], [450, 146, 450, 178], [450, 194, 450, 210], [450, 242, 450, 322],
        [450, 338, 450, 354], [450, 370, 450, 450], [466, 50, 466, 66], [466, 130, 466, 146], [466, 178, 466, 194],
        [466, 210, 466, 242], [466, 258, 466, 306], [466, 418, 466, 466], [482, 2, 482, 482],
    ];
    solution = [
        [138, 2], [138, 58], [154, 58], [154, 74], [170, 74],
        [170, 106], [234, 106], [234, 122], [250, 122], [250, 154],
        [314, 154], [314, 186], [346, 186], [346, 202], [330, 202],
        [330, 218], [346, 218], [346, 266], [378, 266], [378, 250],
        [394, 250], [394, 282], [362, 282], [362, 298], [346, 298],
        [346, 346], [330, 346], [330, 362], [362, 362], [362, 394],
        [378, 394], [378, 378], [442, 378], [442, 458], [458, 458],
        [458, 410], [474, 410], [474, 474], [426, 474], [426, 410],
        [378, 410], [378, 442], [346, 442], [346, 458], [330, 458],
        [330, 474], [314, 474], [314, 458], [298, 458], [298, 474],
        [266, 474], [266, 458], [250, 458], [250, 482],
    ];

    canvas = document.querySelector(".maze");
    ctx = canvas.getContext("2d");
    drawMaze();
});

// MAZE - DRAW
function drawMaze() {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.beginPath();

    for (let i = 0; i < labirint.length; i++) {
        ctx.moveTo(labirint[i][0], labirint[i][1]);
        ctx.lineTo(labirint[i][2], labirint[i][3]);
    }
    ctx.stroke();
    ctx.closePath();
}

// SOLUTION - DRAW
function solve() {
    ctx.strokeStyle = "green";
    ctx.lineWidth = 4;
    ctx.lineCap = "square";
    ctx.beginPath();

    for (let i = 0; i < solution.length; i++) {
        ctx.lineTo(solution[i][0], solution[i][1]);
    }
    ctx.stroke();
    ctx.closePath();
}

// CLEAR SOLUTION
function reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
}


