var canvas = document.getElementById('snakeCanvas');
var context = canvas.getContext('2d');
var sizeOfSnake = 4;  //Define initial size of snake

/* Do not change the following*/
var transformer = sizeOfSnake * 10; 
var orient = 'R';
var counter = 0;
var score = 0;
/*---------------------------*/

class SnakeBits {
    constructor(xPos, yPos, xOrient, yOrient) {
        this.x = xPos;
        this.y = yPos;
        this.xOrient = xOrient;
        this.yOrient = yOrient;
    }
    draw() {
        context.beginPath();
        context.rect(this.x, this.y, 10, 10);
        context.closePath();
        context.stroke();
        // the fill color
        context.fillStyle = "white";
        context.fill();
    }
}
var wholeSnake = [];
for (let i = 0; i < transformer; i += 10) {
    wholeSnake.push(new SnakeBits(260 + i, 400, 1, 0));
};
function keyboard() {  //high complexity, can be improved
    window.addEventListener("keydown", function (event) {
        var change = wholeSnake.length;
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }
        switch (event.key) {
            case "ArrowDown":
                if (orient != 'U') { orient = 'D' }
                break;
            case "ArrowUp":
                if (orient != 'D') { orient = 'U' }
                break;
            case "ArrowLeft":
                if (orient != 'R') { orient = 'L' }
                break;
            case "ArrowRight":
                if (orient != 'L') { orient = 'R' }
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }
        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }, true);
}
class Food {
    constructor() {
        let a = Math.random() * canvas.width / 10;
        let b = Math.random() * canvas.height / 10;
        this.xf = a.toFixed() * 10;
        this.yf = b.toFixed() * 10;
    }
    create() {
        context.beginPath();
        context.rect(this.xf, this.yf, 10, 10);
        context.closePath();
        context.stroke();
        // the fill color
        context.fillStyle = "red";
        context.fill();
    }
    relocate() {
        let a = Math.random() * canvas.width / 10;
        let b = Math.random() * canvas.height / 10;
        this.xf = a.toFixed() * 10;
        this.yf = b.toFixed() * 10;
    }
}
var food = new Food;
/* Actual running code of game below */
setInterval(() => { //High complexity, can be improved 
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = wholeSnake.length - 1; i >= 0; i -= 1) {
        wholeSnake[i].draw();
        food.create();

        /* Check if snake is out of bounds */
        if ((wholeSnake[0].x > canvas.width) || (wholeSnake[0].x < 0) || (wholeSnake[0].y < 0) || (wholeSnake[0].y > canvas.height)) {
            alert('You Lost, final score: ' + score);
            break;
        }

        /* Check if head ate food */
        if (wholeSnake[0].x == food.xf && wholeSnake[0].y == food.yf) {
            wholeSnake.push(new SnakeBits(wholeSnake[wholeSnake.length - 1].x, wholeSnake[wholeSnake.length - 1].y,
                wholeSnake[wholeSnake.length - 1].xOrient, wholeSnake[wholeSnake.length - 1].yOrient));
            food.relocate();
            score += 10;
            document.getElementById("score").innerHTML = score;
        }

        /* Create snake based on location of head */ 
        if (i === 0) {
            wholeSnake[i].x += 10 * wholeSnake[i].xOrient;
            wholeSnake[i].y += 10 * wholeSnake[i].yOrient;
        } else {
            if ((counter > 10) && ((wholeSnake[0].x == wholeSnake[i].x) && (wholeSnake[0].y == wholeSnake[i].y))) {
                alert('You Lost, final score: ' + score);
                break;
            }
            wholeSnake[i].x = wholeSnake[i - 1].x;
            wholeSnake[i].y = wholeSnake[i - 1].y;
        }

        /*Check or change orientation*/ 
        keyboard();
        switch (orient) {
            case 'R':
                wholeSnake[i].xOrient = 1;
                wholeSnake[i].yOrient = 0;
                break;
            case 'L':
                wholeSnake[i].xOrient = -1;
                wholeSnake[i].yOrient = 0;
                break;
            case 'U':
                wholeSnake[i].xOrient = 0;
                wholeSnake[i].yOrient = -1;
                break;
            case 'D':
                wholeSnake[i].xOrient = 0;
                wholeSnake[i].yOrient = 1;
                break;
        }
        counter++;
    }
}, 60);



