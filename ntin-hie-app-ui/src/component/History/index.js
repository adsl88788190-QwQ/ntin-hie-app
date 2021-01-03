import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import background from "./background.png";

const WidthButton = withStyles((theme) => ({
  root: {
    // width: "50vh",
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
  },
  CardWrap: {
    display: "flex",
    "justify-content": "center",
    marginTop: 20,
  },
  Date: {
    fontSize: 22,
  },
});

const History = () => {
  const classes = useStyles();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const history = useHistory();
  const [user, id] = [useQuery().get("user"), useQuery().get("id")];
  const [userData, setUserData] = useState({});
  const [userWeight, setUserWeight] = useState({});
  useEffect(() => {
    async function getUserData() {
      const response = await fetch(`/userData?id=${id}`);
      const result = await response.json();
      setUserData(result);

      const weightresp = await fetch(`/userWeight?id=${id}`);
      const weightResult = await weightresp.json();
      setUserWeight(weightResult);
    }
    getUserData();
  }, []);

  const UserHistory = () => {
    const list = [];
    for (let date in userData) {
      const { userInput, userOutput, userTotal } = getUserIO(userData[date]);

      list.push(
        <div className={classes.CardWrap}>
          <div key={date} className={classes.Card}>
            <WidthButton onClick={() => openDetailPage(userData[date])}>
              <div>
                <p>日期: {date}</p>
                <p>使用者當日輸入: + {userInput} (單位:克,毫升)</p>
                <p>使用者當日輸出: - {Math.abs(userOutput)}(單位:克,毫升)</p>
                <p>
                  使用者當日計算: {userTotal >= 0 ? "+" : ""}
                  {userTotal} (單位:克,毫升)
                </p>
                <p>
                  使用者當日體重: {userWeight[date] || "當日無輸入"} (單位:公斤)
                </p>
              </div>
            </WidthButton>
          </div>
        </div>
      );
    }

    return <div>{list}</div>;
  };

  const getUserIO = (data) => {
    let userInput = 0;
    let userOutput = 0;
    let userTotal = 0;
    for (let time in data) {
      for (let item of data[time]) {
        //   console.log(item);
        const itemValue = Object.keys(item)[0];
        const weidhtValue = item[itemValue];
        if (weidhtValue >= 0) {
          userInput += weidhtValue;
        } else {
          userOutput += weidhtValue;
        }
      }
    }
    userTotal = userInput + userOutput;
    return {
      userInput,
      userOutput,
      userTotal,
    };
  };
  const openDetailPage = (data) => {
    // console.log(data);
    history.push(`/DetailPage?user=${user}&id=${id}`, data);
  };

  return (
    <Container maxWidth="sm" className={classes.background}>
      <div className={classes.UserInfo}>
        <p>姓名 : {user}</p>
        <p>病例號: {id}</p>
      </div>

      <UserHistory></UserHistory>
    </Container>
  );
};

export default History;
