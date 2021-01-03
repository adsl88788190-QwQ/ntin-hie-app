import React from "react";
import Container from "@material-ui/core/Container";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import background from "./background.png";
const useStyles = makeStyles({
  background: {
    backgroundImage: `url(${background})`,
    "background-repeat": "no-repeat",
    "background-size": "cover",
    height: "100vh",
    "padding-top": "20px",
  },
  UserInfo: {
    paddingLeft: 10,
    border: "5px rgb(229, 141, 145) solid",
    "border-radius": "10px",
    background: "rgb(255, 255, 255, 0)",
    width: "35%",
    "font-size": "20px",
  },
  Card: {
    display: "inline-grid",
    border: "5px rgb(229, 141, 145) dashed",
    "border-radius": "10px",
    background: "rgb(253,247,234, 0.3)",
    "font-size": "24px",
    width: "90%",
    paddingLeft: "5%",
    paddingRight: "5%",
    textAlign: "center",
  },
  CardWrap: {
    display: "flex",
    "justify-content": "center",
    marginTop: 20,
  },
});

const DetailPage = () => {
  const classes = useStyles();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const [user, id] = [useQuery().get("user"), useQuery().get("id")];
  const DetailHistory = () => {
    const list = [];
    let detailData = useLocation().state;
    for (let time in detailData) {
      for (let item of detailData[time]) {
        const itemValue = Object.keys(item)[0];
        const weidhtValue = Math.abs(item[itemValue]);
        const displayWord = item[itemValue] >= 0 ? "克" : "毫升";
        const displayIcon = item[itemValue] >= 0 ? "+" : "-";
        list.push(
          <div className={classes.CardWrap}>
            <div className={classes.Card}>
              <div>
                <p>時間: {time}</p>
                <p>項目: {itemValue}</p>
                <p>
                  重量: {displayIcon}
                  {weidhtValue}
                  {displayWord}
                </p>
              </div>
            </div>
          </div>
        );
      }
    }
    // return <div></div>;
    return <div>{list}</div>;
  };

  return (
    <Container maxWidth="sm" className={classes.background}>
      <div className={classes.UserInfo}>
        <p>姓名 : {user}</p>
        <p>病例號: {id}</p>
      </div>
      <DetailHistory />
    </Container>
  );
};
export default DetailPage;
