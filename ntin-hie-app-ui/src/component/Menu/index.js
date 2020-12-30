import React, { Fragment, useState } from "react";
import Container from "@material-ui/core/Container";
import { useLocation } from "react-router-dom";
import water from "./water.png";
import food from "./food.png";
import pee from "./pee.png";
import shit from "./shit.png";
import Button from "@material-ui/core/Button";
import "./index.css";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";

const ColorButton = withStyles((theme) => ({
  root: {
    margin: "0 30%",
    fontSize: 18,
    "font-weight": "bold",
    color: "#000000",
    backgroundColor: "#8DC7F0",
    "&:hover": {
      backgroundColor: "#8DC7F0",
    },
  },
}))(Button);

const Menu = () => {
  const useQuery = () => {
    console.log(useLocation());
    return new URLSearchParams(useLocation().search);
  };
  const history = useHistory();
  const [user, id] = [useQuery().get("user"), useQuery().get("id")];
  return (
    <Fragment>
      <Container maxWidth="sm" className="menu_container">
        <div className="MenuHeader">
          <div className="UserInfo">
            <p>姓名 {user}</p>
            <p>病例號: {id}</p>
          </div>
          <TextField
            id="item"
            label="體重："
            margin="dense"
            //   value={item}
            //   onChange={(e) => setItem(e.target.value)}
          />
        </div>

        <p className="IO">攝入</p>
        <div className="InputField">
          <LogoAndText
            className="FirstIcon"
            src={water}
            text="輸入飲水"
            onClick={() => {
              history.push(`/UserInput?user=${user}&id=${id}`);
            }}
          />
          <LogoAndText src={food} text="輸入飲食" />
        </div>

        <p className="IO">攝出</p>
        <div className="InputField">
          <LogoAndText className="FirstIcon" src={pee} text="輸入排尿" />
          <LogoAndText src={pee} text="輸入排泄" />
        </div>
        <div>
          <ColorButton variant="contained" color="primary" onClick={() => {}}>
            歷史紀錄
          </ColorButton>
        </div>
      </Container>
    </Fragment>
  );
};

const LogoAndText = (props) => {
  const { src, text, className, onClick } = props;

  return (
    <Button onClick={onClick}>
      <div className={className}>
        <img className="Logo" src={src} />
        <p>{text}</p>
      </div>
    </Button>
  );
};
export default Menu;
