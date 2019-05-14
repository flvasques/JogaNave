var tela = null;
var contexto = null;
var FPS = 1000/30;
var imgPath = './img/';
var persoagemJogador = null;
var fundo = null;
var banner = null;

var controleGeral = {
	inicio: true,
	principal: 30,
	voltas: 0,
	tempo:0,
	chefe: false
};

var rodada = 0;
var controle = {
	timer: null,
	parado: false
};
window.onload = function(){
	tela = document.getElementById("tela");
	contexto = tela.getContext("2d");
	direcao = -1;
	

	window.addEventListener('keydown',function(e){
		if(!controleGeral.inicio){
			switch(e.keyCode){
				case 32:
					//tiro();
					break;
				case 90:
					//pause();
					break;
				default:
					direcao = e.keyCode;
					break;
			}
		}else if(controleGeral.inicio && e.keyCode == 13){
			//iniciar();
		}
	});
	window.addEventListener('keyup',function(e){
		if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40){ 
			direcao = -1;			
		}
	});

	

	var fundo = new Image();
	fundo.src = imgPath + 'fundo.jpg';
	var img = new Image();
	img.src = imgPath + 'inicio.png';
	banner = new Elemento(img, 500, 235);

	var nave = new Image();
	nave.src = imgPath + 'redfighter.png';
	persoagemJogador = new Personagem(nave, 55, 50);

	controle.timer = setInterval("inicio()",FPS);
}
function inicio(){
	direcao = 40;
	contexto.clearRect(0,0,tela.width,tela.height);
	banner.draw(contexto);
	banner.move(0,0,500,0);
}



function render(){
	contexto.clearRect(0,0,tela.width,tela.height);
	persoagemJogador.draw(contexto);
}
