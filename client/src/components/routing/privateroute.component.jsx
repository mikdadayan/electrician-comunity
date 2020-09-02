import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth: {isAuthenticated, loading}, ...rest }) => {
	console.log('auth')
	return <Route
		{...rest}
		render={(props) => (!isAuthenticated && !loading ? <Redirect to="/login" /> : <Component {...props} />)}
	/>
};

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default withRouter( connect(mapStateToProps)(PrivateRoute));
