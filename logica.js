//CRIADOR POR FERNANDO VASQUES 11230153
var direcao = -1;
var FPS = 1000/30;
var controleGeral = {
	inicio: true,
	principal: 30,
	voltas: 0,
	tempo:0,
	chefe: false
}
var rodada = 0;
var controle = {
	timer: setInterval("inicio()",FPS),
	parado: false
};
var inimigos = {
	contador:  0,
	vetorNaves: [],
	/*
		{
			tipo: char, (n, e, m, c)
			estado: string, (criado, pronto, final)
			id: string,
			posX: int,
			posY: int,
			dim: int,
			rest: int,
			max: int,
			contador: 0,
			vetorTiros: [] 
			{
				id: string,
				posX: int,
				posY: int
				dir: char,
				dano: int,
			}					
		}
	*/
	contadorTiros: 0,
};
var personagem = {
	vida: 100,
	contador: 0,
	posX: 450,
	posY: 550,
	dim: 50,
	vetorTiros: [], 
	/*
		id: string,
		posX: int,
		posY: int,
	*/
	pontos: 0,
	dano: 1 
};
var pts = [];
/*
{
	nome: string,
	pts: int
}
*/
window.addEventListener('keydown',function(e){
	if(!controleGeral.inicio){
		switch(e.keyCode){
			case 32:
				tiro();
				break;
			case 90:
				pause();
				break;
			default:
				direcao = e.keyCode;
				break;
		}
	}else if(controleGeral.inicio && e.keyCode == 13){
		iniciar();
	}
});
window.addEventListener('keyup',function(e){
	if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40){ 
		direcao = -1;
		nave.style.backgroundPositionX = "0px";
	}
});
function pause(){
	if(controle.parado){
		controle.timer = setInterval("animar()",FPS);
		controle.parado = false;
	}else{
		clearInterval(controle.timer);
		controle.parado = true;
	}
}

document.getElementById('tela').style="background: url('./img/fundo.jpg'); background-repeat:  repeat-y; background-position: 0px 1400px; overflow: hidden;";
document.getElementById('nave').style="position: absolute; top: 550px; left: 450px; background: url('./img/redfighter.png'); background-repeat:  no-repeat; background-position: 0px 0px; overflow: hidden;"
document.getElementById('inicio').style="background: url('./img/inicio.png');background-repeat:  no-repeat; background-position: 0px 0px; overflow: hidden; ";
function animarFundo(){
	switch(direcao){
		case 38:
			document.getElementById('tela').style.backgroundPositionY = (parseInt(document.getElementById('tela').style.backgroundPositionY) + 15) +'px';
			break;
		case 40:
			document.getElementById('tela').style.backgroundPositionY = (parseInt(document.getElementById('tela').style.backgroundPositionY) + 5) +'px';
			break;
		default:
			document.getElementById('tela').style.backgroundPositionY = (parseInt(document.getElementById('tela').style.backgroundPositionY) + 10) +'px';
			break;
	}	
}
function inicio(){
	direcao = 40;
	animarFundo();
	if(parseInt(document.getElementById('inicio').style.backgroundPositionX) - 500 > -1500){
		document.getElementById('inicio').style.backgroundPositionX = (parseInt(document.getElementById('inicio').style.backgroundPositionX) - 500) + 'px';
	}else{
		document.getElementById('inicio').style.backgroundPositionX = '0px';
	}
}

