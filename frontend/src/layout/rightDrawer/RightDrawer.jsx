import { useState } from "react";
import {Drawer, ClickAwayListener} from '@material-ui/core';
import { useCallback, useEffect } from 'react';
import "./RightDrawer.scss";
import { PropTypes } from "prop-types";

const RightDrawer = ({
  children,
  className,
  open,
  setOpen,
  close, 
}) => {

  useEffect(() => {
    window.addEventListener("click", closeDrawer);
    return () => window.removeEventListener("click", closeDrawer);
  }, []);

  const closeDrawer = useCallback((event) => {
    if (event?.target?.classList?.contains("MuiBackdrop-root")) {
      setOpen(false);
    }
  }, []);

  return (
    <Drawer anchor={"right"} open={open} classes={{root: className }}>
      <ClickAwayListener onClickAway={close}>
        <div>
          {children}
        </div>
      </ClickAwayListener>
    </Drawer>
  );
};

export default RightDrawer;
RightDrawer.propTypes={
  //necesarry fields
  open: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  //optional field
  className:PropTypes.string,
  setOpen:PropTypes.func,
  close:PropTypes.bool
  };