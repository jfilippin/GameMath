import React from 'react';
import { getToken, logout } from '../utils/auth.js';
import $ from 'jquery';

class Play extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
	        Question_Array: [],
	        Question: '',
            Alternative1: '',
            Alternative2: '',
            Alternative3: '',
            Id_answer1: '',
            Id_answer2: '',
            Id_answer3: '',
            User_answers: [],
            i: 0
        }

        
        this.handleChange = this.handleChange.bind(this);
        this.getQuestions = this.getQuestions.bind(this);

        this.nextQuestion = this.nextQuestion.bind(this);
        this.incrementI = this.incrementI.bind(this);
        
    }

    //executa o método getQuestions ao carregar a página
    componentDidMount(){
        window.addEventListener('load', this.getQuestions);
    }

    //salva a alternativa selecionada pelo usuário no array User_answers do state
    handleChange(e){
        var answers_aux = [];
        answers_aux = this.state.User_answers;
        var j = this.state.i;

        answers_aux[j] = e.target.id
        this.setState({
            User_answers: answers_aux
        });  
    }

    //busca todas as questões e alternativas assim que a página carrega
    getQuestions(e){
        e.preventDefault();
        
        const token = getToken();
        const getQuestionData = {
            method: 'get',
			headers: {
				'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
			}
        }

        fetch('http://ec2-18-233-156-100.compute-1.amazonaws.com:3000/play', getQuestionData)
        .then(res => {
          if(!res.ok && res === 401){
              logout();
          } else {
             return res.json();
          }
        })
        .then(data => {
          if(data.err){
            alert(data.err);
          } else {
	        var question = data;

            this.setState({
                Question_Array: data,
                Question: question[0].Question,
                Alternative1: question[0].Alternative1,
                Alternative2: question[0].Alternative2,
                Alternative3: question[0].Alternative3,
                Id_answer1: question[0].Id_answer1,
                Id_answer2: question[0].Id_answer2,
                Id_answer3: question[0].Id_answer3
            });
            }
        }).catch(err => alert(err));
    }

    //incrementa o i dentro do state
    async incrementI(){ 
        if(this.state.i === 9){
            console.log("Respostas: " + JSON.stringify(this.state.User_answers));
            return 1;
        } else {
            this.setState({
                i: this.state.i+1
            });

            //limpa a alternativa selecionada
            $("#continue").click(function() {
                $('input[type=radio]').prop('checked', false);
            });
            return 0;
        }
    }

    //chama a próxima questão dentro do Question_Array
    nextQuestion(e){
        e.preventDefault();

        this.incrementI().then((full) => {
            if(full === 0){
                this.setState({
                    Question: this.state.Question_Array[this.state.i].Question,
                    Alternative1: this.state.Question_Array[this.state.i].Alternative1,
                    Alternative2: this.state.Question_Array[this.state.i].Alternative2,
                    Alternative3: this.state.Question_Array[this.state.i].Alternative3,
                    Id_answer1: this.state.Question_Array[this.state.i].Id_answer1,
                    Id_answer2: this.state.Question_Array[this.state.i].Id_answer2,
                    Id_answer3: this.state.Question_Array[this.state.i].Id_answer3
                });
            } else {
                const token = getToken();

                const options = {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(this.state.User_answers)
                }

                fetch('http://ec2-18-233-156-100.compute-1.amazonaws.com:3000/play', options)
                .then(res => {
                    if(!res.ok && res === 401){
                        logout();
                    } else {
                        return res.json();
                    }
                })
                .then(data => {
                    if(data.err){
                        alert(data.err);
                    } else {
                        console.log("Cheguei aqui");

                        alert("Parabens, sua pontuação foi: " + data.numCorrectAnswers);
                        window.location.href="/ranking";
                    }
                }).catch(err => alert(err));
                    }
                });
    }

    render() {
        return(
            <>
                <h1 className="title">Questão numero {this.state.i+1}</h1>
                <div className="form">
                    <table className="questionTable">
                        <thead className="questionDescription">
                        <tr>
                            <td>
                                <h4 value={this.state.Question}>
                                    {this.state.Question}
                                </h4>
                            </td>
                        </tr>
                        </thead>
                        <tbody className="questionAlternatives">
                        <tr>
                            <td>
                                <input className="form-check-input" onChange={this.handleChange} name="alt" type="radio" id={this.state.Id_answer1} value={this.state.Alternative1} required/>
                                    {this.state.Alternative1}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input className="form-check-input" onChange={this.handleChange} name="alt" type="radio" id={this.state.Id_answer2} value={this.state.Alternative2} required/>
                                    {this.state.Alternative2}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input className="form-check-input" onChange={this.handleChange} name="alt" type="radio" id={this.state.Id_answer3} value={this.state.Alternative3} required/>
                                    {this.state.Alternative3}
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <button type="submit" id="continue" className="btn btn-primary" onClick={this.nextQuestion}>Avançar</button>
                </div>
            </>
        );
    }
} export default Play