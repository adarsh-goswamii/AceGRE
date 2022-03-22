import { Avatar } from "@material-ui/core";
import "./Header.scss";

const Header = ({

}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    return (
        <>
            <div className="header-container">
                <H3>AceGRE</H3>
                <div className="navigation-tabs">
                </div>
                {
                    loggedIn ?
                        <Avatar />
                        :
                        <div className="call-for-actions">
                            <Button
                                variant="contained"
                                // TODO: Add login and signup
                                onClick={() => { }}
                            >Login</Button>
                            <Button
                                variant="outlined"
                                onCLick={() => { }}>SignUp</Button>
                        </div>

                }
            </div>
            <Popup>

            </Popup>
        </>
    );
};

export default Header;