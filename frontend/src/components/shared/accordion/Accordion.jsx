import { Accordion, AccordionDetails, AccordionSummary } from "@material-ui/core";
import { PropTypes } from "prop-types";
import "./Accordion.scss";

const CustomAccordion = ({
  Heading,
  Content,
  defaultExpanded = false,
  className,
}) => {
  return (
    <Accordion
      classes={{ root: `accordion ${className}` }}
      defaultExpanded={defaultExpanded}>
      <AccordionSummary
        classes={{ expanded: "summary-expanded" }}
        >
        {Heading}
      </AccordionSummary>
      <AccordionDetails>{Content}</AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
CustomAccordion.propTypes = {
  // necessary fields
  Heading: PropTypes.string.isRequired,
  Content: PropTypes.string.isRequired,
  // optional fields
  defaultExpanded: PropTypes.bool,
  className: PropTypes.string,
};
