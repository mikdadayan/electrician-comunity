import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types'


const Landing = ({auth: {isAuthenticated}}) => {

  if(isAuthenticated){
    return <Redirect to='/dashboard'/>
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Engineer Comunity</h1>
          <p className="lead">
            Create a Engineer profile/portfolio, share posts and get help from
            other electrical engineers
          </p>
          <div className="buttons">
            <Link to="/signup" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}


const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Landing);