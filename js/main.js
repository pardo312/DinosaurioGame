//Variables
var cnv = document.getElementById("cnv");
var ctx = cnv.getContext("2d");

var fps = 60;
var particulas = [];
var obstaculos = [];
var obstaculo = new Image();
obstaculo.src = "./player.png";
var dino;
var key ;
var bajando = 0;
let salto = true;

var velocidadY =5  ;
var wut=1;

var animationFase = 1;
//Metodos
window.onload = function update() {
    dibujar();
    crearPantallaPrincipal();
    this.setInterval(saltar, 1000/ fps);
    this.setInterval(dibujar, 1000 / fps);   
    this.setInterval(dibujarJugador, 1000 / fps);
    this.setInterval(moverParticulas, 2000 / fps);
} 
//Teclado
document.body.onkeydown = function spacebar(e){
    if(e.keyCode == 32){
		
         key = "spacebar";
         
    }
}
function saltar()
{
    
	if(key == "spacebar" && salto ){
		
        dino.actualizarDino(0,-velocidadY);
       
        if(velocidadY > 0 )
        {
            velocidadY += dino.y * 0.001;
        }
        else{
            velocidadY -= dino.y * 0.001;
			
        }
        
        
        if(dino.y <= -73)
        {
            key = "bajando";
            salto= true; 
        }

        
    }
    else if(key == "bajando"){
        	
        if(velocidadY > 0 )
        {
			
            velocidadY -= dino.y * 0.001;
        }
        else{

            velocidadY += dino.y * 0.001;
        }
      
        dino.actualizarDino(0,velocidadY);
        if(dino.y > 0)
        {			
            key = "";
            bajando = 0;
            velocidadY = 5;
        }
        
    }
    
    
}
function crearPantallaPrincipal() {
    //Particulas del piso
    for (var i = 0; i < 40; i++) {
        var numRandomX = randomNumGen(1, 600);
        var numRandomLargo = randomNumGen(1, 5);
        var numRandomY = randomNumGen(1, 10);
        particulas.push(new Particula(numRandomX, numRandomY, numRandomLargo));

    }
    var viejoX = 300;
    for (var j = 0; j < 2; j++) {

        var numRandomX = randomNumGen(300, 2400);
        if (numRandomX < viejoX + 100) {
            numRandomX += 1000;
            viejoX = randomNumGen;
        }
        

        var numRandomLargo = randomNumGen(1, 5);
        var numRandomY = randomNumGen(1, 10);
        obstaculos.push(new Obstaculo(numRandomX, numRandomY));
        
           
    }
    dino = new Dino(0,0);
    dino.dibujar();
}

function dibujarJugador(){
    dino.dibujar();
}
function moverParticulas() {
    for (var i = 0; i < particulas.length; i++)
    {
        particulas[i].actualizar(-20, 0, 0);
        if (particulas[i].x < 0) {
            particulas.splice(i,1);
            particulas.push(new Particula(randomNumGen(500, 700), randomNumGen(5, 10), randomNumGen(1, 10)));
        }
    }
    for (var j = 0; j < obstaculos.length; j++) {
        obstaculos[j].actualizar(-20, 0, 0);
        if (obstaculos[j].x < 0) {            
            obstaculos.splice(j, 1);
            obstaculos.push(new Obstaculo(randomNumGen(500, 700), randomNumGen(5, 10)));
        }
    }
    
}



function dibujar() {
    
    //Constante
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    ctx.fillRect(0, 325, 600, 1);

    //Particulas del piso
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 325, 600, 1);
    for (var i = 0; i < particulas.length; i++) {
        particulas[i].dibujarParticula();
        
    }
    //Dibujar Obstaculo
    for (var j = 0; j < obstaculos.length; j++) {
        obstaculos[j].dibujarParticula();
    }
    
}

class Particula{
    constructor(x,y,largo) {
        this.x = x;
        this.y = y;
        this.largo = largo;
    }
    dibujarParticula() {
        ctx.fillRect(this.x, 325 + this.y, this.largo, 1);
    }
    actualizar(x, y, largo) {
        this.x += x;
        this.y += y;
        this.largo += largo;
    }
    
}

class Obstaculo {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    dibujarParticula() {
        ctx.fillRect(this.x, 310, 3, 30);
        ctx.fillRect(this.x - 12, 310, 27, 3);
        ctx.fillRect(this.x - 9, 307, 21, 3);
        ctx.fillRect(this.x -6, 304, 15, 3);
        ctx.fillRect(this.x - 3, 301, 9, 3);
        ctx.fillRect(this.x , 298, 3, 3);
    }
    actualizar(x, y) {
        this.x += x;
        this.y += y;
    }

}
//Funciones Extras
function randomNumGen(inicio, fin) {
    return Math.floor((Math.random() * fin) + inicio);
    
}

//Dibujo de dinosaurio
class Dino{

    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    dibujar() {
        //Cola
        ctx.fillRect(88+this.x, 307+this.y, 3, 9);
        ctx.fillRect(91+this.x, 310+this.y, 3, 9);
        ctx.fillRect(94+this.x, 313+this.y, 3, 9);
        ctx.fillRect(97+this.x, 313+this.y, 3, 12);
    
        //Pie 1
        ctx.fillRect(100+this.x, 310+this.y, 3, 27);
        ctx.fillRect(103+this.x, 307+this.y, 3, 24);
        //Patita 1
        ctx.fillRect(103+this.x, 334+this.y, 3, 3);
    
        //Cuerpo
        ctx.fillRect(106+this.x, 304+this.y, 3, 24);
        ctx.fillRect(109+this.x, 301+this.y, 3, 24);
        ctx.fillRect(112+this.x, 283+this.y, 3, 45);
    
        //Pie 2
        ctx.fillRect(115+this.x, 280+this.y, 3, 57);
        ctx.fillRect(118+this.x, 280+this.y, 3, 6);
        ctx.fillRect(118+this.x, 289+this.y, 3, 33);
        //Patita 2
        ctx.fillRect(118+this.x, 334+this.y, 3, 3);
    
        //Cabeza y brazo
        ctx.fillRect(121+this.x, 280+this.y, 3, 39);
        ctx.fillRect(124+this.x, 280+this.y, 3, 37);
        ctx.fillRect(127+this.x, 280+this.y, 3, 18);
        ctx.fillRect(127+this.x, 307+this.y, 3, 3);
        ctx.fillRect(130+this.x, 307+this.y, 3, 3);
        ctx.fillRect(130+this.x, 310+this.y, 3, 3);
    
        //Boca
        ctx.fillRect(130+this.x, 280+this.y, 3, 12);
        ctx.fillRect(130+this.x, 295+this.y, 3, 3);
    
        ctx.fillRect(133+this.x, 283+this.y, 3, 9);
        ctx.fillRect(133+this.x, 295+this.y, 3, 3);
    
        ctx.fillRect(136+this.x, 286+this.y, 3, 6);
        ctx.fillRect(136+this.x, 295+this.y, 3, 3);
    
        ctx.fillRect(139+this.x, 289+this.y, 3, 3);
    
    }
    actualizarDino(x,y){
        this.x += x;
        this.y += y;
    }
}
