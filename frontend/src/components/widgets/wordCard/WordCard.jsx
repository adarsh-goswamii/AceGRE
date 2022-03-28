import { useState } from "react";
import { Heading, Body } from "../../../components/shared/typography/Typogrpahy";
import { ReactComponent as MenuIcon } from "../../../assets/images/menu.svg";
import { wordMenu } from "../../../data/words";
import Popover from "../../../components/shared/popover/Popover";
import "./WordCard.scss";
import { MenuItem } from "@material-ui/core";

const WordCard = ({
  status, // can have three values ["review later", "completed", "none"]
  className,
  title,
  meaning,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <div className={`word-container ${status} ${className}`}>
        <div className="word-info">
          <div className="word-title">
            <Heading>{title}</Heading>
            <MenuIcon onClick={(e) => setAnchorEl(e.currentTarget)} className="menu-icon" />
          </div>
          <p className="meaning">
            {meaning}
          </p>
        </div>
      </div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}>
        <div className="menu-container">
          {
            wordMenu?.map(({id, title}) => {
              return (
                <MenuItem key={id}>
                  <Body className="light">{title}</Body>
                </MenuItem>
              )
            })
          }
        </div>
      </Popover>
    </>
  );
}

export default WordCard;
WordCard.propTypes={
  
  status: PropTypes.string,
  className:PropTypes.string,
  title:PropTypes.string,
  meaning:PropTypes.string
};
