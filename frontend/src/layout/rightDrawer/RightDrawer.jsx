import { Drawer, ClickAwayListener } from "@material-ui/core";
import "./RightDrawer.scss";
import { useDispatch, useSelector } from "react-redux";
import { showRightDrawer } from "../../store/action/common";

const RightDrawer = () => {
  const dispatch = useDispatch();
  const {
    open,
    children,
    width = "500px",
  } = useSelector((state) => state.common.rightDrawer);

  const closeDrawer = () => {
    dispatch(showRightDrawer({ open: false, children: null }));
  };

  return (
    <Drawer anchor={"right"} open={open}>
      <ClickAwayListener onClickAway={closeDrawer}>
        <div>{children}</div>
      </ClickAwayListener>
    </Drawer>
  );
};

export default RightDrawer;
