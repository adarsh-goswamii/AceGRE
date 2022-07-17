import React from 'react';
import { IconButton as MuiIconButton } from '@material-ui/core';

const IconButton = ({children, ...rest}) => {
  return (
    <MuiIconButton {...rest}>
      {children}
    </MuiIconButton>
  )
};

export default IconButton;