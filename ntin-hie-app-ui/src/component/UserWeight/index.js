import moment from "moment";
import React, { Fragment, useState } from "react";
import userWeight from "./userWeight.png";
import background from "./background.png";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useLocation } from "react-router-dom";
const ColorButton = withStyles((theme) => ({
  root: {
    fontSize: 18,
    "font-weight": "bold",
    color: "#000000",
    backgroundColor: "#ff8000",
    "&:hover": {
      backgroundColor: "#ff8000",
    },
  },
}))(Button);

const useStyles = makeStyles({
  background: {
    backgroundImage: `url(${background})`,
    "background-repeat": "no-repeat",
    "background-size": "cover",
    height: "100vh",
    "padding-top": "20px",
  },
  InputHeader: {
    display: "flex",
    "justify-content": "center",
    "font-size": "42px",
  },
  InputLogo: {
    width: "120px",
    height: "110px",
  },
  InputWord: {
    "margin-top": "30px",
    "margin-left": "10px",
  },
  Card: {
    border: "5px hsl(30, 100%, 50%) solid",
    "border-radius": "10px",
    background: "rgb(255, 174, 87, 0.3)",
    "font-size": "24px",
    width: "90%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  CardWrap: {
    display: "flex",
    "justify-content": "center",
    marginTop: 20,
  },
  PaddingField: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  InputField: {
    width: "90%",
  },
});

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
    if (grams === "") {
      alert("體重沒有填");
      return false;
    }
    return true;
  };
  const sendRequest = () => {
    if (!InputReady()) {
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

  const classes = useStyles();
  return (
    <Fragment>
      <Container maxWidth="sm" className={classes.background}>
        <div className={classes.InputHeader}>
          <img
            className={classes.InputLogo}
            src={userWeight}
            alt="userWeight"
          />
          <p className={classes.InputWord}>輸入體重</p>
        </div>

        <div className={classes.CardWrap}>
          <div className={classes.Card}>
            <p> 姓名 :{user}</p>
            <p> 病例號: {id}</p>
          </div>
        </div>

        <div className={classes.CardWrap}>
          <div className={`${classes.Card} ${classes.PaddingField}`}>
            <TextField
              className={classes.InputField}
              id="datetime-local"
              label="日期與時間"
              type="datetime-local"
              defaultValue={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </div>
        </div>

        <div className={classes.CardWrap}>
          <div className={`${classes.Card} ${classes.PaddingField}`}>
            <Input
              className={classes.InputField}
              id="grams"
              type="number"
              margin="dense"
              value={grams}
              onChange={(e) => setGrams(e.target.value)}
              endAdornment={
                <InputAdornment position="end">公斤</InputAdornment>
              }
            />
          </div>
        </div>

        <div className={classes.CardWrap}>
          <ColorButton size="large" variant="contained" onClick={sendRequest}>
            輸入
          </ColorButton>
        </div>
      </Container>
    </Fragment>
  );
};

export default InputUI;
