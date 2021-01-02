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
      for (let item of detailData[time]) {
        const itemValue = Object.keys(item)[0];
        const weidhtValue = Math.abs(item[itemValue]);
        const displayWord = item[itemValue] >= 0 ? "克" : "毫升";
        const displayIcon = item[itemValue] >= 0 ? "+" : "-";
        list.push(
          <div className="UserInfo">
            <p>項目: {itemValue}</p>
            <p>
              重量: {displayIcon}
              {weidhtValue}
              {displayWord}
            </p>
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
