
var jugador;
var jugador2;
var aliens;
var balas;
var bulletTime = 0;
var tiempoBala = 0;
var cursors;
var fireButton;
var fireButton2;
var explosions;
var starfield;
var score = 0;
var scoreJugador2 = 0;
var scoreString = '';
var scoreString2;
var scoreText;
var scoreText2;
var vidas;
var vidas2;
var derecha;
var izquierda;
var balasEnemiga;
var balasEnemiga2;
var firingTimer = 0;
var stateText;
var livingEnemies = [];
var Invaders = {
 preload: function() {

    juego.load.image('balas', 'imagenes/bullet.png');
    juego.load.image('ship2', 'imagenes/invader.png');
    juego.load.image('balasEnemiga', 'imagenes/enemy-bullet.png');
    juego.load.image('balasEnemiga2', 'imagenes/enemy-bullet.png');
    juego.load.spritesheet('invader', 'imagenes/invader32x32x4.png', 32, 32);
    juego.load.image('ship', 'imagenes/player.png');
    juego.load.spritesheet('kaboom', 'imagenes/explode.png', 128, 128);
    juego.load.image('starfield', 'imagenes/images.jpg');
    juego.load.image('background', 'imagenes/background2.png');

},

 create: function() {

    juego.physics.startSystem(Phaser.Physics.ARCADE);

    //  Inicializa el fondo 
    starfield = juego.add.tileSprite(0, 0, 800, 600, 'starfield');

    //  Balas de los jugadores
    balas = juego.add.group();
    balas.enableBody = true;
    balas.physicsBodyType = Phaser.Physics.ARCADE;
    balas.createMultiple(30, 'balas');
    balas.setAll('anchor.x', 0.5);
    balas.setAll('anchor.y', 1);
    balas.setAll('outOfBoundsKill', true);
    balas.setAll('checkWorldBounds', true);

    // Balas enemigas
    balasEnemigas = juego.add.group();
    balasEnemigas.enableBody = true;
    balasEnemigas.physicsBodyType = Phaser.Physics.ARCADE;
    balasEnemigas.createMultiple(50, 'balasEnemiga');
    balasEnemigas.setAll('anchor.x', 0.5);
    balasEnemigas.setAll('anchor.y', 1);
    balasEnemigas.setAll('outOfBoundsKill', true);
    balasEnemigas.setAll('checkWorldBounds', true);

    balasEnemigas2 = juego.add.group();
    balasEnemigas2.enableBody = true;
    balasEnemigas2.physicsBodyType = Phaser.Physics.ARCADE;
    balasEnemigas2.createMultiple(50, 'balasEnemiga2');
    balasEnemigas2.setAll('anchor.x', 0.5);
    balasEnemigas2.setAll('anchor.y', 1);
    balasEnemigas2.setAll('outOfBoundsKill', true);
    balasEnemigas2.setAll('checkWorldBounds', true);

    //  Los jugadores
    jugador = juego.add.sprite(400, 500, 'ship');
    jugador.anchor.setTo(0.5, 0.5);
    juego.physics.enable(jugador, Phaser.Physics.ARCADE);

    jugador2 = juego.add.sprite(400,500, 'ship2');
    jugador2.anchor.setTo(0.5,0.5);
    juego.physics.enable(jugador2, Phaser.Physics.ARCADE);

    //  Los enemigos
    aliens = juego.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;

    createAliens();

    //  Puntuacion
    scoreString = 'jugador 1: ';
    scoreText = juego.add.text(10, 10, scoreString + score, { font: '25px Arial', fill: '#fff' });

    scoreString2 = 'jugador 2: ';
    scoreText2 = juego.add.text(10, 32, scoreString2 + scoreJugador2, { font: '25px Arial', fill: '#fff'});

    //  vidas
    vidas = juego.add.group();
    juego.add.text(juego.world.width - 100, 10, 'vidas1 : ', { font: '25px Arial', fill: '#fff' });

    vidas2 = juego.add.group();
    juego.add.text(juego.world.width - 100, 75, 'vidas2 : ', { font: '25px Arial', fill: '#fff' });

    //  Texto
    stateText = juego.add.text(juego.world.centerX,juego.world.centerY,' ', { font: '45px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    for (var i = 0; i < 3; i++){
        var ship = vidas.create(juego.world.width - 100 + (30 * i), 60, 'ship');
        ship.anchor.setTo(0.5, 0.5);
        ship.angle = 90;
        ship.alpha = 0.4;
    }

    for (var j = 0; j < 3; j++){
      var nave2 = vidas2.create(juego.world.width - 100 + (30*j),118,'ship2');
      nave2.anchor.setTo(0.5,0.5);
      nave2.angle = 90;
      nave2.alpha = 0.4;
    }
    //  crea la animacion de la explocion
    explosions = juego.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(setupInvader, this);

    // Define los controles del juego
    cursors = juego.input.keyboard.createCursorKeys();
    fireButton = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    derecha = juego.input.keyboard.addKey(Phaser.Keyboard.D);
    izquierda = juego.input.keyboard.addKey(Phaser.Keyboard.A);
    fireButton2 = juego.input.keyboard.addKey(Phaser.Keyboard.W);

},


 update: function() {

    //  Mueve el fondo del juego
    starfield.tilePosition.y += 2;

    if (jugador.alive && jugador2.alive)
    {
        // Reaccion al accionar una tecla
        jugador.body.velocity.setTo(0, 0);
        jugador2.body.velocity.setTo(0, 0);

        if (cursors.left.isDown)
        {
            jugador.body.velocity.x = -200;
        }
        else if (cursors.right.isDown)
        {
            jugador.body.velocity.x = 200;
        }
        if(derecha.isDown){
          jugador2.body.velocity.x = 200;
        }else if(izquierda.isDown){
          jugador2.body.velocity.x = -200;
        }

        // Cuando un jugador dispara
        if (fireButton.isDown)
        {
            fireBullet(1);
        }
        if(fireButton2.isDown){
          fireBullet(2);
        }
        if (juego.time.now > firingTimer)
        {
            enemyFires();
        }

        // Controla los impactos del juego
        juego.physics.arcade.overlap(balas, aliens, collisionHandler, null, this);
        juego.physics.arcade.overlap(balas, aliens, destruirEnemigo, null, this);
        juego.physics.arcade.overlap(balasEnemigas, jugador, enemyHitsPlayer, null, this);
        juego.physics.arcade.overlap(balasEnemigas2, jugador2, enemyHitsPlayer2, null, this);
    }

}

};
function restart() {

   //reinicia las vidas
   vidas.callAll('revive');
   vidas2.callAll('revive');
   //  Se vuelven a crear los aliens
   aliens.removeAll();
   createAliens();

   //reviven los jugadores
   jugador.revive();
   jugador2.revive();
   //Se oculta el texto
   stateText.visible = false;

}
function resetBullet(balas) {

   //  se destruye la bala cuando sale del campo
   balas.kill();

}
function render() {

    //for (var i = 0; i < aliens.length; i++)
    //{
    //    juego.debug.body(aliens.children[i]);
    //}

}
function enemyHitsPlayer (jugador,bullet) {

   bullet.kill();

   vida = vidas.getFirstAlive();

   if (vida)
   {
       vida.kill();
   }

   //  Explocion del jugador 1
   var explosion = explosions.getFirstExists(false);
   explosion.reset(jugador.body.x, jugador.body.y);
   explosion.play('kaboom', 30, false, true);

   // Cuando el jugador muere
   if (vidas.countLiving() < 1)
   {
       jugador.kill();
       balasEnemigas.callAll('kill');

       stateText.text=" Ha ganado el Jugador 2 \n Haga click para volver a jugar";
       stateText.visible = true;

       //reinicia el juego
       juego.input.onTap.addOnce(restart,this);
   }
 }
function enemyHitsPlayer2 (jugador2,bullet) {

      bullet.kill();

      vida2 = vidas2.getFirstAlive();

      if (vida2)
      {
          vida2.kill();
      }

      //  La explocion
      var explosion = explosions.getFirstExists(false);
      explosion.reset(jugador2.body.x, jugador2.body.y);
      explosion.play('kaboom', 30, false, true);

      // El jugador muere
      if (vidas2.countLiving() < 1)
      {
          jugador2.kill();
          balasEnemigas2.callAll('kill');

          stateText.text=" Ha ganado el jugador 1 \n Haga click para volver a jugar";
          stateText.visible = true;

          //Se reinicia el juego
          juego.input.onTap.addOnce(restart,this);
      }

}
function collisionHandler(bullet, alien) {

   //  Se destruye la bala y al enemigo
   bullet.kill();
   alien.kill();
     //  aumenta el puntaje
  score += 20;
  scoreText.text = scoreString + score;

   //  Se crea la explocion
   var explosion = explosions.getFirstExists(false);
   explosion.reset(alien.body.x, alien.body.y);
   explosion.play('kaboom', 30, false, true);

   if (aliens.countLiving() == 0)
   {

       //balasEnemigas.callAll('kill',this);
       //stateText.text = " You Won, \n Click to restart";
       //stateText.visible = true;
       createAliens();
       //the "click to restart" handler
       //juego.input.onTap.addOnce(restart,this);
   }

}

function destruirEnemigo(bullet, alien) {

   //  Se destruye la bala y al enemigo
   bullet.kill();
   alien.kill();
     //  aumenta el puntaje
  scoreJugador2 += 20;
  scoreText2.text = scoreString2 + scoreJugador2;

   //  Animacion de la explocion
   var explosion = explosions.getFirstExists(false);
   explosion.reset(alien.body.x, alien.body.y);
   explosion.play('kaboom', 30, false, true);

   if (aliens.countLiving() == 0)
   {

       //balasEnemigas.callAll('kill',this);
       //stateText.text = " You Won, \n Click to restart";
       //stateText.visible = true;
       createAliens();
       //the "click to restart" handler
       //juego.input.onTap.addOnce(restart,this);
   }

}

function descend() {

   aliens.y += 100;

}
function setupInvader(invader) {

   invader.anchor.x = 0.5;
   invader.anchor.y = 0.5;
   invader.animations.add('kaboom');

}
function fireBullet(aux) {

   if (juego.time.now > bulletTime)
   {
       if (aux == 1){
         bala = balas.getFirstExists(false);

         if (bala)
         {
             //  los enemigos disparan
             bala.reset(jugador.x, jugador.y + 8);
             bala.body.velocity.y = -400;
             bulletTime = juego.time.now + 500;
         }
         }
       }
       if (juego.time.now > tiempoBala){
         if(aux == 2){
           bala2 = balas.getFirstExists(false);

           if (bala2)
           {
              //  Los enemigos disparan
              bala2.reset(jugador2.x, jugador2.y + 8);
              bala2.body.velocity.y = -400;
              tiempoBala = juego.time.now + 500;
            }
          }
       }


}

function enemyFires() {

   balasEnemiga = balasEnemigas.getFirstExists(false);
   balasEnemiga2 = balasEnemigas2.getFirstExists(false);
   livingEnemies.length=0;

   aliens.forEachAlive(function(alien){

       // Guarda todos los enemigos en un arreglo
       livingEnemies.push(alien);
   });


   if (balasEnemiga && balasEnemiga2 && livingEnemies.length > 0)
   {

       var random=juego.rnd.integerInRange(0,livingEnemies.length-1);


       var shooter=livingEnemies[random];

       balasEnemiga.reset(shooter.body.x, shooter.body.y);
       balasEnemiga2.reset(shooter.body.x, shooter.body.y);

       juego.physics.arcade.moveToObject(balasEnemiga,jugador,120);
       juego.physics.arcade.moveToObject(balasEnemiga2,jugador2,120);
       firingTimer = juego.time.now + 900;
   }

}
function createAliens() {

   for (var y = 0; y < 5; y++)
   {
       for (var x = 0; x < 10; x++)
       {
           var alien = aliens.create(x * 48, y * 50, 'invader');
           alien.anchor.setTo(0.5, 0.5);
           alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
           alien.play('fly');
           alien.body.moves = false;
       }
   }

   aliens.x = 100;
   aliens.y = 50;


   var tween = juego.add.tween(aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

   tween.onLoop.add(descend, this);
};
