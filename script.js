// Classe Carro (Base)
class Carro {
  constructor(modelo, cor) {
      this.modelo = modelo;
      this.cor = cor;
      this.velocidade = 0;
      this.ligado = false;
  }

  ligar() {
      if (!this.ligado) {
          this.ligado = true;
          this.atualizarStatus();
          console.log(`${this.modelo} ligado!`);

          // Tocar o som do carro ligando
          const somLigar = document.getElementById("som-ligar");
          if (somLigar) { // Verifique se o elemento existe
              somLigar.play();
          }

      } else {
          console.log(`${this.modelo} já está ligado!`);
      }
  }

  desligar() {
      if (this.ligado) {
          this.ligado = false;
          this.velocidade = 0;
          this.atualizarStatus();
          this.atualizarVelocidadeNaTela();
          console.log(`${this.modelo} desligado!`);
      } else {
          console.log(`${this.modelo} já está desligado!`);
      }
  }

  acelerar() {
      if (this.ligado) {
          this.velocidade += 10;
          this.atualizarVelocidadeNaTela();
          console.log(`Acelerando ${this.modelo}! Velocidade: ${this.velocidade}`);
      } else {
          console.log(`O ${this.modelo} precisa estar ligado para acelerar!`);
      }
  }

  frear() {
      if (this.ligado) {
          this.velocidade -= 10;
          if (this.velocidade < 0) {
              this.velocidade = 0;
          }
          this.atualizarVelocidadeNaTela();
          console.log(`Freando ${this.modelo}! Velocidade: ${this.velocidade}`);
      } else {
          console.log(`O ${this.modelo} precisa estar ligado para frear!`);
      }
  }


  atualizarVelocidadeNaTela() {
      // Este método precisa ser sobrescrito nas classes filhas
  }

  atualizarStatus() {
      // Este método precisa ser sobrescrito nas classes filhas
  }
}

// Classe CarroEsportivo (Herança de Carro)
class CarroEsportivo extends Carro {
  constructor(modelo, cor) {
      super(modelo, cor);
      this.turboAtivado = false;
      this.statusElement = document.getElementById("status-esportivo");
      this.velocidadeElement = document.getElementById("velocidade-esportivo");

  }

  ativarTurbo() {
      if (this.ligado) {
          this.turboAtivado = true;
          this.acelerar(); // Turbo dá um boost extra de velocidade
          this.acelerar();
          console.log(`Turbo ativado no ${this.modelo}!`);
      } else {
          console.log(`Ligue o ${this.modelo} para ativar o turbo.`);
      }
  }
  atualizarVelocidadeNaTela() {
      this.velocidadeElement.textContent = `Velocidade: ${this.velocidade} km/h`;
  }

  atualizarStatus() {
      this.statusElement.textContent = this.ligado ? "Ligado" : "Desligado";
  }
}

// Classe Caminhao (Herança de Carro)
class Caminhao extends Carro {
  constructor(modelo, cor, capacidadeCarga) {
      super(modelo, cor);
      this.capacidadeCarga = capacidadeCarga;
      this.cargaAtual = 0;
      this.statusElement = document.getElementById("status-caminhao");
      this.velocidadeElement = document.getElementById("velocidade-caminhao");
  }

  carregar(peso) {
      if (this.ligado) {
          if (this.cargaAtual + peso <= this.capacidadeCarga) {
              this.cargaAtual += peso;
              console.log(`Caminhão ${this.modelo} carregado com ${peso} kg. Carga atual: ${this.cargaAtual} kg.`);
          } else {
              console.log(`Caminhão ${this.modelo} excedeu a capacidade de carga. Carga máxima: ${this.capacidadeCarga} kg.`);
          }
      } else {
          console.log(`Ligue o ${this.modelo} para carregar.`);
      }
  }
  atualizarVelocidadeNaTela() {
      this.velocidadeElement.textContent = `Velocidade: ${this.velocidade} km/h`;
  }

  atualizarStatus() {
      this.statusElement.textContent = this.ligado ? "Ligado" : "Desligado";
  }
}

// Criando objetos
const meuCarro = new Carro("Pagani Zonda R", "Preto");
const ferrari = new CarroEsportivo("Ferrari", "Vermelha");
const scania = new Caminhao("Scania", "Azul", 10000);


//Funções para o carro base
const ligarBotao = document.getElementById("ligar");
const desligarBotao = document.getElementById("desligar");
const acelerarBotao = document.getElementById("acelerar");

ligarBotao.addEventListener("click", () => meuCarro.ligar());
desligarBotao.addEventListener("click", () => meuCarro.desligar());
acelerarBotao.addEventListener("click", () => meuCarro.acelerar());

// Funções para o Carro Esportivo
const ligarEsportivoBotao = document.getElementById("ligar-esportivo");
const desligarEsportivoBotao = document.getElementById("desligar-esportivo");
const acelerarEsportivoBotao = document.getElementById("acelerar-esportivo");
const turboEsportivoBotao = document.getElementById("turbo-esportivo");

ligarEsportivoBotao.addEventListener("click", () => ferrari.ligar());
desligarEsportivoBotao.addEventListener("click", () => ferrari.desligar());
acelerarEsportivoBotao.addEventListener("click", () => ferrari.acelerar());
turboEsportivoBotao.addEventListener("click", () => ferrari.ativarTurbo());

// Funções para o Caminhão
const ligarCaminhaoBotao = document.getElementById("ligar-caminhao");
const desligarCaminhaoBotao = document.getElementById("desligar-caminhao");
const acelerarCaminhaoBotao = document.getElementById("acelerar-caminhao");
const carregarCaminhaoBotao = document.getElementById("carregar-caminhao");
const cargaInput = document.getElementById("carga");

ligarCaminhaoBotao.addEventListener("click", () => scania.ligar());
desligarCaminhaoBotao.addEventListener("click", () => scania.desligar());
acelerarCaminhaoBotao.addEventListener("click", () => scania.acelerar());
carregarCaminhaoBotao.addEventListener("click", () => {
  const peso = parseInt(cargaInput.value);
  scania.carregar(peso);
});