import React from 'react';
import { login } from '../utils/auth'

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			login: '',
			password: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	//atualiza o estado de acordo com o que foi preenchido no formulário
	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	//envia os dados para o backend
	handleSubmit(e){
		e.preventDefault();

		const options = {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state)
		}

		fetch('http://ec2-18-233-156-100.compute-1.amazonaws.com:3000/login', options)
			.then(res => {
                return res.json();
			})
			.then(data => {
				if(data.err){
					alert(data.err);
				} else {
					login(data.token);
					window.location.href="/ranking"
				}
			}).catch(err => alert(err));
	}
	
	render(){
		return (
	    <>
			<h1 className="title">GameMath</h1>
			<form className="form" method="POST" onSubmit={this.handleSubmit}>
				<div className="form-group">
				   <label>Login:</label>
				   <input type="text" className="form-control" id="login" name="login" onChange={this.handleChange} value={this.state.name} required/>
				</div>

				<div className="form-group">
			   		<label>Senha:</label>
			   		<input type="password" className="form-control" id="password" name="password" onChange={this.handleChange} value={this.state.name} required/>
				</div>
	
				<button type="submit" className="btn btn-success" id="botao">Entrar</button>
			</form>
        </>);
	}
} export default Login;
