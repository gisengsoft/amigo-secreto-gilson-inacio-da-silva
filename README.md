# Amigo Secreto

Um aplicativo web simples para realizar sorteios de amigo secreto entre amigos e familiares.

## Funcionalidades

- Adicionar e remover participantes da lista
- Salvar a lista de participantes no navegador
- Realizar o sorteio de forma aleatória
- Dois modos de visualização:
  - Modo público: exibe todos os resultados de uma vez
  - Modo privado: cada participante vê apenas seu próprio resultado
- Opções para imprimir e compartilhar o resultado

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- LocalStorage para persistência de dados

## Como executar

1. Faça o download ou clone este repositório
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. O aplicativo será executado diretamente, sem necessidade de instalação

## Como usar

1. Adicione os nomes dos participantes no campo "Digite um nome"
2. Selecione o modo de sorteio (público ou privado)
3. Clique no botão "Sortear amigo" para realizar o sorteio
4. No modo privado, cada participante digita seu nome para ver quem tirou
5. Os dados são salvos no navegador, então você pode fechar e reabrir a página

## Estrutura do projeto

```
amigo-secreto/
│
├── index.html          # Página principal
├── style.css           # Estilos da aplicação
├── app.js              # Lógica de funcionamento
└── assets/             # Imagens e recursos
    ├── amigo-secreto.png
    └── play_circle_outline.png
```

## Compatibilidade

O aplicativo funciona em todos os navegadores modernos (Chrome, Firefox, Safari, Edge).

## Observações

- Todos os dados são armazenados localmente no seu navegador (localStorage)
- Não é necessária conexão com internet após o carregamento inicial da página

## Demonstração em Imagem/Vídeo

[Veja a demo printscreen do app Amigo Secreto](https://ibb.co/4wz163Tp)

[Veja a demo vídeo do app Amigo Secreto](https://youtu.be/OAF2qWaNtE8)

