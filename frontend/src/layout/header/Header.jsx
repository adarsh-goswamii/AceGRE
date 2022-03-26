import { useState } from "react";
// import { useLocation } from "react-router-dom";
import { Avatar, ClickAwayListener, Popover } from "@material-ui/core";
import "./Header.scss";
import { H3, Heading } from "../../components/shared/typography/Typogrpahy";
import Menu from "../../components/shared/menu/MenuList";
import Button from "../../components/shared/button/Button";

const Header = ({ }) => {
    // const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const [menu, setMenu] = useState([]);
    const handlePopOverClose = () => setAnchorEl(null);
    const handleMenuOpen = (e, menu) => {
        setAnchorEl(e.currentTarget);
        setMenu(menu);
    };

    // console.log(location);

    // get this from redux.
    let loggedIn = false;
    return (
        <>
            <div className="header-container">
                <H3>AceGRE</H3>
                <div className="navigation-tabs">
                    {data?.map((menu, index) => {
                        return <Heading key={index} className="menu-heading" onClick={(e) => handleMenuOpen(e, menu?.submenu)}>{menu?.heading}</Heading>
                    })}
                </div>
                {loggedIn ? (
                    <Avatar />
                ) : (
                    // TODO: Add login and signup functionality
                    <div className="call-for-actions">
                        <Button
                            className={"login-btn"}
                            variant="cont
                            ained"
                            onClick={() => { }}
                        >
                            Login
                        </Button>
                        <Button
                            className={"signup-btn rounded-btn"}
                            variant="outlined" onCLick={() => { }}>
                            SignUp
                        </Button>
                    </div>
                )}
            </div>
            <Popover anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
                <ClickAwayListener onClickAway={handlePopOverClose}>
                    <div className="header-menu-container">
                        <Menu menu={menu} />
                    </div>
                </ClickAwayListener>
            </Popover>
        </>
    );
};

export default Header;


// Dummy data 
let data = [
    {
        heading: "Home",
        submenu: null,
    },
    {
        heading: "Explore",
        submenu: null,
    },
    {
        heading: "Quizzes",
        submenu: null,
    },
    {
        heading: "Leaderboard",
        submenu: null,
    }
]