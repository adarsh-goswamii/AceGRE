import "./WordDetails.scss";
import { wordDetails } from "../../../data/words";
import { ReactComponent as CrossIcon } from "../../../assets/images/cross.svg";
import { ReactComponent as AccordionOpenIcon } from "../../../assets/images/accordionOpen.svg";
import { ReactComponent as Volume } from "../../../assets/images/volume.svg";
import { Heading, H3, Body } from "../../shared/typography/Typogrpahy";
import { AccordionSummary } from "@material-ui/core";
import Accordion from "../../shared/accordion/Accordion";
import Button from "../../shared/button/Button";


const WordDetails = ({
  id, // n
  className
}) => {

  return (
    <div className="word-details-pane">
      <div className="word-details-container">
        <div className="header">
          <Heading>Word Details</Heading>
          <CrossIcon className="icon" />
        </div>

        <div className="hero-section">
          <div className="top-row">
            <H3>{wordDetails.word}</H3>
            <Volume className="icon" onClick={() => {}}/>
          </div>
          <Accordion
            className="accordion"
            defaultExpanded={true}
            Heading={
              <AccordionSummary
                expandIcon={<AccordionOpenIcon className="icon" />}
              >
                <Heading>Meanings</Heading>
              </AccordionSummary>
            }
            Content={
              <ul>
                {
                  wordDetails?.meanings?.map(({ id, meaning }) => {
                    return (
                      <li key={id} className="meaning-li">
                        <Body>{meaning}</Body>
                      </li>
                    );
                  })
                }
              </ul>
            }
          />
          <Accordion
            className="accordion"
            defaultExpanded={true}
            Heading={
              <AccordionSummary
                expandIcon={<AccordionOpenIcon className="icon" />}
              >
                <Heading>Mneumonics</Heading>
              </AccordionSummary>
            }
            Content={
              <ul>
                {
                  wordDetails?.mneumonics?.map(({ id, mneumonic }) => {
                    return (
                      <li key={id} className="meaning-li">
                        <Body>{mneumonic}</Body>
                      </li>
                    );
                  })
                }
              </ul>
            }
          />
          <Accordion
            className="accordion"
            defaultExpanded={true}
            Heading={
              <AccordionSummary
                expandIcon={<AccordionOpenIcon className="icon" />}
              >
                <Heading>Sentences</Heading>
              </AccordionSummary>
            }
            Content={
              <ul>
                {
                  wordDetails?.sentences?.map(({ id, sentence }) => {
                    return (
                      <li key={id} className="meaning-li">
                        <Body>{sentence}</Body>
                      </li>
                    );
                  })
                }
              </ul>
            }
          />
          {wordDetails?.funFact && <div className="fun-fact">
            <Heading>Fun Fact</Heading>
            <Body className="fun-fact-content">{wordDetails.funFact}</Body>
          </div>}
        </div>
      </div>

      <div className="footer">
        <Button color="$green" fullWidth={false}>Completed</Button>
        <Button color="$green" fullWidth={false}>Review Later</Button>
      </div>
    </div>
  );
}

export default WordDetails;