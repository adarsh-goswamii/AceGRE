import { useState } from "react";
import Drawer from '@material-ui/core/Drawer';
import { useCallback, useEffect } from 'react';
import "./RightDrawer.scss";

const RightDrawer = ({
  children, 
  className, 
  open, 
  setOpen
}) => {

  useEffect(() => {
    window.addEventListener("click", closeDrawer);
    return () => window.removeEventListener("click", closeDrawer);
  }, []);

  const closeDrawer = useCallback((event) => {
    if(event?.target?.classList?.contains("MuiBackdrop-root")) {
      setOpen(false);
    }
  }, []);

  return (
      <Drawer anchor={"right"} open={open} onClose={()=> {}} >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est culpa enim commodi beatae, similique animi voluptatum tempore incidunt consequatur odio esse quod voluptatibus in aliquid ea obcaecati blanditiis laborum magnam.
      </Drawer>
  );
};

export default RightDrawer;