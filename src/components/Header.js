import { Button } from "react-bootstrap";
import "../components/Navigation.css"

const Header = () => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1 style={{ color: "#3aab7b", fontSize: "60px" }} >
                   Landing Page
                </h1>
                <p style={{marginBottom:"0"}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  sed dapibus leo nec ornare diam sed commodo nibh ante
                  facilisis bibendum.
                </p>
                <Button className="btn create_btn mt-5" style={{ fontSize: "18px"}}>
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
