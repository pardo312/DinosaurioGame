//Variables
var cnv = document.getElementById("cnv");
var ctx = cnv.getContext("2d");

var fps = 60;
var particulas = [];
var obstaculos = [];
var obstaculo = new Image();
obstaculo.src = "./player.png";


var animationFase = 1;
//Metodos
window.onload = function update() {
    dibujar();
    crearPantallaPrincipal();
    this.setInterval(dibujar, 1000 / fps);
    this.setInterval(moverParticulas, 2000 / fps);
   
}

function crearPantallaPrincipal() {
    //Particulas del piso
    for (var i = 0; i < 40; i++) {
        var numRandomX = randomNumGen(1, 600);
        var numRandomLargo = randomNumGen(1, 5);
        var numRandomY = randomNumGen(1, 10);
        particulas.push(new Particula(numRandomX, numRandomY, numRandomLargo));
        obstaculos.push(new Particula(numRandomX, numRandomY - 325, numRandomLargo));
    }
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
}

function dibujarJugador() {
    dinosaurio();
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
    //Dibujar Jugador
    dibujarJugador();


    //Dibujar Obstaculo

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
    constructor(x, y, largo) {
        this.x = x;
        this.y = y;
        this.largo = largo;
    }
    dibujarParticula() {
        
    }
    actualizar(x, y, largo) {
        this.x += x;
        this.y += y;
        this.largo += largo;
    }

}
//Funciones Extras
function randomNumGen(inicio, fin) {
    return Math.floor((Math.random() * fin) + inicio);
    
}

//Dibujo de dinosaurio
function dinosaurio() {
    //Cola
    ctx.fillRect(88, 307, 3, 9);
    ctx.fillRect(91, 310, 3, 9);
    ctx.fillRect(94, 313, 3, 9);
    ctx.fillRect(97, 313, 3, 12);

    //Pie 1
    ctx.fillRect(100, 310, 3, 27);
    ctx.fillRect(103, 307, 3, 24);
    //Patita 1
    ctx.fillRect(103, 334, 3, 3);

    //Cuerpo
    ctx.fillRect(106, 304, 3, 24);
    ctx.fillRect(109, 301, 3, 24);
    ctx.fillRect(112, 283, 3, 45);

    //Pie 2
    ctx.fillRect(115, 280, 3, 57);
    ctx.fillRect(118, 280, 3, 6);
    ctx.fillRect(118, 289, 3, 33);
    //Patita 2
    ctx.fillRect(118, 334, 3, 3);

    //Cabeza y brazo
    ctx.fillRect(121, 280, 3, 39);
    ctx.fillRect(124, 280, 3, 37);
    ctx.fillRect(127, 280, 3, 18);
    ctx.fillRect(127, 307, 3, 3);
    ctx.fillRect(130, 307, 3, 3);
    ctx.fillRect(130, 310, 3, 3);

    //Boca
    ctx.fillRect(130, 280, 3, 12);
    ctx.fillRect(130, 295, 3, 3);

    ctx.fillRect(133, 283, 3, 9);
    ctx.fillRect(133, 295, 3, 3);

    ctx.fillRect(136, 286, 3, 6);
    ctx.fillRect(136, 295, 3, 3);

    ctx.fillRect(139, 289, 3, 3);


    //Prueba

    ctx.fillRect(500, 325, 3, 30);
    
}