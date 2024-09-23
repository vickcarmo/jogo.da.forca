// Variáveis do jogo
let palavraAtual;
let dicaAtual;
let letrasAdivinhadas = [];
const tentativasMaximas = 6;
let tentativasRestantes;
let jogoAtivo; // Indica se o jogo está em andamento

// Função para iniciar o jogo
function iniciarJogo() {
  // Escolher um índice aleatório
  const indiceAleatorio = Math.floor(Math.random() * palavras.length);
  palavraAtual = palavras[indiceAleatorio];
  dicaAtual = dicas[indiceAleatorio];
  letrasAdivinhadas = [];
  tentativasRestantes = tentativasMaximas;
  jogoAtivo = true; // Ativa o jogo
  resetarBoneco(); // Reseta o desenho do boneco
  atualizarDisplayDoJogo();
}

// Função para atualizar a exibição do jogo
function atualizarDisplayDoJogo() {
  let palavraExibida = "";
  for (let i = 0; i < palavraAtual.length; i++) {
    const letra = palavraAtual[i];
    if (letrasAdivinhadas.indexOf(letra) !== -1 || letra === " ") {
      palavraExibida += letra;
    } else {
      palavraExibida += "_";
    }
  }

  document.getElementById("palavra").textContent = palavraExibida;
  document.getElementById("dica").textContent = `Dica: ${dicaAtual}`;
  document.getElementById(
    "status"
  ).textContent = `Tentativas restantes: ${tentativasRestantes}`;
  document.getElementById(
    "attempts"
  ).textContent = `Letras já tentadas: ${letrasAdivinhadas.join(", ")}`;
}

// Função para adivinhar letra
// Função para adivinhar uma letra
function adivinharLetra() {
  if (!jogoAtivo) return; // Impede novas tentativas se o jogo acabou

  const entradaAdivinhacao = document.getElementById("guess");
  const letraAdivinhada = entradaAdivinhacao.value.toLowerCase();

  // Modifica a expressão regular para aceitar letras, números, hífen e underline
  if (
    letraAdivinhada.length === 1 &&
    /^[a-záéíóúãõç0-9_\-\s]+$/.test(letraAdivinhada) // Aceita letras, números, hífen (-) e underline (_)
  ) {
    if (letrasAdivinhadas.indexOf(letraAdivinhada) === -1) {
      letrasAdivinhadas.push(letraAdivinhada);

      let letraNaoEncontrada = true;
      for (let i = 0; i < palavraAtual.length; i++) {
        if (palavraAtual[i] === letraAdivinhada) {
          letraNaoEncontrada = false;
          break;
        }
      }

      if (letraNaoEncontrada) {
        tentativasRestantes--; // Diminui tentativas se a letra não estiver na palavra
      }

      atualizarDisplayDoJogo();
      desenharBoneco(); // Atualiza o boneco

      // Verifica se a palavra foi completamente adivinhada
      let palavraCompleta = true;
      for (let i = 0; i < palavraAtual.length; i++) {
        if (
          letrasAdivinhadas.indexOf(palavraAtual[i]) === -1 &&
          palavraAtual[i] !== " "
        ) {
          palavraCompleta = false;
          break;
        }
      }

      if (palavraCompleta) {
        document.getElementById("status").textContent = "Você venceu!";
        jogoAtivo = false; // Desativa o jogo após vitória
      } else if (tentativasRestantes <= 0) {
        document.getElementById(
          "status"
        ).textContent = `Você perdeu! A palavra era: ${palavraAtual}`;
        jogoAtivo = false; // Desativa o jogo após derrota
      }
    }
  }

  entradaAdivinhacao.value = ""; // Limpa o campo de input após a tentativa
}

document.addEventListener("DOMContentLoaded", iniciarJogo);