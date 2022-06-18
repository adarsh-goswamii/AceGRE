import useGetDevice from "../../hooks/useGetDevice";
import { MOBILE_VIEW, TABLET_VIEW, LAPTOP_VIEW } from "../../hooks/constants";
import Button from "../../components/shared/button/Button";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showRightDrawer } from "../../store/action/common";
import NavigationDrawer from "./NavigationDrawer";

const CallForActions = ({ setAnchorEl, setPopover }) => {
  const navigate = useHistory();
  const device = useGetDevice();
  let loggedIn = Boolean(localStorage.getItem("token"));

  const handleAvatarClick = (e) => {
    setPopover("avatar");
    setAnchorEl(e.currentTarget);
  };

  if (loggedIn) {
    return (
      <>
        <div className="avatar-container" >
          <p className="avatar__text">{localStorage.getItem("email")}</p>
          <Avatar className="avatar" onClick={handleAvatarClick} />
          {device !== LAPTOP_VIEW && <NavigationDrawer />}
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="call-for-actions">
          <Button
            className={"login-btn"}
            variant="contained"
            onClick={() => navigate.push("/auth?user=login")}
          >
            Login
          </Button>
          <Button
            className={"signup-btn rounded-btn"}
            variant="outlined"
            onClick={() => navigate.push("/auth?user=register")}
          >
            SignUp
          </Button>
          {device !== LAPTOP_VIEW && <NavigationDrawer />}
        </div >
      </>
    )
  }
};

export default CallForActions;