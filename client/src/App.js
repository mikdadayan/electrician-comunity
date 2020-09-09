import React, { Fragment, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Alert from './components/alert/alert.component';
import Landing from './pages/landing/landing.component';
import Navbar from './components/navbar/navbar.component';
import Routes from "./components/router/routes";

import setAuthToken from './redux/utils/setAuthToken';
import { loadUser } from './redux/auth/auth.actions';
import { getCurrentUserProfile } from './redux/profile/profile.actions';

import './App.css';

if (localStorage.token) {
	console.log(localStorage.token);
	setAuthToken(localStorage.token);
}

const App = ({ loadUser, getCurrentUserProfile }) => {
	useEffect(() => {
		loadUser();
		getCurrentUserProfile();
	}, []);

	return (
		<Fragment>
			<Navbar />
			<Switch>
				<Route exact path="/" component={Landing} />
				<section className="container">
					<Alert />
					<Routes/>
				</section>
			</Switch>
		</Fragment>
	);
};

export default connect(null, { loadUser, getCurrentUserProfile })(App);
