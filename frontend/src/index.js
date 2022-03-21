import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import Button from './components/shared/button/Button';
import { ThemeProvider, Typography } from '@material-ui/core';
import theme from './styles/theme';
import InputField from './components/shared/inputField/InputField';
import { Body, H1, H3, Heading } from './components/shared/typography/Typogrpahy';
import Popover from "./components/shared/popover/Popover";

const Index = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: '100px', background: '#eeeeee' }}>
        <Button
          id={"sample"}
          fullWidth={false} 
          variant="contained" 
          onClick={(event) => {
            console.log(event.currentTarget);
            setAnchorEl(event.currentTarget)
            }}>
          Click me
        </Button>
        <div style={{ height: "10px", width: "100%" }}></div>
        <InputField
          label="Type Something"
          value={"Some random value"}
          onChange={() => { }}
          type="text"
        />
        <div style={{ height: "10px", width: "100%" }}></div>
        <Popover id={"sample"} anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
          <div>
            <H1>Hello World! H1</H1>
            <H3 variant="h3">Hello World! H3</H3>
            <Heading variant="body1">Hello World! Body1</Heading>
            <Body variant="body2">Hello World! Body2</Body>
          </div>
        </Popover>
      </div>
    </ThemeProvider>
  );
};

ReactDOM.render(
  <Index />, document.getElementById('root')
);