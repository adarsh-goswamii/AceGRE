import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
import Button from "./components/shared/button/Button";
import { ThemeProvider, Typography } from "@material-ui/core";
import theme from "./styles/theme";
import InputField from "./components/shared/inputField/InputField";
import {
  Body,
  H1,
  H3,
  Heading,
} from "./components/shared/typography/Typogrpahy";
import Popover from "./components/shared/popover/Popover";
import Modal from "./components/shared/modal/Modal";
import Paper from "./components/shared/paper/Paper";
import Header from "./layout/header/Header";
const Index = () => {
  const [btnState, setBtnState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div style={{ padding: "100px", background: "#eeeeee" }}>
        <Button
          id={"sample"}
          fullWidth={false}
          className="rounded-btn"
          variant="outlined"
          onClick={(event) => {
            setBtnState((prev) => !prev);
            // setAnchorEl(event.currentTarget)
          }}
        >
          Click me
        </Button>
        <div style={{ height: "10px", width: "100%" }}></div>
        <InputField
          label="Type Something"
          value={"Some random value"}
          onChange={() => {}}
          type="text"
        />
        <div style={{ height: "10px", width: "100%" }}></div>
        <Modal open={btnState} toggleState={setBtnState}>
          <Paper className={"modal-paper"}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              aperiam accusamus ipsam repudiandae placeat quod nulla consectetur
              molestiae, amet maiores ipsum officiis facere odit, optio itaque
              obcaecati cum illum reprehenderit!
            </p>
          </Paper>
        </Modal>
      </div>
    </ThemeProvider>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
