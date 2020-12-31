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
    console.log(useLocation());
    return new URLSearchParams(useLocation().search);
  };
  const history = useHistory();
  const [user, id] = [useQuery().get("user"), useQuery().get("id")];
  const [userData, setUserData] = useState({});
  useEffect(async () => {
    const response = await fetch(`/userData?id=${id}`);
    const result = await response.json();
    setUserData(result);
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
      console.log(date);
      //   for (let time in userData[date]) {
      list.push(
        <div key={date}>
          <WidthButton>
            <div className="UserInfo">
              <p>日期: {date}</p>
              {/* <p>時間: {time}</p> */}
            </div>
          </WidthButton>
        </div>
      );
      //   }
    }
    // return <div></div>;
    return <div className="UserHistory">{list}</div>;
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
