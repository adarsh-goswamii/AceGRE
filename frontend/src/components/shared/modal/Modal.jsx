import { Modal } from "@material-ui/core";
import { PropTypes } from "prop-types";

const Modals = ({ children, open, toggleState }) => {
  return (
    <Modal
      open={open}
      onClose={() => toggleState((prev) => !prev)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {children}
    </Modal>
  );
};

export default Modals;

Modals.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  toggleState: PropTypes.bool.isRequired,
};
