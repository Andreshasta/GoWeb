var Instrucciones = {
  preload: function(){
    juego.stage.backgroundColor = '#FFF';
    //carga la imagen del boton
    juego.load.image('boton' , 'naves/imagenes/playButton.png');
},
create : function(){
    //inicializa el boton y le da una posicion en el canvas
    var boton = this.add.button(juego.width/3.8 , juego.height/4 , 'boton' , this.iniciarJuego , this);
    //texto de las instrucciones
    var txtInstrucciones = juego.add.text(juego.width/2 , juego.height/2 -85 ,"Con los cursores te mueves, 'S' y 'D' para golpear y 'F' para correr mas rapido" , {font : "bold 20px sans-serif" ,fill:"black" });
    //tamaño del texto
    txtInstrucciones.anchor.setTo(0.5);
},

iniciarJuego: function(){
    //ventana emergente de la pagina
    //alert("Se ha hecho click");
    //manda a juego.js
    this.state.start('Invaders');
}
};
