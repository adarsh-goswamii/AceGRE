import { Snackbar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { closeToaster } from "../../store/action/common";
import MuiAlert from "@material-ui/lab/Alert";
import "./Toaster.scss";

const Toaster = () => {
  const dispatch = useDispatch();
  const toaster = useSelector((state) => state.common.toaster);

  function handleClose() {
    dispatch(closeToaster());
  }

  return (
    <div className="toaster-container">
      <Snackbar
        open={toaster.open}
        autoHideDuration={toaster.duration || 4000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={toaster.severity}>
          {toaster.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default Toaster;
