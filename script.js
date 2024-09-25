const CELULAS = document.querySelectorAll('#tabuleiro td')

let jogadorAtual = 'X';
let jogoAtivo = true;
let estadoJogo = ["", "", "", "", "", "", "", "", ""];

const combinacoesVencedoras = [
    [0, 1, 2], // Linhas
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Colunas
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonais
    [2, 4, 6]
];

function celulaClicada(event){
    const celula = event.target;
    const posicao = parseInt(celula.getAttribute('data-pos'));

    if (estadoJogo[posicao] !== "" || !jogoAtivo){
        return;
    }

    estadoJogo[posicao] = jogadorAtual;
    celula.textContent = jogadorAtual;
}

CELULAS.forEach(celula => celula.addEventListener('click', celulaClicada));
