//Collisions
//Collision between groups
//function called upon collision

var obstacles;
var collectibles_1;
var collectibles_5;
var asterisk;

var count1=0;
var count2=0;
var count3=0;
var count4=0;
var count5=0;
var count6=0;
var count7=0;


function setup() {
  createCanvas(1100, 700);


  //create a user controlled sprite
  asterisk = createSprite(400, 200);
  asterisk.addAnimation('normal', 'img/milk.png','img/shampoo.png');

  asterisk.addAnimation('stretch', 'img/shampoo.png', 'img/milk.png');

  //create 2 groups
  obstacles = new Group();
  collectibles_1 = new Group();
  collectibles_2 = new Group();
  collectibles_3 = new Group();
  collectibles_4 = new Group();
  collectibles_5 = new Group();
  collectibles_6 = new Group();
  collectibles_7 = new Group();



  for(var j=0; j<10; j++)
  {
    var dot = createSprite(random(0, width), random(0, height));
    dot.addAnimation('normal', 'img/cap.png');
    collectibles_1.add(dot);

    var milk = createSprite(random(0, width), random(0, height));
    milk.addAnimation('normal', 'img/milk.png');
    collectibles_2.add(milk);

    var shoe_b = createSprite(random(0, width), random(0, height));
    shoe_b.addAnimation('normal', 'img/shoe_b.png');
    collectibles_3.add(shoe_b);

    var bag = createSprite(random(0, width), random(0, height));
    bag.addAnimation('normal', 'img/plastic_bag.png');
    collectibles_4.add(bag);

    var bottle = createSprite(random(0, width), random(0, height));
    bottle.addAnimation('normal', 'img/bottle.png');
    collectibles_5.add(bottle);


  }

  for(var i=0; i<12; i++)
  {
    var box_a = createSprite(random(0, width), random(0, height));
    box_a.addAnimation('normal', 'img/rocks/rock_a.png');
    // var box_b = createSprite(random(0, width), random(0, height));
    // box_b.addAnimation('normal', 'img/rocks/rock_b.png');
    // var box_c = createSprite(random(0, width), random(0, height));
    // box_c.addAnimation('normal', 'img/rocks/rock_c.png');
    var box_d = createSprite(random(0, width), random(0, height));
    box_d.addAnimation('normal', 'img/rocks/rock_d.png');

    obstacles.add(box_a);
    // obstacles.add(box_b);
    // obstacles.add(box_c);
    obstacles.add(box_d);


  }

  for(var i=0; i<allSprites.length; i++) {

    //sprites on the bottom will be drawn first
    allSprites[i].depth = allSprites[i].position.y;

    //you can link the scale to the y position to simulate perspective
    //allSprites[i].scale = map(allSprites[i].position.y, 0, height, 0.2, 1);
  }

}



function draw() {
  background(255, 255, 255);

  text(count1,10,10,50,50);
  text(count5,100,10,50,50);


  //if no arrow input set velocity to 0
  // asterisk.velocity.x = (mouseX-asterisk.position.x)/20;
  // asterisk.velocity.y = (mouseY-asterisk.position.y)/20;

  if(keyWentDown('w'))
  {
    asterisk.velocity.y = -5;
  }else if (keyWentUp('w'))
  {
    asterisk.velocity.y = 0;
  }

  if(keyWentDown('a'))
  {
    asterisk.velocity.x = -5;
  }else if (keyWentUp('a'))
  {
    asterisk.velocity.x = 0;
  }

  if(keyWentDown('s'))
  {
    asterisk.velocity.y = 5;
  }else if (keyWentUp('s'))
  {
    asterisk.velocity.y = 0;
  }

  if(keyWentDown('d'))
  {
    asterisk.velocity.x = 5;
  }else if (keyWentUp('d'))
  {
    asterisk.velocity.x = 0;
  }


  //asterisk collides against all the sprites in the group obstacles
  asterisk.collide(obstacles);

  //I can define a function to be called upon collision, overlap, displace or bounce
  //see collect() below
  asterisk.overlap(collectibles_1, collect1);
  asterisk.overlap(collectibles_2, collect2);
  asterisk.overlap(collectibles_3, collect3);
  asterisk.overlap(collectibles_4, collect4);
  asterisk.overlap(collectibles_5, collect5);
  asterisk.overlap(collectibles_6, collect6);
  asterisk.overlap(collectibles_7, collect7);


  //if the animation is "stretch" and it reached its last frame
  if(asterisk.getAnimationLabel() == 'stretch' && asterisk.animation.getFrame() == asterisk.animation.getLastFrame())
  {
    asterisk.changeAnimation('normal');
  }

  drawSprites();
}

//the first parameter will be the sprite (individual or from a group)
//calling the function
//the second parameter will be the sprite (individual or from a group)
//against which the overlap, collide, bounce, or displace is checked
