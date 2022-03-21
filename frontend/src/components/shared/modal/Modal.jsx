import { Modal } from "@material-ui/core";

const Modals = ({ children, open, toggleState }) => {
    return (
        <Modal
            open={open}
            onClose={() => toggleState(prev => !prev)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {children}
        </Modal>
    );
};

export default Modals;

// TODO: all are necess...