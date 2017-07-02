var juego = new Phaser.Game(800, 600, Phaser.CANVAS, 'bloque-juego');

//juego.state.add('Instrucciones', Instrucciones);
juego.state.add('Invaders', Invaders);

//juego.state.start('Instrucciones');
juego.state.start('Invaders');
