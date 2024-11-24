/* VARIABLES */
// Background
let homeBg = "papayawhip";
let beeBg = "gold";
let hareBg = "pink";

// Style
let font;
let textColor = "#3f2b18";
let buttonColor = "#e8b9b1";

// Screen
let screen = "classroom";

// Music and sound effects
let classroomMusic;
let bedroomMusic;
let click;

// Images
// items in classroom view
let playerImg, deskImg, teacherImg, dialogue;
// items in bedroom view
let fridgeImg, bedImg, tableImg, doorImg, matImg, weightsImg;
// items in desk view
let laptopImg, papersImg;

// Sprites
let player, desk, teacher;
let fridge, bed, table, door, mat, weights;
let laptop, papers;
let classroomItems;
let bedroomItems;
let deskItems;
// let rocksGenerated = false;
// let beeSet = false;
// let homeSet = false;
// let hareSet = false;

// Confetti
// let confetti;
// let confettiCreated = false;

/* PRELOAD LOADS FILES */
function preload(){
  // Font
  font = loadFont('assets/Pangolin-Regular.ttf');

  // Music and sound effects
  // classroomMusic = loadSound('assets/'); // find suitable music
  // bedroomMusic = loadSound('assets/'); // find suitable music
  // click = loadSound('assets/'); // find good button click sound

  // Backgrounds
  classroomBg = loadImage('assets/classroom_background.jpg'); // classroom view
  bedroomBg = loadImage('assets/bedroom_background.jpeg'); // bedroom view
  deskBg = loadImage('assets/desk_top_view.jpg') // desk top view 

  // Sprites
  // items in classroom view
  playerImg = loadImage('assets/player.jpg');
  deskImg = loadImage('assets/desk.png'); 
  teacherImg = loadImage('assets/teacher.png');
  // dialogue = loadImage('assets/');
  // items in bedroom view
  // fridgeImg = loadImage('assets/fridge.jpg');
  // bedImg = loadImage('assets/bedroom.jpg');
  // tableImg = loadImage('assets/table.png');
  // doorImg = loadImage('assets/door.jpg');
  // matImg = loadImage('assets/mat.jpg');
  // weightsImg = loadImage('assets/weights.jpg');
  // // items in desk view
  // laptopImg = loadImage('assets/laptop.jpg');
  // papersImg = loadImage('assets/paper.jpg');
}

function textStyle() {
  fill(textColor);
  textSize(14);
  textFont(font);
  textWrap(WORD);
  textAlign(CENTER);
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(1000,400);
  // background(homeBg);
  // fill(textColor);
  // textSize(14);
  // textFont(font);
  // textWrap(WORD);
  // textAlign(CENTER);

  // Play music
  // bgMusic.play();

  // Create player!
  player = createSprite(50, 350, playerImg.width, playerImg.height);
  player.addImage(playerImg);
  player.scale = 0.02;
  player.rotationLock = true;
  // turtle.color = buttonColor;

  // Create buttons
  deskBtn = createSprite(-200, -200, deskImg.width, deskImg.height);
  deskBtn.immovable = true;
  deskBtn.addImage(deskImg);
  deskBtn.scale = 0.12;
  // homeBtn.visible = false;
  // homeBtn.mouseActive = false;
  
  teacherBtn = createSprite(100, 230, teacherImg.width, teacherImg.height);
  teacherBtn.addImage(teacherImg);
  teacherBtn.scale = 0.03;
  // beeBtn.color = buttonColor;
  // beeBtn.text = "Bee";
  
  // Overlaps
  player.overlaps(deskBtn);
  player.overlaps(teacherBtn);
  
  // Write instructions
  // textStyle();
  // text("Click on any animal to give it some hope!", width/2-125, 30, 250);
  
}

