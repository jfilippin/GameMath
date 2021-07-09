const router = require('express').Router();
const knex = require('../database');

router.get('/', (req, res) => {
    knex.select().table('pontuacao')//envia requisição para uma VIEW no banco de dados, que retorna nome e pontuação de todos os usuários cadastrados
    .then(data => {
        //ordenação por pontuação
        var lenght = data.length;
        var ranking = [];
        var index;

        for(var i = 0; i < 5; i++) {
            index = i; //reseta o índice com maior pontuação
            for(var j = i; j<lenght; j++){
                if(data[j].Points > data[index].Points) index = j; //guarda o indice do objeto com maior pontuacao
            }

            if(index != i){ //verifica se vai haver alguma troca de posição
                //realiza a troca das posições
                var tmp = data[i];
                data[i] = data[index];
                data[index] = tmp;
            }
            ranking.push(data[i]); //adiciona ao vetor de objetos que retornará ao front-end
        }
        res.send(ranking);
    });
});

module.exports = router;