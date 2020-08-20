import React, { Fragment, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import store from './redux/store';
import Alert from './components/alert/alert.component';
import Landing from './pages/landing/landing.component';
import Navbar from './components/navbar/navbar.component';
import Login from './pages/login/login.component';
import SignUp from './pages/signup/signup.component';
import setAuthToken from './redux/utils/setAuthToken';
import { loadUser } from './redux/auth/auth.actions';

import './App.css';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Fragment>
			<Navbar />
			<Route exact path="/" component={Landing} />
			<section className="container">
				<Alert />
				<Switch>
					<Route exact path="/signup" component={SignUp} />
					<Route exact path="/login" component={Login} />
				</Switch>
			</section>
		</Fragment>
	);
};

export default App;
