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

    verificarResultado();
}

function verificarResultado(){
    let jogoGanho = false;

    for (let combinacao of combinacoesVencedoras){
        const [a, b, c] = combinacao;

        if(estadoJogo[a] && estadoJogo[a] === estadoJogo[b] && estadoJogo[a] === estadoJogo[c]){
            jogoGanho = true;
            
            combinacaoVencedora = combinacao;

            animarVitoria(combinacaoVencedora);

            console.log(combinacaoVencedora);

            break;
        }
    }

    if(jogoGanho){
        jogoAtivo = false;
        pararHover();
        setTimeout(reiniciarJogo, 2000);
    }

    if(!estadoJogo.includes("")){ //Empate
        jogoAtivo = false;
        pararHover();
        setTimeout(reiniciarJogo, 2000);
    }

    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
    atualizarHover();
}

function reiniciarJogo(){
    jogadorAtual = 'X';
    jogoAtivo = true;
    estadoJogo = ["", "", "", "", "", "", "", "", ""];
    CELULAS.forEach(celula => {
        celula.textContent = ""
        celula.classList.remove('acenderX', 'acenderY', 'piscar', 'vencedor', 'x', 'o');
    });
    atualizarHover();
}

function atualizarHover() {
    CELULAS.forEach(celula => {
        if (celula.textContent === '') {
            // Remove as classes anteriores
            celula.classList.remove('x', 'o');
            // Adiciona a classe correspondente ao jogador atual
            celula.classList.add(jogadorAtual.toLowerCase());
        } else {
            // Remove qualquer classe de hover de células já preenchidas
            celula.classList.remove('x', 'o');
        }
    });
}

function pararHover(){
    CELULAS.forEach(celula =>{
        if(celula.textContent === ''){
            celula.innerHTML = '&nbsp;';
        }
    })
}

function animarVitoria(combinacaoVencedora){
    combinacaoVencedora.forEach((indice, i) =>{
        setTimeout(() => {
            if(CELULAS[indice].textContent === 'X'){
                CELULAS[indice].classList.add('acenderX');
            }else{
                CELULAS[indice].classList.add('acenderY');
            } 
        }, i*100);
    });

    setTimeout(() => {
        piscarTela(combinacaoVencedora);
    }, combinacaoVencedora.length * 200);
}

function piscarTela(combinacaoVencedora){
    combinacaoVencedora.forEach(indice => {
        CELULAS[indice].classList.add('piscar');
    });
}

CELULAS.forEach(celula => celula.addEventListener('click', celulaClicada));
atualizarHover();
