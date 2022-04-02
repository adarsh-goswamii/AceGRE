import { useState } from "react";
import { words } from "../../../data/words";
import WordCard from "../../widgets/wordCard/WordCard";
import "./Explore.scss";
import RightPane from "../../../layout/rightDrawer/RightDrawer";
import WordDetails from "../../widgets/wordDetails/WordDetails";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../store/action/common";

const Explore = () => {
  const rightDrawer = useSelector(state => state.common.rightDrawer);
  const dispatch = useDispatch();
  function handleRightPaneOpen(event) {
    dispatch(action.showRightDrawer({open: true}));
  }
  function handleRightPaneClose() {
    dispatch(action.showRightDrawer({open: false}));
  }
  return (
    <>
      <div className="word-grid-container">
        {
          words?.map(word => <WordCard {...word} onClick={handleRightPaneOpen} />)
        }
      </div>
      <div className="pagination">
      </div>
      <RightPane
        open={rightDrawer?.open}
        close={handleRightPaneClose}
        className="word-details-pane">
        <WordDetails id={6} />
      </RightPane>
    </>
  )
}

export default Explore;