PIXI.utils.sayHello();

var renderer = PIXI.autoDetectRenderer(512, 512, {
  transparent: true,
  resolution: 1
});

document.getElementById('display').appendChild(renderer.view);

var stage = new PIXI.Container();

var hatter;

hatter = new PIXI.Sprite(PIXI.Texture.WHITE);
hatter.width = 800;
hatter.height = 500;
hatter.tint = 202020;

stage.addChild(hatter);

var line = new PIXI.Sprite(PIXI.Texture.WHITE);
line.width = 800;
line.height = 5;
line.tint = 282830;
line.y = 400;

stage.addChild(line);

PIXI.loader
  .add("DavidAnimation", "char/David/DavidAnimationROW.png")
  .load(setup);

var sprite;

function setup() {
  stage.interactive = true;

  var frame = new PIXI.Rectangle(0, 0, 100, 100);
  var texture = PIXI.loader.resources["DavidAnimation"].texture;
  texture.frame = frame;

  sprite = new PIXI.Sprite(texture);
  var lol =false;


  var idle = setInterval(function() {
    if (frame.x >= 100 * 2) frame.x = 0;
    sprite.texture.frame = frame;
    frame.x += 100;
  }, 500)

  sprite.vy = 5;
  sprite.vx = 0;


  stage.addChild(sprite);

  animationLoop();

  

};

function animationLoop() {
  requestAnimationFrame(animationLoop);
  sprite.y += sprite.vy;
  if (sprite.y > 400 - 100) {

    sprite.jumping = false;
    sprite.y = 400 - 100;
    sprite.vy = 0;
  }

  sprite.x += sprite.vx;

  sprite.vx *= 0.9; //súrlódás
  sprite.vy *= 0.9; //felhajtóerő
  sprite.vy += 1.5; //gravitáció
  

  renderer.render(stage);
}

window.addEventListener("keydown", function(event)
{
  event.preventDefault();
  if (event.keyCode == 65 || event.keyCode === 37) {
  sprite.vx -= 0.6;
  }

  if (event.keyCode == 68 || event.keyCode === 39) {
  sprite.vx += 0.6;
  }

  if (event.keyCode == 87 || event.keyCode === 38 && sprite.jumping == false) {
  sprite.jumping = true;
  sprite.vy -= 20;
  }
});

