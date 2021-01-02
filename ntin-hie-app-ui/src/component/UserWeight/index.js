import moment from "moment";
import React, { Fragment, useState } from "react";
import userWeight from "./userWeight.png";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import "./index.css";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
const ColorButton = withStyles((theme) => ({
  root: {
    // margin: "0 auto",
    fontSize: 18,
    "font-weight": "bold",
    color: "#000000",
    backgroundColor: "#ff8000",
    "&:hover": {
      backgroundColor: "#ff8000",
    },
  },
}))(Button);

const useQuery = () => {
  console.log(useLocation());
  return new URLSearchParams(useLocation().search);
};
const InputUI = () => {
  const [grams, setGrams] = useState("");
  const [selectedDate, handleDateChange] = useState(
    moment().format("YYYY-MM-DD[T]hh:mm")
  );
  const [user, id] = [useQuery().get("user"), useQuery().get("id")];
  const history = useHistory();

  const InputReady = () => {
    if (grams == "") {
      alert("體重沒有填");
      return false;
    }
    return true;
  };
  const sendRequest = () => {
    if (!InputReady) {
      return;
    }
    fetch("/userWeight", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        date: selectedDate,
        item: "體重",
        weight: parseInt(grams),
      }),
    }).then(() => {
      history.push(`/Menu?user=${user}&id=${id}`);
    });
  };
  return (
    <Fragment>
      <Container maxWidth="sm" className="container">
        <div className="Header">
          <img className="Logo" src={userWeight} />
          <p>輸入體重</p>
        </div>

        <div className="Card">
          <p>姓名 {user}</p>
          <p>病例號: {id}</p>
        </div>

        <div className="Card">
          <TextField
            id="datetime-local"
            label="日期與時間"
            type="datetime-local"
            defaultValue={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>

        <div className="Card">
          <Input
            id="grams"
            type="number"
            margin="dense"
            value={grams}
            onChange={(e) => setGrams(e.target.value)}
            endAdornment={<InputAdornment position="end">公斤</InputAdornment>}
          />
        </div>

        <div className="Submit">
          <ColorButton size="large" variant="contained" onClick={sendRequest}>
            輸入
          </ColorButton>
        </div>
      </Container>
    </Fragment>
  );
};

export default InputUI;
