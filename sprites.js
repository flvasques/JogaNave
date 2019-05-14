function Elemento(img, larg, alt){
	this.avatar = img;
	this.largura = larg;
	this.altura = alt;
	this.posX = 250;
	this.posY = 130;
	this.srcX = 0;
	this.srcY = 0;
	this.draw = function(ctx){
		ctx.drawImage(	this.avatar,	//Imagem de origem
						//Captura da imagem
						this.srcX,	//Origem da captura no eixo X
						this.srcY,	//Origem da captura no eixo Y
						this.largura,	//Largura da imagem que será capturada
						this.altura,//Altura da imagem que será capturada
						//Exibição da imagem
						this.posX,	//Posição no eixo X onde a imagem será exibida 
						this.posY,	//Posição no eixo Y onde a imagem será exibida 
						this.largura,	//Largura da imagem a ser exibida 
						this.altura	//Altura da imagem a ser exibida 
					);
	}
	this.move = function(px, py, sx, sy){
		this.posX += px;
		this.posY += py;
		this.srcX = ((this.srcX + sx) % this.avatar.width);
		this.srcY = ((this.srcY + sy) % this.avatar.height);
	}
}
function Personagem(img, larg, alt){
	this.avatar = img;
	this.largura = larg;
	this.altura = alt;
	this.posX = 450;
	this.posY = 550;
	this.srcX = 0;
	this.srcY = 0;
	this.vetorTiros = [];
	/*
		id: string,
		posX: int,
		posY: int,
	*/
	this.pontos = 0;
	this.dano = 1;
	this.vida = 100;
	this.draw = function(ctx){
		ctx.drawImage(	this.avatar,	//Imagem de origem
						//Captura da imagem
						this.srcX,	//Origem da captura no eixo X
						this.srcY,	//Origem da captura no eixo Y
						this.largura,	//Largura da imagem que será capturada
						this.altura,//Altura da imagem que será capturada
						//Exibição da imagem
						this.posX,	//Posição no eixo X onde a imagem será exibida 
						this.posY,	//Posição no eixo Y onde a imagem será exibida 
						this.largura,	//Largura da imagem a ser exibida 
						this.altura	//Altura da imagem a ser exibida 
					);
	}
	this.setVida = function(dano){
		this.vida -= dano;
	}
}

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