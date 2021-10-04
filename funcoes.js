const cachorros = require('./database/cachorros.json');
const fs = require('fs');

module.exports = {
    listar: function(){
        console.table(cachorros);
    },
    descrever: function(pos){

        if(pos >= cachorros.length || pos < 0){
            console.error("Cachorro inexistente!");
            return;
        }

        let c = cachorros[pos];
        console.log(`Nome: ${c.nome}`);
        console.log(`Data De Nascimento: ${c.dataDeNascimento}`);
        console.log (`Peso: ${c.peso}`);

        if(c.castrado){
            console.log("Castrado: sim")
        }else{
            console.log("Castrado: não")
        }

        console.log(`Sexo: ${c.sexo}`);
        
        console.log("Vacinas:")
        console.table(c.vacinas);
        
        console.log("Serviços:")
        console.table(c.servicos);

    },
    adicionar: function($nome, $sexo, $castrado, $dataDeNascimento, $peso){
        // Criar objeto cachorro
        let dog = {
            nome: $nome,
            sexo: $sexo,
            castrado: $castrado,
            dataDeNascimento: $dataDeNascimento,
            peso: $peso,
            vacinas: [],
            servicos: []
        }
        
        // Adicionar o cachorro criado a array de cachorros
        cachorros.push(dog);

        // Gravar array de cachorros no arquivo cachorros.json
        fs.writeFileSync('./database/cachorros.json', JSON.stringify(cachorros));
    },
    vacinar: function(pos, nomeDaVacina){

        // Verificar se existe um cachorro na posição passada.
        if(pos >= cachorros.length || pos < 0){
            console.log("Cachorro inexistente");
            return;
        }

        // Criar um objeto literal com as informações da vacina
        let novaVacina = {
            nome: nomeDaVacina,
            data: (new Date()).toISOString().substr(0,10)
        }

        // Adicionar esse Objeto literal ao array de vacinas do cachorro
        cachorros[pos].vacinas.push(novaVacina);

        // Salvar o array de cachorros no arquivo
        fs.writeFileSync('./database/cachorros.json', JSON.stringify(cachorros,null,4));
    }


}
