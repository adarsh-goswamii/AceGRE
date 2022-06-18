import { useState } from "react";
import { ClickAwayListener } from "@material-ui/core";
import { H3 } from "../../components/shared/typography/Typogrpahy";
import Menu from "../../components/shared/menu/MenuList";
import "./Header.scss";
import AvatarMenu from "../../components/widgets/avatarMenu/AvatarMenu";
import NavigationTabs from "./NavigationTabs";
import CallForActions from "./CallForActions";
import { Menu as MuiMenu } from "@material-ui/core";

const Header = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menu, setMenu] = useState([]);
  const [popover, setPopover] = useState("");
  const handlePopOverClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="header-container" ref={props.headerRef}>
        <H3>AceGRE</H3>
        <NavigationTabs
          setAnchorEl={setAnchorEl}
          handlePopOverClose={handlePopOverClose}
          setMenu={setMenu}
          setPopover={setPopover} />
        <CallForActions
          setPopover={setPopover}
          setAnchorEl={setAnchorEl} />
      </div>
      <MuiMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <ClickAwayListener onClickAway={handlePopOverClose}>
          <div className="menu-container">
            {popover === "menu" && <Menu menu={menu} className="submenu" />}
            {popover === "avatar" && (
              <AvatarMenu handlePopOverClose={handlePopOverClose} />
            )}
          </div>
        </ClickAwayListener>
      </MuiMenu>
    </>
  );
};

export default Header;
