import { useState } from "react";
import { words } from "../../../data/words";
import WordCard from "../../widgets/wordCard/WordCard";
import "./Explore.scss";
import RightPane from "../../../layout/rightDrawer/RightDrawer";
import WordDetails from "../../widgets/wordDetails/WordDetails";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../store/action/common";
import Pagination from "../../widgets/pagination/Pagination";
import { H3 } from "../../shared/typography/Typogrpahy";

const Explore = () => {
  const rightDrawer = useSelector(state => state.common.rightDrawer);
  const dispatch = useDispatch();
  function handleRightPaneOpen(event) {
    dispatch(action.showRightDrawer({ open: true }));
  }
  function handleRightPaneClose() {
    dispatch(action.showRightDrawer({ open: false }));
  }
  return (
    <>
      <H3 className="heading">Search Vocabulary Words</H3>
      <div className="filters">

      </div>
      <div className="word-grid-container">
        {
          words?.map(word => <WordCard {...word} onClick={handleRightPaneOpen} />)
        }
      </div>
      <div className="pagination">
        <Pagination
          limit={20}
          paginationOptions={[20, 40, 60, 80, 100]}
          totalPage={10} />
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