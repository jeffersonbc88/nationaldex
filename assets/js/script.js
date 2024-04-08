const tipoImgs = document.querySelectorAll('.grayed');
const pokemonList = document.querySelector('table');
const letraSelecionada = document.querySelectorAll('.seletor-letra');
const classeCerta = document.querySelectorAll('.filtroBtn');

let selectedImages = []; // Array para rastrear imagens selecionadas

tipoImgs.forEach(tipoImg => {
    tipoImg.addEventListener('click', () => {
        const tipoSelecionado = tipoImg.classList[1]; // Obtém a classe de tipo (por exemplo, "fogo")

        // Verifica se a imagem já está selecionada
        if (selectedImages.includes(tipoImg)) {
            // Remove a classe "colored" para voltar para a escala de cinza
            tipoImg.classList.remove('colored');
            // Remove a imagem da lista de imagens selecionadas
            selectedImages = selectedImages.filter(img => img !== tipoImg);

            // Atualiza a exibição da lista de Pokémon
            updatePokemonList();
        } else {
            // Se já houver duas imagens selecionadas, não permita selecionar uma terceira
            if (selectedImages.length === 2) {
                return;
            }
            // Adicione a classe "colored" para a imagem clicada
            tipoImg.classList.add('colored');
            // Adicione a imagem à lista de imagens selecionadas
            selectedImages.push(tipoImg);

            // Atualiza a exibição da lista de Pokémon
            updatePokemonList();
        }
    });
});

let arrayDeLetras = [];

letraSelecionada.forEach(letra => {
    letra.addEventListener('click', () => {
        if (letra.classList.contains('grayed-letra')) {
            letra.classList.remove('grayed-letra');
            arrayDeLetras.push(letra.innerHTML);
            updatePokemonList();
            return;
        }
        letra.classList.add('grayed-letra');
        arrayDeLetras = arrayDeLetras.filter(lyric => lyric !== letra.innerHTML);
        updatePokemonList();
    })
});

let arrayDeClasses = [];

classeCerta.forEach(classe => {
    classe.addEventListener('click', () => {
        if (classe.classList.contains('grayed-letra')) {
            classe.classList.remove('grayed-letra');
            arrayDeClasses.push(classe.classList[0]);
            updatePokemonList();
            return;
        } else {
            classe.classList.add('grayed-letra');
            arrayDeClasses = arrayDeClasses.filter(classeCorreta => classeCorreta !== classe.classList[0]);
            updatePokemonList();
        }
    });
});

function updatePokemonList() {
    // Obtém todos os tipos selecionados
    const tiposSelecionados = selectedImages.map(img => img.classList[1]);

    // Obtém todas as letras selecionadas
    const letrasSelecionadas = arrayDeLetras;

    // Obtém todas as classes selecionadas
    const classesSelecionadas = arrayDeClasses;

    // Oculta todas as linhas de Pokémon
    document.querySelectorAll('.lista').forEach(pokemon => {
        // Verifica se o Pokémon tem todos os tipos selecionados (se houver tipos selecionados)
        const tiposPokemon = Array.from(pokemon.classList).filter(cls => cls !== 'lista');
        const tiposSelecionadosMatch = tiposSelecionados.length === 0 || tiposSelecionados.every(tipo => tiposPokemon.includes(tipo));

        // Verifica se a letra inicial do Pokémon está na lista de letras selecionadas (se houver letras selecionadas)
        const nomePokemon = pokemon.querySelector('.pokename').textContent;
        const letraInicialPokemon = nomePokemon.charAt(0).toUpperCase(); // Assume que a primeira letra é maiúscula
        const letraInicialSelecionada = letrasSelecionadas.length === 0 || letrasSelecionadas.includes(letraInicialPokemon);

        // Verifica se o Pokémon atende a ambos os critérios (tipo e letra inicial)
        const tiposELetrasMatch = tiposSelecionadosMatch && letraInicialSelecionada;

        // Verifica se o Pokémon possui uma das classes selecionadas (se houver classes selecionadas)
        const classesPokemon = Array.from(pokemon.classList);
        const classesSelecionadasMatch = classesSelecionadas.length === 0 || classesSelecionadas.some(classe => classesPokemon.includes(classe));

        // Exibe ou oculta a linha com base na correspondência dos critérios
        if (tiposELetrasMatch && classesSelecionadasMatch) {
            pokemon.style.display = 'table-row';
        } else {
            pokemon.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const btnTopo = document.querySelector('.botao');

    // Rolar para o topo ao clicar no botão
    btnTopo.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});