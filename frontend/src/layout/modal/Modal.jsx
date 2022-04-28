import { Modal as MuiModal } from "@material-ui/core";
import { useSelector } from "react-redux";
import "./Modal.scss";
import { PropTypes } from "prop-types";

const Modal = ({ handleClose }) => {
  const modal = useSelector((state) => state.common.modal);

  return (
    <>
      <MuiModal
        open={modal?.open}
        onClose={handleClose}
        className="modal-container"
      >
        {modal.children}
      </MuiModal>
    </>
  );
};

export default Modal;
Modal.propTypes = {
  // necessary fields
  handleClose: PropTypes.func,
};