/* DRAW LOOP REPEATS */
function draw() {
  // Play background music!
  // if (!classroomMusic.isPlaying()) {
  //   classroomMusic.play();
  // }
  
  // If the desk is clicked, show a message about the test
  if (deskBtn.mouse.released()) {
    newMessage = advanceStory();
  }
  if (newMessage == "done") {
    bedroomSetup();
  } else {
    text(newMessage, 10, 30, 200);
  }

  // If the user has selected a screen, take them to it!
    
    // After the setup, the player will start collecting flowers and earning points
    if (kb.pressing('up')) {
      turtle.vel.y = -3;
      turtle.vel.x = 0;
    } else if (kb.pressing('down')) {
      turtle.vel.y = 3;
      turtle.vel.x = 0;
    } else if (kb.pressing('left')) {
      turtle.vel.x = -3;
      turtle.vel.y = 0;
    } else if (kb.pressing('right')) {
      turtle.vel.x = 3;
      turtle.vel.y = 0;
    } else {
      turtle.speed = 0;
    } 
    
    if (turtle.collides(flower)){
      // print("hit");
      flower.position.x = random(25, width-25);
      flower.position.y = random(25, width-25);
      flowers++;
    } else if (turtle.collided(rocks)){
      flowers--;
    }

    // Win screen!
    if (flowers%10 == 0 && flowers > 0) {
      beeWin();
    }
    
    // Display score
    text("Flowers Collected: " + flowers, 10, 30, 100);
    
  } else if (screen === "beeWin") {
    background(beeBg);
    // Display win message
    textAlign(CENTER);
    textSize(24);
    text("You Won!", width/2, height/2-20);
    textSize(16);
    text("Click to go back to the valley.", width/2, height/2+20);
    
  } else if (screen === "hareGame") {
    background(hareBg);
    
  } else if (screen === "home") {
    // Set background
    background(homeBg);

    // Text style
    fill(textColor);
    textSize(14);
    textFont(font);
    textWrap(WORD);
    textAlign(CENTER);

    // Instructions
    text("Click on any animal to give it some hope!", width/2-125, 30, 250);
    
    // Hare coming soon message
    text("Coming soon!", 310-50, 320, 100);
    
  }

  // drawSprites();
}

/* FUNCTIONS */
function testResults() {
  
}

function classroomSetup() {
  // Set screen to classroom
  screen = "classroom";

  // Remove any generated game sprites from minigames
  if (bedroomItems) {
    bedroomItems.removeAll();
  }
  if (deskItems) {
    deskItems.removeAll();
  }
  // if (confetti) {
  //   confetti.removeAll();
  //   confettiCreated = false;
  // }

  // Reset player
  player.position.x = 50;
  player.position.y = 350;
  
  // Set buttons
  // is there a better way to do this?
  deskBtn.position.x = 100
  deskBtn.position.y = 230;
  teacherBtn.position.x = 100
  teacherBtn.position.y = -200

  // Write instructions

}

function bedroomSetup() {
  screen = "bedroom";

  // Set items
  fridgeBtn.position.x = -200
  fridgeBtn.position.y = -200;

  bedBtn.position.x = width+200
  bedBtn.position.y = height+200;

  tableBtn.position.x = 100
  tableBtn.position.y = 100

  doorBtn.position.x = width-35
  doorBtn.position.y = 25;

  matBtn.position.x = 50
  matBtn.position.y = 100

  weightsBtn.position.x = 10
  weightsBtn.position.y = 100


  // Set player position
  player.position.x = width/2;
  player.position.y = height/2;

  // Add items to list
  bedroomItems = new Group;
  bedroomItems.add(fridgeBtn, bedBtn, tableBtn, doorBtn, matBtn, weightsBtn)
  //rocksGenerated = true;

}

function beeWin() {
  // Set screen
  screen = "beeWin";

  // Clear sprites off game board
  rocks.removeAll();
  turtle.position.x = -200;
  turtle.position.y = -200;
  flower.position.x = -400;
  flower.position.y = -400;

  // Set button position
  homeBtn.position.x = width/2;
  homeBtn.position.y = height/2+50;
  // textStyle();
  
  // Confetti!!
  if (!confettiCreated) {
    createConfetti();
  }
}

/* Function to create confetti! */
function createConfetti() {
  confetti = new Group();
  for (let i = 0; i < 30; i++) {
    if (i%2) {
      shape = flowerImg;
    } else {
      shape = beeImg;
    }
    piece = createSprite(random(width), 0, shape.width, shape.height, 'k');
    piece.addImage(shape);
    piece.scale = 0.02;
    piece.direction = (random(60, 120));
    piece.speed = random(2,8);
    print("created");
    confetti.add(piece);
  }
  yay.play();
  confettiCreated = true;
}

/* Remove confetti so player can keep playing */
function removeConfetti() {
   confetti.removeAll();
}

// broken; sprite is drawn infinitely while falling, don't know why
function hareSetup() {
  // Set screen
  screen = "hareGame";
  
  // Set background
  // background(hareBg);
  // homeBtn.visible = true;
  // beeBtn.visible = false;
  // beeBtn.mouseActive = false;
  // hareBtn.visible = false;
  // hareBtn.mouseActive = false;

  // Set buttons
  beeBtn.position.x = -200
  beeBtn.position.y = -200;
  hareBtn.position.x = width+200
  hareBtn.position.y = height+200;
  homeBtn.position.x = width-35
  homeBtn.position.y = 25;

  // Set turtle position
//   world.gravity.y = 9.8;
//   turtle.speed = 0;
//   turtle.position.x = width/2;
//   turtle.position.y = height/2;

  // Show platforms
//   platforms = new Group;
//   platform = createSprite(width/2, 350, rockImg.width, rockImg.height, 's');
//   platform.addImage(rockImg);
//   platform.scale = 0.05
//   platforms.add(platform);
  
}