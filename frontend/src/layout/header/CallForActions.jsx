import useGetDevice from "../../hooks/useGetDevice";
import { MOBILE_VIEW, TABLET_VIEW, LAPTOP_VIEW } from "../../hooks/constants";
import Button from "../../components/shared/button/Button";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showRightDrawer } from "../../store/action/common";
import NavigationDrawer from "./NavigationDrawer";
import MenuIcon from "@mui/icons-material/Menu";

const CallForActions = ({ setAnchorEl, setPopover }) => {
  const navigate = useHistory();
  const dispatch = useDispatch();
  const device = useGetDevice();
  let loggedIn = Boolean(localStorage.getItem("token"));

  const handleAvatarClick = (e) => {
    setPopover("avatar");
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClick = () => {
    dispatch(showRightDrawer({ open: true, children: <NavigationDrawer /> }));
  };

  if (loggedIn) {
    return (
      <>
        <div className="avatar-container">
          {device === LAPTOP_VIEW && (
            <p className="avatar__text">{localStorage.getItem("fullname")}</p>
          )}
          {device === LAPTOP_VIEW && (
            <Avatar className="avatar" onClick={handleAvatarClick} />
          )}
          {device !== LAPTOP_VIEW && (
            <MenuIcon onClick={handleMenuClick} className="nav-menu__icon" />
          )}
        </div>
      </>
    );
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
          {device !== LAPTOP_VIEW && (
            <MenuIcon onClick={handleMenuClick} className="nav-menu__icon" />
          )}
        </div>
      </>
    );
  }
};

export default CallForActions;
