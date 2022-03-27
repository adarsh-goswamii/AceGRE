import { useState } from "react";
import { Avatar, ClickAwayListener } from "@material-ui/core";
import { H3, Heading } from "../../components/shared/typography/Typogrpahy";
import Menu from "../../components/shared/menu/MenuList";
import Button from "../../components/shared/button/Button";
import Popover from "../../components/shared/popover/Popover";
import data from "../../data/headerNav";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.scss";

const Header = ({ }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [menu, setMenu] = useState([]);
    const handlePopOverClose = () => setAnchorEl(null);
    const handleMenuClick = (e, menu) => {
        if (menu.pathname) {
            navigate(menu.pathname);
        } else {
            setAnchorEl(e.currentTarget);
            let temp= menu?.submenu.map(data => { 
                data.onClick= () => {
                    handlePopOverClose();
                    navigate(data.pathname);
                };
                return data;
            });
            setMenu(temp);
        }
    };

    // get this from redux.
    let loggedIn = false;
    return (
        <>
            <div className="header-container">
                <H3>AceGRE</H3>
                <div className="navigation-tabs">
                    {data?.map((menu, index) => {
                        return (
                            <div className={`heading-container ${location.pathname === menu.pathname ? "active" : ""} `} onClick={(e) => handleMenuClick(e, menu)}>
                                <Heading
                                    key={index}
                                    className={`menu-heading`}>
                                    {menu?.heading}
                                </Heading>
                            </div>
                        )
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
            <Popover 
                open={Boolean(anchorEl)} 
                anchorEl={anchorEl} 
                setAnchorEl={setAnchorEl}
                >
                <ClickAwayListener onClickAway={handlePopOverClose}>
                    <div className="menu-container">
                        <Menu menu={menu} className="submenu"/>
                    </div>
                </ClickAwayListener>
            </Popover>
        </>
    );
};

export default Header;
