import React from "react";
import { Link, useLocation  } from "react-router-dom";

const HomePage: React.FC = () => {
  const location = useLocation();

  return (
    <div className="HomePage">
      <div className="navBar">
        <Link to="/" className={location.pathname === "/" ? "activeNavButton navButton" : "navButton"}>
          Home
        </Link>
        <Link to="/LoadingImages" className={location.pathname === "/LoadingImages" ? "activeNavButton navButton" : "navButton"}>
          Load Dicom Images
        </Link>

      </div>
      <div className="mainContent">
        <h1>home</h1>
      </div>
    </div>
  );
};

export default HomePage;
