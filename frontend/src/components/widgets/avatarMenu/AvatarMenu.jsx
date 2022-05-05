import "./AvatarMenu.scss";
import { ReactComponent as ProfileIcon } from "../../../assets/images/profile.svg";
import { ReactComponent as ExploreIcon } from "../../../assets/images/explore.svg";
import { ReactComponent as LeaderboardIcon } from "../../../assets/images/leaderboard.svg";
import { ReactComponent as QuizIcon } from "../../../assets/images/quiz.svg";
import { ReactComponent as StatsIcon } from "../../../assets/images/stats.svg";
import { ReactComponent as LogoutIcon } from "../../../assets/images/logout.svg";
import { Menu, MenuItem } from "@material-ui/core";
import { handleLogout } from "../../../store/action/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";

const AvatarMenu = ({ handlePopOverClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logoutClickHandler() {
    dispatch(handleLogout());
    handlePopOverClose();
    navigate("/");
  }

  function handleNavigation(route) {
    handlePopOverClose();
    navigate(route);
  }

  return (
    <>
      <div className="avatarMenu-container">
        <MenuItem className="menuItem username">
          <ProfileIcon className="icon" />
          <p>{localStorage.getItem("email") || "UserName"}</p>
        </MenuItem>
        <MenuItem className="menuItem explore" onClick={() => handleNavigation("/explore")}>
          <ExploreIcon className="icon" />
          <p>Explore</p>
        </MenuItem>
        <MenuItem className="menuItem leaderboard" onClick={() => handleNavigation("/leaderboard")}>
          <LeaderboardIcon className="icon" />
          <p>Leaderboard</p>
        </MenuItem>
        {/* <MenuItem className="menuItem stats">
          <StatsIcon className="icon" />
          <p>Statistics</p>
        </MenuItem> */}
        <MenuItem className="menuItem quiz" onClick={() => handleNavigation("/quiz")}>
          <QuizIcon className="icon" />
          <p>Quiz</p>
        </MenuItem>
        <MenuItem className="menuItem logout" onClick={logoutClickHandler}>
          <LogoutIcon className="icon" />
          <p>Logout</p>
        </MenuItem>
      </div>
    </>
  );
};

export default AvatarMenu;

AvatarMenu.protoTypes = {
  handlePopOverClose: PropTypes.func,
};
