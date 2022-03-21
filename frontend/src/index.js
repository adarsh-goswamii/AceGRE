import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import Button from './components/shared/button/Button';
import { ThemeProvider, Typography } from '@material-ui/core';
import theme from './styles/theme';
import InputField from './components/shared/inputField/InputField';
import { Body, H1, H3, Heading } from './components/shared/typography/H1';

const Index = () => {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: '100px', background: '#eeeeee' }}>
        <Button fullWidth={false} variant="contained">
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
        <H1>Hello World! H1</H1>
        <H3 variant="h3">Hello World! H3</H3>
        <Heading variant="body1">Hello World! Body1</Heading>
        <Body variant="body2">Hello World! Body2</Body>
      </div>
    </ThemeProvider>
  );
};

ReactDOM.render(
  <Index />, document.getElementById('root')
);