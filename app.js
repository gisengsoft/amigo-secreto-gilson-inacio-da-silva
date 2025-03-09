// Aplicativo Amigo Secreto
// Desenvolvido por Gilson Inacio da Silva
// Sergipe, Brasil - Março de 2025
// Todos os direitos reservados

// Variável para armazenar a lista de amigos
let listaDeAmigos = [];
let resultadoSorteio = [];
let indiceAtual = 0;

// Carregar dados do localStorage ao iniciar
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar informações de versão e créditos ao console
    console.log("Amigo Secreto v1.0");
    console.log("Desenvolvido por Gilson Inacio da Silva");
    console.log("© 2025 - Todos os direitos reservados");
    
    // Carregar lista de amigos do localStorage
    const amigosArmazenados = localStorage.getItem('amigosSecretos');
    if (amigosArmazenados) {
        listaDeAmigos = JSON.parse(amigosArmazenados);
        atualizarListaAmigos();
    }
    
    // Adicionar evento de tecla Enter para o campo de entrada
    const inputAmigo = document.getElementById('amigo');
    inputAmigo.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            adicionarAmigo();
        }
    });
    
    // Adicionar evento de clique para o botão adicionar
    const btnAdicionar = document.querySelector('.button-add');
    btnAdicionar.addEventListener('click', adicionarAmigo);
    
    // Adicionar evento de clique para o botão sortear
    const btnSortear = document.querySelector('.button-draw');
    btnSortear.addEventListener('click', sortearAmigo);
    
    // Eventos para o modo privado
    document.getElementById('ver-amigo').addEventListener('click', revelarAmigoSecreto);
    document.getElementById('proximo').addEventListener('click', proximaPessoa);
    document.querySelector('.card-sorteio').addEventListener('click', function() {
        this.classList.toggle('card-flipped');
    });
});

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const listaAmigosElement = document.getElementById('listaAmigos');
    
    const nome = inputAmigo.value.trim();
    
    if (nome === '') {
        alert('Por favor, digite um nome válido!');
        return;
    }
    
    // Verificar se o nome já existe na lista
    if (listaDeAmigos.includes(nome)) {
        alert('Este nome já foi adicionado!');
        return;
    }
    
    // Adicionar à lista de amigos
    listaDeAmigos.push(nome);
    
    // Salvar no localStorage
    salvarNoLocalStorage();
    
    // Criar novo item da lista com animação
    const li = document.createElement('li');
    li.textContent = nome;
    li.className = 'animate__animated animate__fadeInDown';
    
    // Adicionar botão para remover
    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'X';
    btnRemover.className = 'btn-remover';
    btnRemover.onclick = function() {
        // Adicionar animação de saída
        li.className = 'animate__animated animate__fadeOutRight';
        li.addEventListener('animationend', function() {
            removerAmigo(listaDeAmigos.indexOf(nome));
        });
    };
    
    li.appendChild(btnRemover);
    listaAmigosElement.appendChild(li);
    
    // Limpar o campo de entrada
    inputAmigo.value = '';
    inputAmigo.focus();
}

// Função para atualizar a lista de amigos na interface
function atualizarListaAmigos() {
    const listaAmigosElement = document.getElementById('listaAmigos');
    listaAmigosElement.innerHTML = '';
    
    listaDeAmigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        
        // Adicionar botão para remover
        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'X';
        btnRemover.className = 'btn-remover';
        btnRemover.onclick = function() {
            // Adicionar animação de saída
            li.className = 'animate__animated animate__fadeOutRight';
            li.addEventListener('animationend', function() {
                removerAmigo(index);
            });
        };
        
        li.appendChild(btnRemover);
        listaAmigosElement.appendChild(li);
    });
}

// Função para remover um amigo da lista
function removerAmigo(index) {
    listaDeAmigos.splice(index, 1);
    salvarNoLocalStorage();
    atualizarListaAmigos();
}

// Função para salvar no localStorage
function salvarNoLocalStorage() {
    localStorage.setItem('amigosSecretos', JSON.stringify(listaDeAmigos));
}

// Função para sortear os amigos
function sortearAmigo() {
    const resultado = document.getElementById('resultado');
    const sorteioPrivado = document.getElementById('sorteio-privado');
    const modoPrivado = document.getElementById('modo-privado').checked;
    
    // Verificar se há amigos suficientes
    if (listaDeAmigos.length < 3) {
        alert('Adicione pelo menos 3 amigos para realizar o sorteio!');
        return;
    }
    
    // Animação de sorteio
    const btnSortear = document.querySelector('.button-draw');
    btnSortear.disabled = true;
    btnSortear.textContent = 'Sorteando...';
    
    // Simular animação de sorteio
    let contador = 0;
    const intervalo = setInterval(() => {
        resultado.innerHTML = `<h3 class="animacao-sorteio">Sorteando${'.'.repeat(contador % 4)}</h3>`;
        contador++;
        
        if (contador > 10) {
            clearInterval(intervalo);
            finalizarSorteio(modoPrivado, resultado, sorteioPrivado);
        }
    }, 200);
}

