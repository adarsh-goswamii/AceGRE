import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import Button from "../../shared/button/Button";
import { useHistory } from "react-router-dom";

const Modal = ({ open, onClose = () => {}, onQuizEnd, type }) => {
  return (
    <div>
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>{`End Quiz ?`}</DialogTitle>
        <DialogContent>
          It looks like you are trying to naviagte away from the page. If you
          leave, your quiz will end.
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onQuizEnd}>
            End Quiz
          </Button>
          <Button variant="contained" onClick={(e) => onClose(e, "leave")}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export const EndQuizAlert = ({ open, setOpen, endQuiz }) => {
  const history = useHistory();

  const handleClose = (e, reason) => {
    if (reason === "leave") {
      setOpen(false);
      history.goBack();
    } else {
      setOpen(false);
    }
  };

  const handleEndQuiz = (e) => {
    endQuiz();
    handleClose(e, "leave");
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        onQuizEnd={handleEndQuiz}
        type="alert"
      />
    </>
  );
};

export const EndQuizPrompt = ({ open, quizEnd }) => {
  const history = useHistory();
  const [showPrompt, setShowPrompt] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  const onCLoseHandler = (reason) => {
    if (reason === "leave") {
      return true;
    } else return false;
  };

  const onquizEndHandler = () => {
    quizEnd();
    return true;
  };

  if (open) {
    history.block((prompt) => {
      setCurrentPath(prompt);
      setShowPrompt(true);
      return false;
    });
  } else history.block(() => {});

  const handleClose = useCallback(
    async (e, reason) => {
      if (onquizEndHandler) {
        setShowPrompt(false);
        history.block(() => {});
        // history.push(currentPath);
      } else setShowPrompt(false);
    },
    [currentPath, history, onCLoseHandler]
  );

  const onQuizEnd = useCallback(async () => {
    if (onquizEndHandler) {
      const canRoute = await Promise.resolve(onquizEndHandler());
      if (canRoute) {
        history.block(() => {});
        history.push(currentPath);
      }
    }
  }, [currentPath, history, onquizEndHandler]);

  return (
    <>
      {showPrompt ? (
        <Modal
          open={open}
          onClose={handleClose}
          onQuizEnd={onQuizEnd}
          type="prompt"
        />
      ) : null}
    </>
  );
};
