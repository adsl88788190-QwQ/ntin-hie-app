import React, { Fragment, useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./index.css";

import { withStyles } from "@material-ui/core/styles";
const WidthButton = withStyles((theme) => ({
  root: {
    width: "50vh",
  },
}))(Button);

const History = () => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const history = useHistory();
  const [user, id] = [useQuery().get("user"), useQuery().get("id")];
  const [userData, setUserData] = useState({});
  const [userWeight, setUserWeight] = useState({});
  useEffect(async () => {
    const response = await fetch(`/userData?id=${id}`);
    const result = await response.json();
    setUserData(result);

    const weightresp = await fetch(`/userWeight?id=${id}`);
    const weightResult = await weightresp.json();
    setUserWeight(weightResult);
  }, []);

  const getDate = () => {
    return Object.keys(userData);
  };
  const getTime = (date) => {
    if (date) {
      return Object.keys(userData[date]);
    }
    return "";
  };

  const UserHistory = () => {
    const list = [];
    for (let date in userData) {
      //   for (let time in userData[date]) {
      const { userInput, userOutput, userTotal } = getUserIO(userData[date]);

      list.push(
        <div key={date}>
          <WidthButton onClick={() => openDetailPage(userData[date])}>
            <div className="UserInfo">
              <p>日期: {date}</p>
              <p>使用者當日輸入: {userInput} (單位:克)</p>
              <p>使用者當日輸出: {Math.abs(userOutput)}(單位:毫升)</p>
              <p>使用者當日計算: {userTotal} (單位:克,毫升)</p>
              <p>
                使用者當日體重:{userWeight[date] || "當日無輸入"} (單位:公斤)
              </p>
            </div>
          </WidthButton>
        </div>
      );
      //   }
    }
    // return <div></div>;
    return <div className="UserHistory">{list}</div>;
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
    <Container maxWidth="sm" className="menu_container">
      <div className="MenuHeader">
        <div className="HistoryUserInfo">
          <p>姓名 : {user}</p>
          <p>病例號: {id}</p>
        </div>
      </div>
      <UserHistory></UserHistory>
    </Container>
  );
};

export default History;
