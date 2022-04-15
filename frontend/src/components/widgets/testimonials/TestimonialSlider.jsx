import "./Testimonial.scss";
import Testimonial from "./Testimonial";
import { ReactComponent as LeftArrow } from "../../../assets/images/leftArrow.svg";
import { ReactComponent as RightArrow } from "../../../assets/images/rightArrow.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const TestimonialSlider = ({

}) => {

  return (
    <Carousel
      axis="horizontal"
      autoPlay={true}
      showStatus={false}
      infiniteLoop={true}
      swipeable={true}
      showArrows={true}
      interval={3000}
      renderArrowPrev={(handleClick) => <LeftArrow className="left-arrow" onClick={handleClick} />}
      renderArrowNext={(handleClick) => <RightArrow className="right-arrow" onClick={handleClick} />}
      className="testimonials-container">
      <div>
        <Testimonial />
      </div>
      <div>
        <Testimonial />
      </div>
      <div>
        <Testimonial />
      </div>
    </Carousel>
  )
};

export default TestimonialSlider;