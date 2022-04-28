import "./WordDetails.scss";
import { wordDetails } from "../../../data/words";
import { ReactComponent as CrossIcon } from "../../../assets/images/cross.svg";
import { ReactComponent as AccordionOpenIcon } from "../../../assets/images/accordionOpen.svg";
import { ReactComponent as Volume } from "../../../assets/images/volume.svg";
import { Heading, H3, Body } from "../../shared/typography/Typogrpahy";
import { AccordionSummary } from "@material-ui/core";
import Accordion from "../../shared/accordion/Accordion";
import Button from "../../shared/button/Button";
import { PropTypes } from "prop-types";
import { useDispatch } from "react-redux";
import { showRightDrawer } from "../../../store/action/common";
import { updateWordStatus } from "../../../store/action/explore";

const WordDetails = ({ word, className }) => {
  const dispatch = useDispatch();

  function handleClick(statusId) {
    dispatch(
      updateWordStatus({
        id: word.id,
        status: statusId,
      })
    );
  }

  return (
    <div className="word-details-pane">
      <div className="word-details-container">
        <CrossIcon
          className="cross-icon"
          onClick={() => dispatch(showRightDrawer({ open: false }))}
        />

        <div className="hero-section">
          <div className="top-row">
            <H3>{word?.title}</H3>
            <Volume className="icon" onClick={() => {}} />
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
                {word?.meanings?.map(({ id, meaning }) => {
                  return (
                    <li key={id} className="meaning-li">
                      <Body>{meaning}</Body>
                    </li>
                  );
                })}
              </ul>
            }
          />
          {word.mneumonics && word.mneumonics.length > 0 && (
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
                  {word?.mneumonics?.map(({ id, mneumonic }) => {
                    return (
                      <li key={id} className="meaning-li">
                        <Body>{mneumonic}</Body>
                      </li>
                    );
                  })}
                </ul>
              }
            />
          )}
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
                {word?.sentences?.map(({ id, sentence }) => {
                  return (
                    <li key={id} className="meaning-li">
                      <Body>{sentence}</Body>
                    </li>
                  );
                })}
              </ul>
            }
          />
          {word?.funFact && (
            <div className="fun-fact">
              <Heading>Fun Fact</Heading>
              <Body className="fun-fact-content">{word.funFact}</Body>
            </div>
          )}
        </div>
      </div>

      <div className="footer">
        <Button color="$green" fullWidth={false} onClick={() => handleClick(1)}>
          Completed
        </Button>
        <Button color="$green" fullWidth={false} onClick={() => handleClick(2)}>
          Review Later
        </Button>
      </div>
    </div>
  );
};

export default WordDetails;
WordDetails.propTypes = {
  // necessary fields
  // optional fields
  word: PropTypes.string,
  className: PropTypes.string
};
