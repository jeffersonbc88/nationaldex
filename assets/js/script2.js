// Crie um novo objeto XMLHttpRequest
var xhr = new XMLHttpRequest();

// Configure a função de callback para tratar a resposta
xhr.onreadystatechange = function() {
     if (xhr.readyState === 4) { // 4 indica que a operação foi concluída
        if (xhr.status === 200) { // Código 200 indica uma resposta bem-sucedida
            // Parse do JSON e use os dados como necessário
            var jsonData = JSON.parse(xhr.responseText);
            carregaDados(jsonData);
        } else {
            console.error('Falha na requisição. Código de status:', xhr.status);
        }
    }
};

// Abra a conexão e especifique o método e o caminho do arquivo local
xhr.open('GET', 'assets/json/list.json', true);

// Envie a solicitação
xhr.send();

function carregaDados(poke) {
    const tabela = document.querySelector('.tabela');

    for (let pokemon of poke) {
        const linha = document.createElement('tr');
        const tipoUm = pokemon.Type1
        const tipoDois = pokemon.Type2
        const classif1 = pokemon.Classific1;
        const classif2 = pokemon.Classific2;
        const classif3 = pokemon.Classific3;
        linha.classList.add("lista");
        linha.classList.add(tipoUm.toLowerCase() + "type");
        if (classif1) linha.classList.add(classif1.toLowerCase());
        if (classif2) linha.classList.add(classif2.toLowerCase());
        if (classif3) linha.classList.add(classif3.toLowerCase());
        if (tipoDois) linha.classList.add(tipoDois.toLowerCase() + "type");

        let td1 = document.createElement('td');
        td1.classList.add('poke');
        td1.innerHTML = pokemon.No;
        linha.appendChild(td1);

        let td2 = document.createElement('td');
        let img1 = document.createElement('img');
        img1.setAttribute('src', 'assets/img/regular/' + pokemon.RegSprite);
        td2.classList.add('poke');
        td2.appendChild(img1);
        linha.appendChild(td2);

        let td3 = document.createElement('td');
        let img2 = document.createElement('img');
        img2.setAttribute('src', 'assets/img/shiny/' + pokemon.ShnSprite);
        td3.classList.add('poke');
        td3.appendChild(img2);
        linha.appendChild(td3);

        let td4 = document.createElement('td');
        td4.classList.add('poke');
        td4.classList.add('pokename');
        td4.innerHTML = pokemon.Name;
        linha.appendChild(td4);

        let td5 = document.createElement('td');
        td5.classList.add('type');
        const type1 = pokemon.Type1;
        let img3 = document.createElement('img');
        img3.setAttribute('src', 'assets/img/type/' + type1 + '.png');
        img3.setAttribute('title', type1);
        td5.appendChild(img3);
        const type2 = pokemon.Type2;
        if (type2) {
            const espaco = document.createTextNode(' ');
            let img4 = document.createElement('img');
            img4.setAttribute('src', 'assets/img/type/' + type2 + '.png');
            img4.setAttribute('title', type2);
            td5.appendChild(espaco);
            td5.appendChild(img4);
        }
        linha.appendChild(td5);

        let td6 = document.createElement('td');
        td6.classList.add('poke');
        const ability1 = pokemon.Ability1;
        const ability2 = pokemon.Ability2;
        const ability3 = pokemon.Ability3;
        if (ability3) {
            td6.innerHTML = ability1 + "<br>" + ability2 + "<br>" + ability3;
        } else if (ability2) {
            td6.innerHTML = ability1 + "<br>" + ability2;
        } else {
            td6.innerHTML = ability1;
        }
        linha.appendChild(td6);

        let td7 = document.createElement('td');
        td7.classList.add('poke');
        td7.innerHTML = pokemon.HP;
        linha.appendChild(td7);

        let td8 = document.createElement('td');
        td8.classList.add('poke');
        td8.innerHTML = pokemon.Att;
        linha.appendChild(td8);

        let td9 = document.createElement('td');
        td9.classList.add('poke');
        td9.innerHTML = pokemon.Def;
        linha.appendChild(td9);

        let td10 = document.createElement('td');
        td10.classList.add('poke');
        td10.innerHTML = pokemon.SpAtk;
        linha.appendChild(td10);

        let td11 = document.createElement('td');
        td11.classList.add('poke');
        td11.innerHTML = pokemon.SpDef;
        linha.appendChild(td11);

        let td12 = document.createElement('td');
        td12.classList.add('poke');
        td12.innerHTML = pokemon.Spd;
        linha.appendChild(td12);

        tabela.appendChild(linha);
    }
}