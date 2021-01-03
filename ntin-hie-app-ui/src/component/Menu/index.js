import React, { Fragment } from "react";
import Container from "@material-ui/core/Container";
import { useLocation } from "react-router-dom";
import water from "./water.png";
import food from "./food.png";
import pee from "./pee.png";
import shit from "./shit.png";
import userWeightPic from "./userWeight.png";
import background from "./background.png";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles({
  MenuHeader: {
    display: "flex",
    "justify-content": "space-around",
  },
  UserInfo: {
    marginTop: 10,
    paddingLeft: 10,
    border: "2px #8dc7f0 solid",
    "border-radius": "10px",
    background: "rgb(255, 255, 255, 1)",
    height: "50%",
    width: "67%",
    "font-size": "20px",
  },
  InputField: {
    display: "flex",
    "justify-content": "space-around",
    border: "2px #8dc7f0 solid",
    "border-radius": "10px",
    background: "rgb(255, 255, 255, 0)",
  },
  IO: {
    "font-size": "32px",
    "margin-top": "5px",
    "margin-bottom": "5px",
  },
  submit: {
    "margin-top": "18px",
  },
  background: {
    backgroundImage: `url(${background})`,
    "background-repeat": "no-repeat",
    "background-size": "cover",
    height: "100vh",
    "padding-top": "20px",
  },
  logoWord: {
    "margin-top": "5px",
    "margin-bottom": "5px",
    "font-size": "20px",
  },
});

const Menu = () => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const [user, id] = [useQuery().get("user"), useQuery().get("id")];
  const history = useHistory();

  const classes = useStyles();
  return (
    <Fragment>
      <Container maxWidth="sm" className={classes.background}>
        <div className={classes.MenuHeader}>
          <div className={classes.UserInfo}>
            <p>姓名 : {user}</p>
            <p>病例號 : {id}</p>
          </div>
          <LogoAndText
            src={userWeightPic}
            text="輸入體重"
            onClick={() => {
              history.push(`/UserWeight?user=${user}&id=${id}`);
            }}
          />
        </div>

        <p className={classes.IO}>攝入</p>
        <div className={classes.InputField}>
          <LogoAndText
            className="FirstIcon"
            src={water}
            text="輸入飲水"
            onClick={() => {
              history.push(`/WaterInput?user=${user}&id=${id}`);
            }}
          />
          <LogoAndText
            src={food}
            text="輸入飲食"
            onClick={() => {
              history.push(`/FoodInput?user=${user}&id=${id}`);
            }}
          />
        </div>

        <p className={classes.IO}>攝出</p>
        <div className={classes.InputField}>
          <LogoAndText
            className="FirstIcon"
            src={pee}
            text="輸入排尿"
            onClick={() => {
              history.push(`/PeeOutput?user=${user}&id=${id}`);
            }}
          />
          <LogoAndText
            src={shit}
            text="輸入排泄"
            onClick={() => {
              history.push(`/ShitOutput?user=${user}&id=${id}`);
            }}
          />
        </div>
        <div className={classes.submit}>
          <ColorButton
            variant="contained"
            color="primary"
            onClick={() => {
              history.push(`/History?user=${user}&id=${id}`);
            }}
          >
            歷史紀錄
          </ColorButton>
        </div>
      </Container>
    </Fragment>
  );
};

const LogoAndText = (props) => {
  const { src, text, onClick } = props;
  const classes = useStyles();
  return (
    <Button onClick={onClick}>
      <div>
        <img src={src} alt="img" />
        <p className={classes.logoWord}>{text}</p>
      </div>
    </Button>
  );
};
export default Menu;
