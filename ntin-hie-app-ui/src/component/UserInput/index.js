import React, { Fragment, useState } from "react";
import water from "./water.png";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import "./index.css";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
const ColorButton = withStyles((theme) => ({
  root: {
    // margin: "0 auto",
    width: "25%",
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
  const [item, setItem] = useState("");
  const [grams, setGrams] = useState("");
  const [selectedDate, handleDateChange] = useState(new Date());
  const [user, id] = [useQuery().get("user"), useQuery().get("id")];

  return (
    <React.Fragment>
      <Container maxWidth="sm" className="container">
        <div className="Header">
          <img className="Logo" src={water} />
          <p>輸入飲水</p>
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
            defaultValue="2020-12-24T10:30"
          />
        </div>
        <div className="Card">
          <TextField
            id="item"
            label="品項："
            margin="dense"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>

        <div className="Card">
          <Input
            id="grams"
            type="number"
            margin="dense"
            value={grams}
            onChange={(e) => setGrams(e.target.value)}
            endAdornment={<InputAdornment position="end">公克</InputAdornment>}
          />
        </div>

        <div className="Submit">
          <ColorButton size="large" variant="contained">
            輸入
          </ColorButton>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default InputUI;
