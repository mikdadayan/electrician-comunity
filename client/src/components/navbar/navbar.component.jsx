import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="navbar bg-dark">
			<h1>
				<Link to="/">
        <i className="fas fa-bolt"></i> Electricians
				</Link>
			</h1>
			<ul>
				<li>
					<NavLink activeStyle={{color: "#ff9138"}} to="/dev">Engineers</NavLink>
				</li>
				<li>
					<NavLink activeStyle={{color: "#ff9138"}} to="/signup">Sign Up</NavLink>
				</li>
				<li>
					<NavLink activeStyle={{color: "#ff9138"}} to="/login">Login</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