// Função para finalizar o sorteio após a animação
function finalizarSorteio(modoPrivado, resultado, sorteioPrivado) {
    // Embaralhar a lista de amigos (algoritmo Fisher-Yates)
    const amigosEmbaralhados = [...listaDeAmigos];
    for (let i = amigosEmbaralhados.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [amigosEmbaralhados[i], amigosEmbaralhados[j]] = [amigosEmbaralhados[j], amigosEmbaralhados[i]];
    }
    
    // Criar os pares de amigo secreto
    resultadoSorteio = [];
    for (let i = 0; i < listaDeAmigos.length; i++) {
        let j = (i + 1) % listaDeAmigos.length;  // Cada pessoa tira a próxima da lista, o último tira o primeiro
        resultadoSorteio.push({
            pessoa: listaDeAmigos[i],
            amigo: listaDeAmigos[j]
        });
    }
    
    // Habilitar o botão de sortear novamente
    const btnSortear = document.querySelector('.button-draw');
    btnSortear.disabled = false;
    btnSortear.textContent = 'Sortear amigo';
    
    // Mostrar resultados de acordo com o modo selecionado
    if (modoPrivado) {
        resultado.innerHTML = '<h3>Sorteio realizado com sucesso!</h3><p>Use o modo privado abaixo para ver quem tirou quem.</p>';
        sorteioPrivado.style.display = 'block';
        document.querySelector('.card-sorteio').classList.remove('card-flipped');
        document.getElementById('pessoa-atual').value = '';
        indiceAtual = 0;
    } else {
        // Modo público - mostrar todos os resultados
        let html = '<h3>Resultado do Sorteio</h3><ul class="result-list">';
        resultadoSorteio.forEach(par => {
            html += `<li>${par.pessoa} → ${par.amigo}</li>`;
        });
        html += '</ul>';
        
        // Adicionar botões para ações adicionais
        html += '<button class="btn-imprimir">Imprimir Resultado</button>';
        html += '<button class="btn-compartilhar">Compartilhar</button>';
        
        resultado.innerHTML = html;
        sorteioPrivado.style.display = 'none';
        
        // Adicionar eventos para os novos botões
        setTimeout(() => {
            const btnImprimir = document.querySelector('.btn-imprimir');
            if (btnImprimir) {
                btnImprimir.addEventListener('click', imprimirResultado);
            }
            
            const btnCompartilhar = document.querySelector('.btn-compartilhar');
            if (btnCompartilhar) {
                btnCompartilhar.addEventListener('click', compartilharResultado);
            }
        }, 0);
    }
}

// Função para revelar o amigo secreto no modo privado
function revelarAmigoSecreto() {
    const pessoaAtual = document.getElementById('pessoa-atual').value.trim();
    const nomeSorteado = document.getElementById('nome-sorteado');
    const cardSorteio = document.querySelector('.card-sorteio');
    
    if (pessoaAtual === '') {
        alert('Digite seu nome para ver quem você tirou!');
        return;
    }
    
    // Verificar se a pessoa está na lista
    const parSorteio = resultadoSorteio.find(par => par.pessoa.toLowerCase() === pessoaAtual.toLowerCase());
    
    if (parSorteio) {
        nomeSorteado.textContent = parSorteio.amigo;
        cardSorteio.classList.remove('card-flipped');
        // Adicionar pequeno delay para animação
        setTimeout(() => {
            cardSorteio.classList.add('card-flipped');
        }, 100);
    } else {
        alert('Seu nome não está na lista de participantes!');
    }
}

// Função para ir para a próxima pessoa
function proximaPessoa() {
    document.getElementById('pessoa-atual').value = '';
    document.querySelector('.card-sorteio').classList.remove('card-flipped');
}

// Função para imprimir o resultado
function imprimirResultado() {
    const conteudo = document.getElementById('resultado').innerHTML;
    const janelaImpressao = window.open('', '', 'height=600,width=800');
    
    janelaImpressao.document.write('<html><head><title>Resultado do Amigo Secreto</title>');
    janelaImpressao.document.write('<style>body { font-family: Arial; padding: 20px; } h3 { color: #4169E1; } li { margin-bottom: 10px; }</style>');
    janelaImpressao.document.write('</head><body>');
    janelaImpressao.document.write('<h2>Resultado do Sorteio de Amigo Secreto</h2>');
    janelaImpressao.document.write('<p><small>Desenvolvido por Gilson Inacio da Silva - Sergipe, Brasil</small></p>');
    
    // Extrair apenas a lista sem os botões
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = conteudo;
    const listaSemBotoes = tempDiv.querySelector('ul').outerHTML;
    
    janelaImpressao.document.write(listaSemBotoes);
    janelaImpressao.document.write('<footer><p><small>&copy; 2025 Gilson Inacio da Silva - Todos os direitos reservados</small></p></footer>');
    janelaImpressao.document.write('</body></html>');
    
    janelaImpressao.document.close();
    janelaImpressao.focus();
    
    // Imprimir após carregar todo o conteúdo
    setTimeout(() => {
        janelaImpressao.print();
        janelaImpressao.close();
    }, 250);
}

// Função para compartilhar o resultado
function compartilharResultado() {
    // Verificar se a API de compartilhamento está disponível
    if (navigator.share) {
        navigator.share({
            title: 'Resultado do Amigo Secreto',
            text: 'Confira o resultado do nosso sorteio de amigo secreto! Desenvolvido por Gilson Inacio da Silva',
            url: window.location.href
        })
        .catch(error => {
            console.log('Erro ao compartilhar:', error);
        });
    } else {
        // Fallback para copiar link
        const tempInput = document.createElement('input');
        tempInput.value = window.location.href;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('Link copiado para a área de transferência. Você pode compartilhar com seus amigos!');
    }
}