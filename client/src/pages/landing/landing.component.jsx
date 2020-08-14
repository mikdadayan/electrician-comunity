import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
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

export default Landing;