function iniciar(){
	controleGeral.inicio = false;
	document.getElementById('inicio').remove();
	direcao = -1;
	clearInterval(controle.timer);
	controle.timer = setInterval("abertura()",FPS);
}
function abertura(){
	animarFundo();
	direcao = 38;
	if(personagem.posY >= 250){
		personagem.posY -= 15;
		nave.style.top = personagem.posY + 'px';
	}else{
		direcao = -1;
		if(controleGeral.principal >= 0){
			controleGeral.principal--;
		}else{
			controleGeral.principal = 0;
			clearInterval(controle.timer);
			controle.timer = setInterval("animar()",FPS);
			criaInimigo(2,'n');
		}
	}
}
function tiro(){
	var id = 'a' + personagem.contador
	personagem.contador++;
	var ajuste = (personagem.dim / 2) - 2.5;
	var alt = personagem.posY;
	var hr = personagem.posX + ajuste;
	personagem.vetorTiros.push({
		id: id,
		posX: hr,
		posY: alt
	});
	var tiro = document.createElement("div");
	tiro.setAttribute('style','position: absolute; top: ' + alt+ '; left: ' + hr + 'px; width: 5px; height: 10px; background-color: red;');
	tiro.setAttribute('id',id);
	document.getElementById("tela").appendChild(tiro);
}
function movimentaTiro(){
	for(var conta = 0; conta < personagem.vetorTiros.length; conta++){
		var id = personagem.vetorTiros[conta].id;
		if(personagem.vetorTiros[conta].posY <= -20){
			personagem.vetorTiros.splice(conta,1);
			document.getElementById(id).remove();
		}else{
			personagem.vetorTiros[conta].posY -= 20
			document.getElementById(id).style.top = personagem.vetorTiros[conta].posY + 'px';
		}
	}
}
function criaInimigo(qtd,tipo){
	for(var i = 0; i < qtd; i++){
		var id = 'i'+inimigos.contador;
		var classe = null;
		var nave = null;
		var posY = 0;
		var res = 0;
		var maximo = 0;
		var dim = 0;
		switch(tipo){
			case 'n':
				classe = 'n';
				if(parseInt(Math.random() * 2) == 0){
					var posX = parseInt(Math.random() * 451);
				}else{
					var posX = parseInt(Math.random() * 451) + 500;
				}
				nave = document.createElement('div');
				posY = -40;
				res = 1;
				maximo = 1;
				dim = 40;
				nave.setAttribute('id',id);
				nave.setAttribute('style','position: absolute; top: -40px; left: ' + posX + 'px; width: 40px; height: 40px; background: url("./img/alien1.png"); background-repeat:  no-repeat; background-position: 0px 0px; overflow: hidden;');
				break;
			case 'e':
				classe = 'e';
				posY = parseInt(Math.random() * 251);
				posX = -40;
				res = 2;
				maximo = 4;
				dim = 40;
				nave = document.createElement('div');
				nave.setAttribute('id',id);
				nave.setAttribute('style','position: absolute; top: ' + posY + 'px; left: -40px; width: 40px; height: 40px; background: url("./img/alien2.png"); background-repeat:  no-repeat; background-position: 0px 0px; overflow: hidden;');
				break;
			case 'm':
				classe = 'm';
				var exite = false;
				for(var j = 0; j < inimigos.vetorNaves.length && !exite; j++){
					exite = inimigos.vetorNaves[j].tipo == 'm';
				}							
				inc = exite ? 501 : 0;
				posX = parseInt(Math.random() * 451) + inc;
				poxY = -40;
				res = 1;
				maximo = 30;
				dim = 40;
				nave = document.createElement('div');
				nave.setAttribute('id',id);
				nave.setAttribute('style','position: absolute; top: -40px; left: ' + posX + 'px; width: 40px; height: 40px; background: url("./img/alien3.png"); background-repeat:  no-repeat; background-position: 0px 0px; overflow: hidden;');
				break;
			case 'c':
				classe = 'c';
				posX = 450;
				posY = -150;
				res = 1;
				maximo = 3;
				dim = 150;
				nave = document.createElement('div');
				nave.setAttribute('id',id);
				nave.setAttribute('style','position: absolute; top: -150px; left: ' + posX + 'px; width: 150px; height: 150px; background: url("./img/chefe1.png"); background-repeat:  no-repeat; background-position: 0px 0px; overflow: hidden;');
				break;
		}
		inimigos.vetorNaves.push({
			tipo: classe,
			estado: 'criado',
			id: id,
			posX: posX,
			posY: posY,
			dim: dim,
			rest: res,
			max: maximo,
			contador: 0,
			vetorTiros:[]							
		});
		inimigos.contador++;
		document.getElementById('tela').appendChild(nave);
	}
}
function movimentaInimigo(){
	for(var conta = 0; conta < inimigos.vetorNaves.length; conta++){
		var id = inimigos.vetorNaves[conta].id;
		var altura = inimigos.vetorNaves[conta].posY;
		var lateral = inimigos.vetorNaves[conta].posX;
		switch(inimigos.vetorNaves[conta].tipo){
			case 'n':
				if(parseInt(document.getElementById(id).style.backgroundPositionX) - 40 > -560){
					document.getElementById(id).style.backgroundPositionX = (parseInt(document.getElementById(id).style.backgroundPositionX) - 40) + 'px';
				}else{
					document.getElementById(id).style.backgroundPositionX = '0px';
				}
				if(inimigos.vetorNaves[conta].estado == 'pronto'){
					if(altura < 540){
						inimigos.vetorNaves[conta].posY = altura + 5;
						document.getElementById(id).style.top = inimigos.vetorNaves[conta].posY + 'px';
					}else{
						inimigos.vetorNaves.splice(conta,1);
						document.getElementById(id).remove();
					}
				} else {
					if(altura < 200 && inimigos.vetorNaves[conta].estado == 'criado'){
						inimigos.vetorNaves[conta].posY = altura + 25;
						document.getElementById(id).style.top = inimigos.vetorNaves[conta].posY + 'px';
					}else{
						inimigos.vetorNaves[conta].estado = "meio";
						if(altura >= 100){
							inimigos.vetorNaves[conta].posY = altura - 10;
						document.getElementById(id).style.top = inimigos.vetorNaves[conta].posY + 'px';
						} else {
							inimigos.vetorNaves[conta].estado = "pronto";
						}	
					}
				}
				break;
			case 'e':
			if(parseInt(document.getElementById(id).style.backgroundPositionX) - 40 > -240){
					document.getElementById(id).style.backgroundPositionX = (parseInt(document.getElementById(id).style.backgroundPositionX) - 40) + 'px';
				}else{
					document.getElementById(id).style.backgroundPositionX = '0px';
				}
				inimigos.vetorNaves[conta].posX += 5;
				document.getElementById(id).style.left = inimigos.vetorNaves[conta].posX + 'px';
				var px =  parseInt(document.getElementById(id).style.left);
				if(px > 40 && px < 250){
					inimigos.vetorNaves[conta].estado  = 'pri';
				}else if(px > 250 && px < 500){
					inimigos.vetorNaves[conta].estado  = 'seg';
				}else if(px > 500 && px < 750){
					inimigos.vetorNaves[conta].estado  = 'ter';
				}else if(px > 750 && px < 1000){
					inimigos.vetorNaves[conta].estado  = 'quar';
				}else if(px > 1000){
					for(var i  = 0; i < inimigos.vetorNaves[conta].vetorTiros.length; i ++){
						document.getElementById(inimigos.vetorNaves[conta].vetorTiros[i].id).remove();
					}
					inimigos.vetorNaves.splice(conta,1);
					document.getElementById(id).remove();
				}
				break;
			case 'm':
				if(altura <= 150 && inimigos.vetorNaves[conta].estado == 'criado'){
					inimigos.vetorNaves[conta].posY += 10;
					document.getElementById(id).style.top = inimigos.vetorNaves[conta].posY + 'px';
				}else if(altura >= 150 && inimigos.vetorNaves[conta].estado == 'criado'){
					inimigos.vetorNaves[conta].estado = 'pronto';
				}else if(altura > -40 && inimigos.vetorNaves[conta].estado == 'final'){
					inimigos.vetorNaves[conta].posY -= 10;
					document.getElementById(id).style.top = inimigos.vetorNaves[conta].posY + 'px';
				}else if(altura <= -40 && inimigos.vetorNaves[conta].estado == 'final' && inimigos.vetorNaves[conta].vetorTiros.length == 0){
					inimigos.vetorNaves.splice(conta,1);
					document.getElementById(id).remove();	
				}
				break;
			case 'c':
			if(parseInt(document.getElementById(id).style.backgroundPositionX) - 40 > -900){
					document.getElementById(id).style.backgroundPositionX = (parseInt(document.getElementById(id).style.backgroundPositionX) - 150) + 'px';
				}else{
					document.getElementById(id).style.backgroundPositionX = '0px';
				}
				if(inimigos.vetorNaves[conta].estado == 'criado'){
					inimigos.vetorNaves[conta].posY += 10;
					document.getElementById(id).style.top = inimigos.vetorNaves[conta].posY + 'px';
					inimigos.vetorNaves[conta].estado = altura >= 150 ? 'vai' : 'criado';
				}else if(inimigos.vetorNaves[conta].estado != 'criado'){
					if(inimigos.vetorNaves[conta].estado == 'vai'){
						inimigos.vetorNaves[conta].posX += 10;
						document.getElementById(id).style.left = inimigos.vetorNaves[conta].posX + 'px';;
						inimigos.vetorNaves[conta].estado = lateral >= 750 ? 'volta' : 'vai';
					}else if(inimigos.vetorNaves[conta].estado == 'volta'){
						inimigos.vetorNaves[conta].posX -= 10;
						document.getElementById(id).style.left = inimigos.vetorNaves[conta].posX + 'px';;
						inimigos.vetorNaves[conta].estado = lateral <= 100 ? 'vai' : 'volta';
					}	
				}
				break;
		}
	}
}
function disparosInimigos(){
	var id = null;
	var objeto = null;
	var px = 0;
	var py = 0;
	var alvo = null;
	var atirou = false;
	var dano = 0;
	var alvo = personagem.posX;
	for(var cont = 0; cont < inimigos.vetorNaves.length;  cont++){
		id = inimigos.vetorNaves[cont].id + '-' + inimigos.vetorNaves[cont].contador;
		px = inimigos.vetorNaves[cont].posX + (inimigos.vetorNaves[cont].dim / 2) - 5;
		py = inimigos.vetorNaves[cont].posY + inimigos.vetorNaves[cont].dim;
		switch(inimigos.vetorNaves[cont].tipo){
			case 'n':
				alvo = personagem.posX > px ? 'd' : 'e';
				var dano = 1;
				if(inimigos.vetorNaves[cont].estado == 'pronto' && (inimigos.vetorNaves[cont].vetorTiros.length < inimigos.vetorNaves[cont].max)){
					objeto = document.createElement('div');
					objeto.setAttribute('id', id);
					objeto.setAttribute('style','position: absolute; top: ' + py + 'px ; left: ' + px + 'px; width: 10px; height: 10px; background-color: red;');
					document.getElementById('tela').appendChild(objeto);
					atirou = true;
					dano = 1;
				}
				break;
			case 'e':
				alvo = personagem.posX > px ? 'd' : 'e';
				var atira =  parseInt(Math.random() * 2);
				var estado = inimigos.vetorNaves[cont].estado;
				var nTiros = inimigos.vetorNaves[cont].vetorTiros.length;
				if((atira == 1) && (((px > 40 && px < 250) && estado == 'pri' && nTiros == 0) || ((px > 250 && px < 500) && estado == 'seg' && nTiros <= 1) || ((px > 500 && px < 750) && estado == 'ter' && nTiros <= 2) || ((px > 750 && px < 1000) && estado == 'quar' && nTiros <= 3))){
					objeto = document.createElement('div');
					objeto.setAttribute('id', id);
					objeto.setAttribute('style','position: absolute; top: ' + py + 'px; left: ' + px + 'px; width: 10px; height: 10px; background-color: purple;');
					document.getElementById('tela').appendChild(objeto);
					atirou = true;
					dano = 1;
				}
				break;
			case 'm':
				var atira = (parseInt(Math.random() * 2) == 1);
				if(inimigos.vetorNaves[cont].estado == 'pronto' && (inimigos.vetorNaves[cont].contador <= inimigos.vetorNaves[cont].max) && atira){
					objeto = document.createElement('div');
					objeto.setAttribute('id', id);
					objeto.setAttribute('style','position: absolute; top: ' + py + 'px; left: ' + px + 'px; width: 10px; height: 10px; background-color: black;');
					document.getElementById('tela').appendChild(objeto);
					atirou = true;
					dano = 1
				}else if(inimigos.vetorNaves[cont].contador >= inimigos.vetorNaves[cont].max){
					inimigos.vetorNaves[cont].estado = 'final';
				}
				break;
			case 'c':
				if(controleGeral.tempo % 30 == 0){
					id = inimigos.vetorNaves[cont].id + '-' +inimigos.vetorNaves[cont].contador;
					px = inimigos.vetorNaves[cont].posX + 10;
					py = inimigos.vetorNaves[cont].posY + 140;
					objeto = document.createElement('div');
					objeto.setAttribute('id', id);
					objeto.setAttribute('style','position: absolute; top: ' + py + 'px; left: ' + px + 'px; width: 10px; height: 10px; background-color: black;');
					document.getElementById('tela').appendChild(objeto);
					inimigos.vetorNaves[cont].vetorTiros.push({
						id: id,
						posX: px,
						posY: py,
						dir: 'e',
						dano: 15,
					});						
					inimigos.vetorNaves[cont].contador++;
					id = inimigos.vetorNaves[cont].id + '-' +inimigos.vetorNaves[cont].contador;
					px = inimigos.vetorNaves[cont].posX + 75;
					py = inimigos.vetorNaves[cont].posY + 140;
					objeto = document.createElement('div');
					objeto.setAttribute('id', id);
					objeto.setAttribute('style','position: absolute; top: ' + py + 'px; left: ' + px + 'px; width: 10px; height: 10px; background-color: black;');
					document.getElementById('tela').appendChild(objeto);
					inimigos.vetorNaves[cont].vetorTiros.push({
						id: id,
						posX: px,
						posY: py,
						dir: 'r',
						dano: 15,
					});						
					inimigos.vetorNaves[cont].contador++;
					id = inimigos.vetorNaves[cont].id + '-' +inimigos.vetorNaves[cont].contador;
					px = inimigos.vetorNaves[cont].posX + 140;
					py = inimigos.vetorNaves[cont].posY + 125;
					objeto = document.createElement('div');
					objeto.setAttribute('id', id);
					objeto.setAttribute('style','position: absolute; top: ' + py + 'px; left: ' + px + 'px; width: 10px; height: 10px; background-color: black;');
					document.getElementById('tela').appendChild(objeto);
					inimigos.vetorNaves[cont].vetorTiros.push({
						id: id,
						posX: px,
						posY: py,
						dir: 'd',
						dano: 15,
					});						
					inimigos.vetorNaves[cont].contador++;
				}	
				break;
		}
		if(atirou){
			inimigos.vetorNaves[cont].vetorTiros.push({
				id: id,
				posX: px,
				posY: py,
				dir: alvo,
				dano: dano,
			});						
			inimigos.vetorNaves[cont].contador++;
			atirou = false;
		}
	}
}			
function movimentaTirosInimigos(){
	var id = null;
	var top = 0;
	var left = 0;
	for(var conta = 0; conta < inimigos.vetorNaves.length; conta++){
		for(var j = 0; j < inimigos.vetorNaves[conta].vetorTiros.length; j++){
			id = inimigos.vetorNaves[conta].vetorTiros[j].id;
			top = inimigos.vetorNaves[conta].vetorTiros[j].posY;
			left = inimigos.vetorNaves[conta].vetorTiros[j].posX;
			if((top >= 500) || left <= 0 || left >= 990){
				inimigos.vetorNaves[conta].vetorTiros.splice(j,1);
				document.getElementById(id).remove();
			}else{
				switch(inimigos.vetorNaves[conta].tipo){
					case 'n':
						inimigos.vetorNaves[conta].vetorTiros[j].posY += 20;
						document.getElementById(id).style.top = inimigos.vetorNaves[conta].vetorTiros[j].posY + 'px';
						if(inimigos.vetorNaves[conta].vetorTiros[j].dir == 'e'){
							inimigos.vetorNaves[conta].vetorTiros[j].posX -= 10;
						} else {
							inimigos.vetorNaves[conta].vetorTiros[j].posX += 10;
						}
						document.getElementById(id).style.left = inimigos.vetorNaves[conta].vetorTiros[j].posX + 'px';
						break;
					case 'e':
						inimigos.vetorNaves[conta].vetorTiros[j].posY += 5;
						document.getElementById(id).style.top = inimigos.vetorNaves[conta].vetorTiros[j].posY + 'px';
						if(inimigos.vetorNaves[conta].vetorTiros[j].dir == 'e'){
							inimigos.vetorNaves[conta].vetorTiros[j].posX -= 10;
						} else {
							inimigos.vetorNaves[conta].vetorTiros[j].posX += 10;
						}
						document.getElementById(id).style.left = inimigos.vetorNaves[conta].vetorTiros[j].posX + 'px';
						break;
					case 'm':
						inimigos.vetorNaves[conta].vetorTiros[j].posY += 20;
						document.getElementById(id).style.top = inimigos.vetorNaves[conta].vetorTiros[j].posY + 'px';
						if(parseInt(Math.random() * 2) == 1){
							inimigos.vetorNaves[conta].vetorTiros[j].posX -= 10;
						} else {
							inimigos.vetorNaves[conta].vetorTiros[j].posX += 10;
						}
						document.getElementById(id).style.left = inimigos.vetorNaves[conta].vetorTiros[j].posX + 'px';
						break;
					case 'c':
						inimigos.vetorNaves[conta].vetorTiros[j].posY += 5;
						document.getElementById(id).style.top = inimigos.vetorNaves[conta].vetorTiros[j].posY + 'px';
						if(inimigos.vetorNaves[conta].vetorTiros[j].dir == 'e'){
							dinimigos.vetorNaves[conta].vetorTiros[j].posX -= 10;
						}else if(inimigos.vetorNaves[conta].vetorTiros[j].dir == 'd'){
							dinimigos.vetorNaves[conta].vetorTiros[j].posX = inimigos.vetorNaves[conta].vetorTiros[j].posX + 10;	
						}
						document.getElementById(id).style.left = inimigos.vetorNaves[conta].vetorTiros[j].posX + 'px';
						break;
				}
			}
		}
	}
}
function colisaoTiroPersonagem(){
	var posTiroX = 0;
	var posTiroY = 0;
	var id = null;
	var idTiro = null;
	var posNaveX = 0;
	var posNaveY = 0;
	var tam = 0;
	for(var j = 0; j < personagem.vetorTiros.length; j++){
		idTiro = personagem.vetorTiros[j].id;
		posTiroX = personagem.vetorTiros[j].posX;
		posTiroY = personagem.vetorTiros[j].posY;
		for(var cont = 0; cont < inimigos.vetorNaves.length; cont++){
			id = inimigos.vetorNaves[cont].id;
			posNaveX = inimigos.vetorNaves[cont].posX;
			posNaveY = inimigos.vetorNaves[cont].posY;
			tam = inimigos.vetorNaves[cont].dim;
			if((posTiroX >= posNaveX && posTiroX <= (posNaveX + tam)) && (posTiroY >= posNaveY && posTiroY <= (posNaveY + tam)) || (((posTiroX + 5) >= posNaveX && (posTiroX + 5) <= (posNaveX + tam)) && ((posTiroY + 10) >= posNaveY && (posTiroY + 10) <= (posNaveY + tam)))){
				inimigos.vetorNaves[cont].rest -= personagem.dano;
				personagem.vetorTiros.splice(j,1);
				document.getElementById(idTiro).remove();
				
				if(inimigos.vetorNaves[cont].rest <= 0){
					for(var i = 0; i < inimigos.vetorNaves[cont].vetorTiros.length; i++){
						document.getElementById(inimigos.vetorNaves[cont].vetorTiros[i].id).remove();
					}
					if(inimigos.vetorNaves[cont].tipo == 'e'){
					personagem.pontos += 10;
					}else if(inimigos.vetorNaves[cont].tipo == 'm'){
						personagem.pontos += 5;
					}else if(inimigos.vetorNaves[cont].tipo == 'c'){
						controleGeral.chefe = false;
						personagem.pontos += 100;
						atualizaVida(-100);
						atualizaVida(0);
					}else{
						personagem.pontos++;
					}
					inimigos.vetorNaves.splice(cont,1);
					document.getElementById(id).remove();
				}
			}
		}
	}
}
function colisaoTiroInimigo(){
	var id = null;
	posTiroX = 0;
	posTiroY = 0;
	var posNaveX = personagem.posX;
	var posNaveY = personagem.posY;
	for(var cont = 0; cont < inimigos.vetorNaves.length; cont++){
		for(var j = 0; j < inimigos.vetorNaves[cont].vetorTiros.length; j++){
			id = inimigos.vetorNaves[cont].vetorTiros[j].id;
			posTiroX = inimigos.vetorNaves[cont].vetorTiros[j].posX;
			posTiroY = inimigos.vetorNaves[cont].vetorTiros[j].posY;
			if((posTiroX >= posNaveX && posTiroX <= (posNaveX + 50)) && (posTiroY >= posNaveY && posTiroY <= (posNaveY + 50)) || (((posTiroX + 10) >= posNaveX && (posTiroX + 10) <= (posNaveX + 50)) && ((posTiroY + 10) >= posNaveY && (posTiroY + 10) <= (posNaveY + 50)))){
				atualizaVida(inimigos.vetorNaves[cont].vetorTiros[j].dano);
				inimigos.vetorNaves[cont].vetorTiros.splice(j,1);
				document.getElementById(id).remove();
			}
		}
	}
}
function atropelos(){
	var posInimigoX;
	var posInimigoY;
	var posNaveX = personagem.posX;
	var posNaveY = personagem.posY;
	for(var i = 0; i < inimigos.vetorNaves.length; i++){
		posInimigoX = inimigos.vetorNaves[i].posX;
		posInimigoY = inimigos.vetorNaves[i].posY;
		tam = inimigos.vetorNaves[i].dim;
		if(((posNaveX >= posInimigoX && posNaveX <= (posInimigoX + tam)) && (posNaveY >= posInimigoY && posNaveY <= (posInimigoY + tam))) ||  (((posNaveX + 50) >= posInimigoX && (posNaveX + 50) <= (posInimigoX + tam)) && ((posNaveY + 50) >= posInimigoY && (posNaveY + 50) <= (posInimigoY + tam)))){
			atualizaVida(10);
			inimigos.vetorNaves[i].rest -= personagem.dano;
			if(inimigos.vetorNaves[i].rest <= 0){
				for(var j = 0; j < inimigos.vetorNaves[i].vetorTiros.length; j++){
					document.getElementById(inimigos.vetorNaves[i].vetorTiros[j].id).remove();
				}
				if(inimigos.vetorNaves[i].tipo == 'e'){
					personagem.pontos += 10;
					}else if(inimigos.vetorNaves[i].tipo == 'm'){
						personagem.pontos += 5;
					}else if(inimigos.vetorNaves[i].tipo == 'c'){
						controleGeral.chefe = false;
						personagem.pontos += 100;
						atualizaVida(-100);
						atualizaVida(0);
					}else{
						personagem.pontos++;
					}
				document.getElementById(inimigos.vetorNaves[i].id).remove();
				inimigos.vetorNaves.splice(i,1);
			}
		}
	}
}
function atualizaVida(dano){
	personagem.vida -= dano;
	document.getElementById('hp').style.width = personagem.vida + 'px'; 
}
function getPontos(){
	document.getElementById('pts').innerHTML = personagem.pontos;
}
function perdeu(){
	rodada++;
	if(personagem.vida <= 0){
		clearInterval(controle.timer);
		for(var i = 0; i < inimigos.vetorNaves.length; i++){
			for(var j = 0; j < inimigos.vetorNaves[i].vetorTiros.length; j++){
				document.getElementById(inimigos.vetorNaves[i].vetorTiros[j].id).remove();
			}
			document.getElementById(inimigos.vetorNaves[i].id).remove();
		}
		for( var i = 0; i < personagem.vetorTiros.length; i++){
			document.getElementById(personagem.vetorTiros[i]).remove();
		}
		var objeto = document.createElement('div');
		objeto.setAttribute('id','fimJogo');
		objeto.setAttribute('style', 'position: absolute; top: 100px; left: 250px; width: 500px; height: 400px; background: url("./img/fim.png");background-repeat:  no-repeat; overflow: hidden; z-index: 0;');
		objeto.setAttribute('onclick','reiniar()');
		document.getElementById('tela').appendChild(objeto);
		var tr = document.createElement('tr');
		var tdNOme = document.createElement('td');
		tdNOme.setAttribute('id','tdNOme' + rodada);
		var tdPonto = document.createElement('td');
		tdPonto.innerHTML = personagem.pontos;
		var nome = document.createElement('input');
		nome.setAttribute('type','text');
		nome.setAttribute('id','textNome');
		nome.setAttribute('autofocus', 'true');
		nome.setAttribute('onchange','nomear()');
		tdNOme.appendChild(nome);
		tr.appendChild(tdNOme);
		tr.appendChild(tdPonto);
		document.getElementById('ptsTBL').appendChild(tr);
	}
}
function nomear(){
	var nome = document.getElementById('textNome').value;
	document.getElementById('textNome').remove();
	document.getElementById('tdNOme' + rodada).innerHTML = nome;
}
function reiniar(){
	nave.style.left = 450 + 'px';
	nave.style.top = 550 + 'px';
	personagem.posX = 450,
	personagem.posY = 550,
	document.getElementById('fimJogo').remove();

	controleGeral.inicio = false;
	controleGeral.principal = 30;
	controleGeral.voltas = 0;
	controleGeral.tempo = 0;
	controleGeral.chefe = false;

	controle.timer = setInterval("abertura()",FPS);
	controle.parado = false;
	
	inimigos.contador = 0;
	inimigos.vetorNaves = [];
	inimigos.Tiros = 0;
	
	personagem.vida = 100;
	personagem.contador = 0;
	personagem.vetorTiros = [];
	personagem.pontos = 0;
	personagem.dano = 1;
	atualizaVida(0);
	getPontos();

}
function animar(){
	animarFundo();
	//Animação do personagem
	switch(direcao){
		case 37:
			if (personagem.posX >= 0){
				personagem.posX -= 10;	
				nave.style.left = personagem.posX + 'px';
			}
			nave.style.backgroundPositionX = "-55px";
			break;
		case 39:
			if (personagem.posX <= (1000  - personagem.dim)){
				personagem.posX += 10;
				nave.style.left = personagem.posX + 'px';
			}
			nave.style.backgroundPositionX = "-105px";
			break;
		case 38:
			if(personagem.posY >= 0){
				personagem.posY -= 10;
				nave.style.top = personagem.posY + 'px';
			}
			break;
		case 40:
			if(personagem.posY <= 450 ){
		    	personagem.posY += 10;
				nave.style.top = personagem.posY + 'px';
		    }
			break;
	};

	//Movimentações
	movimentaTirosInimigos();
	
	movimentaTiro();

	movimentaInimigo();

	//Criações
	controleGeral.tempo++;
	if(!controleGeral.chefe){
		if(controleGeral.principal >= 60 && controleGeral.voltas <= 3){
			criaInimigo(1,'n');
			controleGeral.voltas++;
			controleGeral.principal = controleGeral.voltas >= 3 ? 0 : 60;
		}else{
			controleGeral.principal++;
			controleGeral.voltas = 0;
		}
		if(controleGeral.tempo % 180 == 0){
			criaInimigo(1,'e');
		}
		if(controleGeral.tempo % 360 == 0){
			criaInimigo(2,'m');
		}
	}
	
	if(controleGeral.tempo % 3600 == 0 && !controleGeral.chefe){
		criaInimigo(1,'c');
		controleGeral.chefe = true;
	}

	disparosInimigos();
		
	//Colisões	
	colisaoTiroPersonagem();
	
	colisaoTiroInimigo();
	
	atropelos();
	
	//Cituação do Jogo
	getPontos();

	perdeu();
}