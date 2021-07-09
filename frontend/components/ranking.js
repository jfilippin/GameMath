import React from 'react';
import { getToken, logout } from '../utils/auth';
import $ from 'jQuery';

class Ranking extends React.Component {
    constructor(props) {
        super(props);

        this.cols = {
            name: '',
            points: ''
        }

	this.getTable = this.getTable.bind(this);
    }
 
    //executa o método getTable quando a página é carregada
    componentDidMount(){
        window.addEventListener('load', this.getTable);
    }

    //pega os dados do backend e monta a tabela dinamicamente
	getTable() {
	   const token = getToken();
	   const options = {
		   method: 'get',
		   headers: {
			   'Content-Type': 'application/json',
			   'Authorization': `Bearer ${token}`
		   }
	   }   
		
	   fetch('http://ec2-18-233-156-100.compute-1.amazonaws.com:3000/ranking', options)
		.then(res => {
			if(!res.ok && res.statusCode === 401) {
				logout();
			} else {
				return res.json();
			}
		})
		.then(data => {
			  for(var i = 0; i < 5; i++){
				  $('.table-body').append(`<tr>
				    <td>${data[i].Name}</td>
				    <td>${data[i].Points}</td>
				    </tr>`)
			  }
		}).catch(err => alert(err));
	}

    render(){
        return (
            <>
                <div className="divRanking  container">
                    <h1 className="title">Melhores jogadores</h1>
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered">
                                <thead className="table-head">
                                    <tr>
                                        <th>
                                            Nome
                                        </th>
                                        <th>
                                            Pontos
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="table-body"></tbody>
                            </table>
                        </div><br/>
                        <p>Deseja entrar no ranking dos melhores jogadores?<br/>
                        Aperte em jogar e boa sorte!</p>
                            
                        <a type="button" className="btn btn-primary" href="http://ec2-18-206-164-193.compute-1.amazonaws.com:3000/play">Jogar</a>
                </div>
            </>
        )
    }
} export default Ranking;
