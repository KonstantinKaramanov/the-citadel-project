
import LatestClasses from "../Classes/LatestClasses/LatestClasses";
import { Link } from 'react-router-dom';
import "./Hero.css"


const Hero = () => {
    return (
        <>
            <div className="hero">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-sm-12 col-md-6">
                            <div className="hero-text">
                                <h1>Tier lists and Boosting Services in one place</h1>
                                <p>
                                    Join our community attain your desired result with boosting services , guides and tips. You name it we got it!
                                </p>
                                <div className="hero-btn">
                                    <Link className="btn" to="/classes">Explore Classes</Link>
                                    <Link className="btn" to="/contact">Contact Us</Link>
                                </div>

                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 d-none d-md-block">
                            <div className="hero-image img-levitate">
                                <img src="./img/hero.png" alt="Hero" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <LatestClasses />
        </>
    )
}

export default Hero;
