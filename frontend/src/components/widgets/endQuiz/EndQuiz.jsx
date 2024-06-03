import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import Button from "../../shared/button/Button";
import useFullScreen from "../../../hooks/useFullScreen";
import { QUIZ_END_MODAL_CONTENT, QUIZ_END_MODAL_TITLE } from "../../../constants/generic.consts";

const Modal = ({ open, onSecondaryClick, onPrimaryClick, title, content }) => {
  return (
    <div>
      <Dialog onClose={onSecondaryClick} open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {content}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onPrimaryClick}>
            End Quiz
          </Button>
          <Button variant="contained" onClick={onSecondaryClick}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export const EndQuizAlert = ({ open, setOpen, endQuiz }) => {
  const containerId = "quiz-container-modal";
  const { toggleFullScreen, isFullScreen } = useFullScreen(containerId);

  const handleClose = (e) => {
    if (!isFullScreen) toggleFullScreen();
    setOpen(false);
  };

  const handleEndQuiz = (e) => {
    endQuiz();
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        title={QUIZ_END_MODAL_TITLE}
        content={QUIZ_END_MODAL_CONTENT}
        onSecondaryClick={handleClose}
        onPrimaryClick={handleEndQuiz}
      />
    </>
  );
};
