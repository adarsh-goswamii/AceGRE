import { useState } from "react";
import {Drawer, ClickAwayListener} from '@material-ui/core';
import { useCallback, useEffect } from 'react';
import "./RightDrawer.scss";

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

// open necessary