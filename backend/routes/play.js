const router = require('express').Router();
const knex = require("../database");

var numbers = [];

//get
var numberOfQuestions = 10; //quantas perguntas terão em uma partida
var response = []; //resposta para o front-end com as perguntas
var questions, alternatives;

//post
var frontReq = []; //recebe o corpo da requisição vinda do front-end
var toInsert = []; //variável que será montada para inserção no banco de dados

    router.get('/', (req, res) => {
        randomizeQuestions();
        
        play().then(() => {
            buildResponse().then(() => {
                res.send(response);
            });
        });
    });


    router.post('/', (req, res) => {
       const jwt = require('jsonwebtoken');
       let token = req.headers['authorization'];
        token = token.split(' ').pop();
        var decoded = jwt.decode(token, process.env.TOKEN_SECRET, true); //Captura a informação recebida do token vindo do front-end

        frontReq = req.body;

        for(var i = 0; i < frontReq.length; i++) { //recebe no vetor numbers os IDs das respostas dadas pelo jogador
            numbers[i] = frontReq[i];
        }
        
        knex.select('Id_questions','Correct as IsCorrect').from('Answers')
        .whereIn('Id_answers', numbers).then(data => {
            for(var i = 0; i < frontReq.length; i++){ //monta o objeto toInsert que será usado para a inserção da partida jogada no banco de dados
                toInsert[i] = {
                    IsCorrect: data[i].IsCorrect,
                    Id_questions: data[i].Id_questions,
                    Id_users: decoded.Id_users
                };
            }
        }).then(()=>{
            var numCorrectAnswers = 0;
            for(var i = 0; i < 10; i++){ //conta o número de respostas corretas para devolver ao front-end e exibir na tela de finalização de partida
                if (toInsert[i].IsCorrect == 1) numCorrectAnswers++;
            }
            var data = {
                 numCorrectAnswers: numCorrectAnswers
            }
           knex('Answer').insert(toInsert) //insere no banco de dados
           .then(()=>{
               res.status(200).json(data); //devolve o número de respostas corretas
           })
           .catch(err => {
                res.status(400).send(err);
           })
        });
    });

    async function play(){
        questions = await getQuestions();
        alternatives = await getAlternatives();
    } 

    async function getQuestions(){
        return await knex.select('Contents as Question').from('Questions')
        .whereIn('Id_questions', numbers);
    }

    async function getAlternatives(){
        return await knex.select('Id_answers','Contents as Alternative').from('Answers')
        .whereIn('Id_questions', numbers);
    }

    async function buildResponse(){
        for(var i = 0; i < numberOfQuestions; i++){
            response[i] = {
                Question: questions[i].Question,
                Id_answer1: alternatives[(3*i)].Id_answers, //utiliza os múltiplos de 3 para definir as posições corretas, já que cada pergunta possui 3 possíveis respostas.
                Id_answer2: alternatives[(3*i)+1].Id_answers,
                Id_answer3: alternatives[(3*i)+2].Id_answers,                
                Alternative1: alternatives[(3*i)].Alternative,
                Alternative2: alternatives[(3*i)+1].Alternative,
                Alternative3: alternatives[(3*i)+2].Alternative
            }
        }
    }

    function randomizeQuestions(){ //função para randomizar as questões selecionadas no banco de dados
        var max = 20;
        var min = 1;

        for(var i = 0;i<numberOfQuestions; i++){
            var temp = Math.floor(Math.random() * max) + min; //Math.random() retorna um número no intervalo [0, 1)
            if(numbers.indexOf(temp) == -1){
                numbers[i] = temp;
            } else i--;
        }
    }

module.exports = router;