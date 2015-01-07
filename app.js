DEFAULT_SNAKE_LENGTH = 4;
DEFAULT_SNAKE_WIDTH = 20;
DEFAULT_SNAKE_HEIGHT = 20;
DEFAULT_SNAKE_SPACE = 2;
DEFAULT_GRID_COUNT = 25;
RIGHT_DIRECTION = "right";
LEFT_DIRECTION = "left";
UP_DIRECTION = "up";
DOWN_DIRECTION = "down";

$(document).ready(function(){
    var canvas = $("#canvas")[0];
    var context = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    var direction;
    var food;
    var snakeArray = [];
    var score;
    function init(){
        direction = RIGHT_DIRECTION;
        createSnake();
        createFood();
        score = 0;
        if(typeof game_loop != "undefined") clearInterval(game_loop);
        game_loop = setInterval(paint, 100);
    };
    function paint(){
        context.fillStyle = "white";
        context.fillRect(0,0,width, height);
        context.fillStyle = "black";
        context.strokeRect(0,0,width, height);

        var headX = snakeArray[0].x;
        var headY = snakeArray[0].y;
        switch(direction){
            case RIGHT_DIRECTION:
                headX++;
                break;
            case LEFT_DIRECTION:
                headX--;
                break;
            case UP_DIRECTION:
                headY--;
                break;
            case DOWN_DIRECTION:
                headY++;
                break;
        }
        if(headX < 0 || headX > DEFAULT_GRID_COUNT || headY < 0 || headY > DEFAULT_GRID_COUNT || check_collision(headX, headY, snakeArray)){
            alert('天天，你输了～～ T_T \n 再来一次吧！');
            init();
            return;
        }
        if(headX == food.x && headY == food.y){
            score++;
            var tail = {x: headX, y: headY};
            createFood();
        }else{
            var tail = snakeArray.pop(); //pops out the last cell
            tail.x = headX; tail.y = headY;
        }

        snakeArray.unshift(tail);
        for(var i=0;i<snakeArray.length;i++){
            drawRec(snakeArray[i]);
        }
        drawRec(food);
        var score_text = "Score: " + score;
        context.fillText(score_text, 5, height - 5);
    };
    function createSnake(){
        snakeArray = [];
        for(var i = DEFAULT_SNAKE_LENGTH - 1; i >= 0 ; i--){
            var item = {x:i, y:0};
            snakeArray.push(item);
            drawRec(item);
        }
    };
    function check_collision(x, y, snakeArray){
       for(var i =0; i< snakeArray.length;i++){
           if (snakeArray[i].x==x && snakeArray[i].y == y) return true;
       }
       return false;
    };
    function createFood(){
        var randomX = Math.floor(Math.random() * DEFAULT_GRID_COUNT);
        var randomY = Math.floor(Math.random() * DEFAULT_GRID_COUNT);
        food = {x:randomX, y:randomY};
        drawRec(food);
    };
    init();
    function drawRec(item){
        context.fillStyle = "blue";
        var positionX = item.x * DEFAULT_SNAKE_WIDTH + (item.x - 1) * DEFAULT_SNAKE_SPACE;
        var positionY = item.y * DEFAULT_SNAKE_HEIGHT + (item.y - 1) * DEFAULT_SNAKE_SPACE;
        context.fillRect(positionX, positionY, DEFAULT_SNAKE_WIDTH, DEFAULT_SNAKE_HEIGHT);
    };
    //function drawStr(x, y){
    //    context.fillStyle = "white";
    //    context.strokeRect(x, y, DEFAULT_SNAKE_WIDTH, DEFAULT_SNAKE_HEIGHT);
    //};
    $(document).keydown(function(e){
        var key = e.which;
        switch (key){
            case 37:
                if (direction != RIGHT_DIRECTION) direction = LEFT_DIRECTION;
                break;
            case 38:
                if (direction != DOWN_DIRECTION) direction = UP_DIRECTION;
                break;
            case 39:
                if (direction != LEFT_DIRECTION) direction = RIGHT_DIRECTION;
                break;
            case 40:
                if (direction != UP_DIRECTION) direction = DOWN_DIRECTION;
                break;
        }
    });
});