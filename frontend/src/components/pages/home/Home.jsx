import "./Home.scss";
import Girl from "../../../assets/images/girl.png";
import Boy from "../../../assets/images/boy.png";
import Button from '../../shared/button/Button';
import Header from "../../../layout/header/Header"
import TestimonialSlider from "../../widgets/testimonials/TestimonialSlider";
import { TAGLINE } from "../../../constants/generic.consts";
import { ReactComponent as Line1 } from "../../../assets/images/line1.svg";
import { ReactComponent as Line2 } from "../../../assets/images/line2.svg";
import { ReactComponent as Line3 } from "../../../assets/images/line3.svg";
import {useEffect, useRef} from "react";
import { Navigate, useNavigate } from "react-router-dom";


const Home = () => {
  const heroRef = useRef();
  const headerRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      if(scrollTop >= 40) {
        headerRef.current.style.backgroundColor = "white";
      } else headerRef.current.style.backgroundColor = "transparent";
    }
    window.addEventListener("scroll", handleScroll) 

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <>
      <div className="hero-section" ref={heroRef}>
        <Header headerRef={headerRef}/>
        <div className="content">
          <p className="tagline">{TAGLINE}</p>
          <p className="sub-tagline">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi aut natus eum consequatur perferendis.</p>
          <Button
            onClick={() => navigate("/explore")}
            className="outlined-btn"
            variant="contained">Start Learning today</Button>
          <img src={Girl} className="girl" />
          <img src={Boy} className="boy" />
          <Line1 className="line one" />
          <Line2 className="line two" />
          <Line3 className="line three" />
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