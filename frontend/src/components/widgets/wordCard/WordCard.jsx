import { useEffect, useState } from "react";
import { Heading, Body } from "../../../components/shared/typography/Typogrpahy";
import { ReactComponent as MenuIcon } from "../../../assets/images/menu.svg";
import { ReactComponent as Completed } from "../../../assets/images/completed.svg";
import { ReactComponent as CompletedActive } from "../../../assets/images/completedActive.svg";
import { ReactComponent as Review } from "../../../assets/images/review.svg";
import { ReactComponent as ReviewActive } from "../../../assets/images/reviewActive.svg";
import { wordMenu } from "../../../data/words";
import Popover from "../../../components/shared/popover/Popover";
import "./WordCard.scss";
import { MenuItem } from "@material-ui/core";
import { PropTypes } from "prop-types";

const WordCard = ({
  status, // can have three values ["review later", "completed", "none"]
  className,
  title,
  meanings,
  onClick
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [wordStatus, setWordStatus] = useState(null);

  useEffect(() => {
    setWordStatus(status);
  }, [status]);

  function handleStatusChange(id, title) {
    if (title === wordStatus) setWordStatus(null);
    else setWordStatus(title);
    setAnchorEl(null);
  }

  let meaning = "";
  meanings.forEach(value => {
    meaning += `${value.meaning}, `;
  });
  meaning = meaning.substring(0, meaning.length - 2);
  return (
    <>
      <div
        onClick={onClick}
        className={`word-container ${wordStatus} ${className}`}>
        <div className="word-info">
          <div className="word-title">
            <Heading>{title}</Heading>
            <MenuIcon onClick={(e) => {
              e.stopPropagation();
              setAnchorEl(e.currentTarget)
            }} className="menu-icon" />
          </div>
          <p className="meaning">
            {
              meaning
            }
          </p>
        </div>
      </div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}>
        <div className="menu-container">
          {
            wordMenu?.map(({ id, title }) => {
              return (
                <MenuItem key={id} onClick={() => handleStatusChange(id, title)}>
                  {id === 1 ? (wordStatus === title ? <CompletedActive /> : <Completed />)
                    :
                    (wordStatus === title ? <ReviewActive /> : <Review />)
                  }
                  <Body className={`light wordMenu-title ${title === wordStatus ? wordStatus : ""}`} >{title}</Body>
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
WordCard.propTypes = {
  //necesarry fields
  status: PropTypes.oneOf(["review later", "completed", "none"]).isRequired,
  title: PropTypes.string.isRequired,
  meaning: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  //optional field
  className: PropTypes.string
};
