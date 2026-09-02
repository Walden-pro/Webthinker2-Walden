//   image(background,0,0,width,height);
//   if(kb.presses ("space") || mouse.presses("left")){
//     bird.visible = true;
//     bird.collider = 'dynamic';
//     startGame= true;
//     startScreenLabel.visible = false;

    
//   }
//   if (startGame){
      
//   if(kb.presses ("space") || mouse.presses("left")){
//     bird.sleeping = false;// make sure no sprite is not idle
//     bird.vel.y = -5; //Up velocity
//     flapSound.play();
//   }
// bird = new Sprite();
//   bird.img = birdMidImg;
//   bird.width = 30;
//   bird.height = 30;
//   bird.mass = 2;//heavyness
//   bird.bounciness = 0.5;//higher is bouncier
//   bird.drag = 0.02;//air resistance
//   bird.collider = "static";//collidable, movable and affected by physics
//   image(background,0,0,width,height);
//   if(kb.presses ("space") || mouse.presses("left")){
//     bird.sleeping = false;// make sure no sprite is not idle
//     bird.vel.y = -5; //Up velocity
//   }