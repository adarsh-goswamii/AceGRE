import "./home.scss";
import Girl from "../../../assets/images/girl.png";
import Boy from "../../../assets/images/boy.png";
import Button from "../../shared/button/Button";
import Header from "../../../layout/header/Header";
import TestimonialSlider from "../../widgets/testimonials/TestimonialSlider";
import { TAGLINE } from "../../../constants/generic.consts";
import { ReactComponent as Line1 } from "../../../assets/images/line1.svg";
import { ReactComponent as Line2 } from "../../../assets/images/line2.svg";
import { ReactComponent as Line3 } from "../../../assets/images/line3.svg";
import { ReactComponent as Line4 } from "../../../assets/images/line-service.svg";
import { ReactComponent as ExploreIcon } from "../../../assets/images/explore-service.svg";
import { ReactComponent as QuizIcon } from "../../../assets/images/quiz-service.svg";
import { ReactComponent as VisualizeIcon } from "../../../assets/images/visualize-service.svg";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const heroRef = useRef();
  const headerRef = useRef();
  const history = useHistory();

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      if (scrollTop >= 40) {
        headerRef.current.style.backgroundColor = "white";
      } else headerRef.current.style.backgroundColor = "transparent";
    }
    window.addEventListener("scroll", handleScroll);
    localStorage.removeItem("quiz");
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="hero-section" ref={heroRef}>
        <Header headerRef={headerRef} />
        <div className="content">
          <div className="content-info">
            <p className="tagline">{TAGLINE}</p>
            <Button
              onClick={() => history.push("/explore")}
              className="outlined-btn"
              variant="contained"
            >
              Start Learning today
            </Button>
          </div>
          <img src={Girl} className="girl" />
          <img src={Boy} className="boy" />
          <Line1 className="line one" />
          <Line2 className="line two" />
          <Line3 className="line three" />
        </div>
      </div>

      <div className="services-container">
        <p className="heading">Why AceGRE ?</p>
        <p className="sub-heading">
        A scientific and fun way to improve vocabulary
Play games and compete in activities on your own or with participants from around the globe. With our advanced teaching algorithm and study tools, get ready for your vocabulary to expand!
        </p>
        <div className="cards-container">
          <div className="card">
            <p className="heading">Explore</p>
            {/* <ExploreIcon className="icon"/> */}
            <p className="details">
              Explore new words from our collection of selected 1500+ GRE words.
              We divide words lear’nt so far into four categories so you always
              know which words needs your attention.
            </p>
          </div>
          <div className="card">
            <p className="heading">Quizzes</p>
            {/* <QuizIcon className="icon"/> */}
            <p className="details">
              Learning thousands of words and revising them is never easy, thats
              why we offer custom quiz where you get words from the ones you
              have learned so far, emphasizing on words you previously might
              have trouble with.
            </p>
          </div>
          <div className="card">
            <p className="heading">Visualize</p>
            {/* <VisualizeIcon className="icon"/> */}
            <p className="details">
              Track your progress in a visually appealing way with graphs and
              consistency chart to help and motivate you to stay consistent
              through out your journey.
            </p>
          </div>
        </div>
        <Line4 className="line" />
      </div>

      <div className="testimonials-slider">
        <p className="heading">TESTIMONIALS</p>
        <TestimonialSlider />
      </div>
    </>
  );
};

export default Home;
