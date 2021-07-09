import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';

import Layout from './components/layout';
import Login from './components/login';
import Play from './components/play';
import Ranking from './components/ranking';
import { isAuth } from './utils/auth';

function App() {
  return(
	<Layout>  
	 <Router>
	  <Switch>
	   <Route path='/login'>
		<Login/>
	   </Route>

	   <Route path='/ranking' render={() =>
			   isAuth() ? (<Ranking/>) : (<Redirect to='/login'/>)
	   }/>

	   <Route path='/play' render={() =>
		   isAuth() ? (<Play/>) : (<Redirect to='/login'/>)
	   }/>
	  </Switch>
	 </Router>
	</Layout>
  );
}

export default App;
