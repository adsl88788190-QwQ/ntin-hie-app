import React, { Fragment, useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

const DetailPage = () => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const history = useHistory();
  const [user, id] = [useQuery().get("user"), useQuery().get("id")];
  const DetailHistory = () => {
    const list = [];
    let detailData = useLocation().state;
    for (let time in detailData) {
      console.log(detailData[time]);
      for (let item of detailData[time]) {
        //   console.log(item);
        const itemValue = Object.keys(item)[0];
        const weidhtValue = item[itemValue];
        list.push(
          <div className="UserInfo">
            <p>項目: {itemValue}</p>
            <p>重量:{weidhtValue}</p>
          </div>
        );
      }
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
      <DetailHistory />
    </Container>
  );
};
export default DetailPage;
