var table = [];
var blueish, violet, pink, turquoise, light_turquoise, indigo;
var bubble_count = 30;
var score = 0;
var img;
var bubble;
var fill_colors = [];
var stroke_colors = [];


function preload() {
  img = loadImage("fish.png");
  bubble = loadSound("bubble.wav");
}

function setup() {
  
  // define bg color
  blueish = color(101, 165, 232);
  createCanvas(800, 600);  
  background(blueish);
  textFont("Arial");
  
  frameRate(10);
  
  // define other colors
  indigo = color(75, 0, 130, 100);
  violet = color(48, 0, 211);
  light_pink = color(255, 204, 255);
  pink = color(255, 104, 200, 100);
  turquoise = color(0, 206, 209, 100);
  light_turquoise = color(64, 224, 208);
  fill_colors = [indigo, pink, turquoise];
  stroke_colors = [violet, light_pink, light_turquoise];
  
  // random table for init
  for (var i=0;i<30;i++) {
    // save x, y, and theta for each bubble, size, and color
    table[i] = [random(15, 785), random(15, 580), random(360), 1];
  }
  
}

function draw() {
  
  // check goal 
  if (score >= 50) {
    endGame();
  }
  else {
    
    // draw backgorund everytime so that it won't leave trace
    background(blueish);
    
    // show score on screen up left corner
    textSize(32);
    noStroke();
    text(score, 40, 50);
    
    // show bubbles
    fill(255);
    for(var i=0;i<30;i++) {
      // check for direction
      var seed = random(1);
      if (seed < 0.3) {
        // change direction
        var theta = random(360);
      } 
      else {
        // do not change direction
        var theta = table[i][2];
      }
      
      // calculate x, y distance
      var offset_x = cos(theta) * 20;
      var offset_y = sin(theta) * 20;
      
      // calculate the new position
      table[i][0] += offset_x;
      table[i][1] += offset_y;
      
      // check inside canvas
      table[i][0] = table[i][0] % 800;
      table[i][1] = table[i][1] % 600;
      if (table[i][0] < 0) 
        table[i][0] += 800;
      if (table[i][1] < 0)
        table[i][1] += 600;
      
      // finally draw
      strokeWeight(5);
      fill(fill_colors[i%3]);
      stroke(stroke_colors[i%3]);
      
      // three different size of bubbles 
      if (table[i][3] == 1) {
        ellipse(table[i][0], table[i][1], 20, 20);  
      } else if (table[i][3] == 2) {
        ellipse(table[i][0], table[i][1], 30, 30);
      } else if (table[i][3] >= 3) {
        ellipse(table[i][0], table[i][1], 40, 40);
      } 
    }
    
    // check collision
    check_collision();
    
    // my mouse should be a shark
    fill(0);
    image(img, mouseX, mouseY, 80, 60);
    
    
  } // end else
}

function calculate_square_distance(x1, y1, x2, y2) {
  return ((x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1));
}

function check_collision() {
  for (var i=0;i<30;i++) {
    for (var j=0;j<30;j++) {
      var distance = calculate_square_distance(table[i][0], table[i][1], table[j][0], table[j][1]);
      //console.log(distance);
      if ((distance < 400) && (i != j))  {
        // draw a big one
        table[i][3] += 1;
        // delete old ones and restart a new one
        table[j] = [random(785), random(585), random(360), 1];
      }
    }
    
    // eat the bubble
    var distance = calculate_square_distance(mouseX, mouseY, table[i][0], table[i][1]);
    if (distance < 150) {
      bubble.play();
      
      if (table[i][3] == 1){
        score += 10;
      } else if (table[i][3] == 2) {
        score += 20;
      } else if (table[i][3] == 3) {
        score += 30;
      }
      table[i][3] = 0;
    
    }
  }
}

function endGame() {
  background(100);
  textSize(60);
  noStroke();
  fill(255);
  text("You win!", 280, 80);
  
  // button to restart
  rect(200, 200, 200, 200);
  if (mouseIsPressed && (mouseX > 200) && (mouseX <400) && (mouseY>200) && (mouseY<400)) {
    score = 0;  
  }
  
}