
var cvs = document.getElementById("mycanvas");

var ctx = cvs.getContext('2d');

const ball_radius = 10;
const paddle_width = 82;
const paddle_height = 20;
const margin_bottom = 50;

//paddle specifications
let paddle = {
    x:(cvs.width - paddle_width)/2,
        
    y: (cvs.height - margin_bottom - paddle_height),
        
    width : paddle_width,
    
    height : paddle_height,
        
    dx : 5
};
    
//brick specifications
let brick = {
    row : 4,
    column: 8,
    width: 72,
    height: 24,
    padding: 15,
    offsetleft: 32,
    offsettop: 32
    
};


// ball specifications
let ball = {
    
    x: cvs.width/2,
    y: cvs.height -ball_radius - margin_bottom-paddle_height,
    radius : ball_radius,
    dx : 2,
    dy : -2 
    
};

// initialising bricks
let bricks = [];

for(i=0;i<brick.row;i++)
    {
        bricks[i] = [];
        for(j=0 ; j<brick.column ; j++)
            {
                bricks[i][j] = { x : 0 , y : 0 , status : 1};
            }
    }

// initialising score
let score = 0;

    
//setting up the keyup and keydown function
let leftarrow = false;
let rightarrow = false;


document.addEventListener("keydown", function(e){
   if(e.keyCode === 37)
       {
           leftarrow = true;
       }
    
    else if(e.keyCode === 39)
        {
            rightarrow = true;
        }
});

document.addEventListener("keyup", function(e){
   if(e.keyCode === 37)
       {
           leftarrow = false;
       }
    
    else if(e.keyCode === 39)
        {
            rightarrow = false;
        }
});


//drawing ball function
function drawball(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y , ball.radius , 0 , Math.PI * 2);
    
    ctx.fillStyle = "yellow";
    ctx.fill();
    
    ctx.strokeStyle = "black";
    ctx.stroke();
    
    ctx.closePath();
}

// drawing paddle function

function drawpaddle(){
     
    ctx.fillStyle = 'blue';
    ctx.fillRect(paddle.x,paddle.y,paddle.width,paddle.height);
 
    
    ctx.strokeStyle = 'black';
    ctx.strokeRect(paddle.x,paddle.y,paddle.width,paddle.height);
    
}


//drawing the bricks
function drawbricks(){
    
    for(i= 0 ;i<brick.row ;i++)
        {
            for(j = 0;j<brick.column ; j++)
                {
                    let b = bricks[i][j];
                    
                    if( b.status == 1)
                        {
                            let brickX = (j * (brick.width + brick.padding) + brick.offsetleft);
                            let brickY = (i * (brick.height + brick.padding) + brick.offsettop);
                            
                            b.x = brickX;
                            b.y = brickY;
                            
                            ctx.fillStyle = "red";
                            ctx.fillRect(brickX,brickY,brick.width,brick.height);
                            
                        }
                }
        }
}

// score-board
function drawScore()
{
    ctx.font = '18px Arial';
    ctx.fillStyle = 'brown';
    ctx.fillText('score: '+ score, 8, 20);
}

function collision()
{
    for(i=0;i<brick.row;i++)
    {
        for(j=0;j<brick.column;j++)
            {
                let b = bricks[i][j];
                if(b.status == 1)
                    {
                        if(ball.x +ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y +ball.radius > b.y && ball.y - ball.radius < b.y + brick.height )
                            {
                                ball.dy = -ball.dy;
                                b.status = 0;
                                score++;
                                
                                if(score == brick.row * brick.column)
                                    {
                                        alert('Congraulations!! You\'ve won!');
                                        document.location.reload();
                                    }
                                
                                
                            }
                    }
            }
    }
}

// main draw function which is called after every 10 ms.
function draw(){
    
    ctx.clearRect(0,0,cvs.width,cvs.height);
    
    drawpaddle();
    drawball();
    drawbricks();
    drawScore();
    collision();
    
    if(ball.x - ball.radius <0 || ball.x + ball.radius > cvs.width)
        {
            ball.dx = -ball.dx;
        }
    
    if( ball.y - ball.radius <0)
        {
            ball.dy = -ball.dy;
        }
    
    if(ball.y + ball.radius > paddle.y)
        {
            if(ball.x +ball.radius > paddle.x && ball.x -ball.radius < paddle.x + paddle.width)
                {
                    ball.dy = -ball.dy;
                }
            
        else 
        {
            alert('Game Over!!');
            
            document.location.reload();
            
        //after the document gets reloaded the ball changes its y-direction
        // so the below codeline is important
            
            ball.dy = -ball.dy;
    
        }
            
        }
    
   
    
   
    

if(leftarrow && paddle.x >0)
    {
        paddle.x -= paddle.dx;
    }

else if (rightarrow && paddle.x + paddle.width < cvs.width)
    {
        paddle.x += paddle.dx;
    }

    ball.x +=ball.dx;
    ball.y +=ball.dy;
};

setInterval(draw,10);
