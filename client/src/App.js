import React, { Fragment } from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import Alert from "./components/alert/alert.component";

import Landing from "./pages/landing/landing.component";
import Navbar from "./components/navbar/navbar.component";
import Login from "./pages/login/login.component";
import SignUp from "./pages/signup/signup.component";

const App = () => {
	return (
    <Fragment>
      <Navbar/>
      <Route exact path="/" component={Landing}/>
      <section className="container">
        <Alert/>
        <Switch>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/login" component={Login}/>
        </Switch>
      </section>
    </Fragment>
    );
};

export default App;
