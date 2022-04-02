import { Accordion, AccordionDetails } from "@material-ui/core";
import "./Accordion.scss";

const CustomAccordion = ({
  Heading, //n
  Content, //n
  defaultExpanded = false, // o
  className
}) => {
  return (
    <Accordion classes={{root: className}} defaultExpanded={defaultExpanded}>
      {Heading}
      <AccordionDetails>
        {Content}
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;