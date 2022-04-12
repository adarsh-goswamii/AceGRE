import "./Home.scss";
import { ReactComponent as OverLayHome } from "../../../assets/images/overlayHome.svg";
import Button from '../../shared/button/Button';
import TestimonialSlider from "../../widgets/testimonials/TestimonialSlider";
import { TAGLINE } from "../../../constants/generic.consts";

const Home = () => {
  return (
    <>
      <div className="hero-section">
        <div className="content">
          <p className="tagline">{TAGLINE}</p>
          <Button
            onClick={() => { }}
            className="outlined-btn"
            variant="outlined">Start Learning today</Button>
          <OverLayHome className="overlay" />
        </div>
      </div>

      <div className="testimonials-slider">
        <p className="heading">TESTIMONIALS</p>
        <TestimonialSlider />
      </div>
    </>
  );
};

export default Home;