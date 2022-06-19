import data from "../../data/headerNav";
import { useLocation, useHistory } from "react-router-dom";
import { Avatar, MenuItem } from "@material-ui/core";
import { Body } from "../../components/shared/typography/Typogrpahy";
import styles from "./navigationDrawer.module.scss";
import { ReactComponent as LogoutIcon } from "../../assets/images/logout.svg";
import { useDispatch } from "react-redux";
import { showRightDrawer } from "../../store/action/common";
import { handleLogout } from "../../store/action/auth";

const NavigationDrawer = ({}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useHistory();
  const email = localStorage.getItem("email");
  const loggedIn = Boolean(localStorage.getItem("token"));

  function handleTabClick(menu) {
    navigate.push(menu.pathname);
    dispatch(showRightDrawer({ open: false, children: null }));
  }

  function logoutClickHandler() {
    dispatch(handleLogout());
    dispatch(showRightDrawer({ open: false, children: null }));
    navigate.push("/");
  }

  return (
    <div className={styles["specificity"]}>
      <div className={styles["nav-menu"]}>
        <div className={styles["nav-menu__personal-info"]}>
          <Avatar
            alt="Travis Howard"
            src=""
            className={styles["nav-menu__avatar"]}
          />
          <span>
            <p className={styles["nav-menu__name"]}>{"Hello user, "}</p>
            <p className={styles["nav-menu__mail"]}>{email}</p>
          </span>
        </div>

        <div className={styles["nav-menu__navigation-tabs"]}>
          {data?.map((menu, index) => {
            return (
              <MenuItem
                classes={{
                  root: `${styles["nav-menu__tab"]} ${
                    location.pathname === menu.pathname ? styles["active"] : ""
                  } `,
                }}
                onClick={() => handleTabClick(menu)}
              >
                {<menu.icon className={styles["nav-menu__icons"]} />}
                <Body key={index} className={styles["menu-heading"]}>
                  {menu?.heading}
                </Body>
              </MenuItem>
            );
          })}
        </div>
        {loggedIn && (
          <MenuItem
            className={`${styles["nav-menu__footer"]} ${styles["nav-menu__tab"]}`}
          >
            <LogoutIcon className={styles["nav-menu__icons"]} />
            <Body onClick={logoutClickHandler}>Logout</Body>
          </MenuItem>
        )}
      </div>
    </div>
  );
};

export default NavigationDrawer;
