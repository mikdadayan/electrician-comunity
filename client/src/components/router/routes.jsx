import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../../pages/login/login.component';
import SignUp from '../../pages/signup/signup.component';
import AddExperience from '../../pages/add-experience/addExperience.component';
import AddEducation from '../../pages/add-education/addEducation.component';
import Profiles from '../../pages/profiles/profiles.component';
import Profile from '../../pages/profile/profile.component';
import Posts from '../../pages/posts/posts.component';
import Post from '../../pages/post/post.component';
import PrivateRoute from '../../components/routing/privateroute.component';
import Dashboard from '../../pages/dashboard/dashboard.component';
import CreateProfile from '../../pages/create-profile/createProfile.component';
import EditProfile from '../../pages/edit-profile/editProfile.component';
import NotFound from '../../pages/not-found/not-found.component';


const routes = () => {
	return (
		<Switch>
			<Route exact path="/signup" component={SignUp} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/engineers" component={Profiles} />
			<Route exact path="/engineers/:userId" component={Profile} />
			<PrivateRoute exact path="/dashboard" component={Dashboard} />
			<PrivateRoute exact path="/create-profile" component={CreateProfile} />
			<PrivateRoute exact path="/edit-profile" component={EditProfile} />
			<PrivateRoute exact path="/add-experience" component={AddExperience} />
			<PrivateRoute exact path="/add-education" component={AddEducation} />
			<PrivateRoute exact path="/posts" component={Posts} />
			<PrivateRoute exact path="/posts/:postId" component={Post} />
			<Route component={NotFound} />
		</Switch>
	);
};


export default routes;