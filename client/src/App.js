import React, { Fragment, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import Alert from './components/alert/alert.component';
import Landing from './pages/landing/landing.component';
import Navbar from './components/navbar/navbar.component';
import Login from './pages/login/login.component';
import SignUp from './pages/signup/signup.component';
import setAuthToken from './redux/utils/setAuthToken';
import { loadUser } from './redux/auth/auth.actions';

import PrivateRoute from './components/routing/privateroute.component';
import Dashboard from './pages/dashboard/dashboard.component';
import CreateProfile from './pages/create-profile/createProfile.component';
import EditProfile from './pages/edit-profile/editProfile.component';

import { getCurrentUserProfile } from './redux/profile/profile.actions';
import AddExperience from './pages/add-experience/addExperience.component';
import AddEducation from './pages/add-education/addEducation.component';

if (localStorage.token) {
	console.log(localStorage.token)
	setAuthToken(localStorage.token);
}



const App = ({loadUser, getCurrentUserProfile}) => {
	useEffect(() => {
		loadUser();
		getCurrentUserProfile()
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
					<PrivateRoute exact path='/dashboard' component={Dashboard}/>
					<PrivateRoute exact path='/create-profile' component={CreateProfile}/>
					<PrivateRoute exact path='/edit-profile' component={EditProfile}/>
					<PrivateRoute exact path='/add-experience' component={AddExperience}/>
					<PrivateRoute exact path='/add-education' component={AddEducation}/>
				</Switch>
			</section>
		</Fragment>
	);
};



export default connect(null, { loadUser, getCurrentUserProfile })(App);
