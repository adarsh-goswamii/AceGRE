import "./WordDetails.scss";
import { wordDetails } from "../../../data/words";
import { ReactComponent as CrossIcon } from "../../../assets/images/cross.svg";
import { ReactComponent as AccordionOpenIcon } from "../../../assets/images/accordionOpen.svg";
import { Heading, H3 } from "../../shared/typography/Typogrpahy";
import { Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";

const WordDetails = ({
  id, // n
  className
}) => {

  return (
    <div className="word-details-pane">
      <div className="header">
        <Heading>Word Details</Heading>
        <CrossIcon className="icon" />
      </div>

      <div className="hero-section">
        <H3>{wordDetails.word}</H3>
        <Accordion>
          <AccordionSummary
            expandIcon={<AccordionOpenIcon className="icon"/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Accordion 1
          </AccordionSummary>
          <AccordionDetails>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
            </p>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default WordDetails;