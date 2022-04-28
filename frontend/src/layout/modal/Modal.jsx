import { Modal as MuiModal } from "@material-ui/core";
import { useSelector } from "react-redux";
import "./Modal.scss";

const Modal = ({ handleClose }) => {
  const modal = useSelector(state => state.common.modal);
  
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
  )
};

export default Modal;