import React from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import userData from "./userData.json";
const Scan = () => {
  const [data, setData] = React.useState("尚未讀取到資料");
  const [userInfo, setUserInfo] = React.useState({ user: "", id: "" });
  const [scanReady, setScanReady] = React.useState(false);
  const history = useHistory();
  return (
    <>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          const id = result && result.text;
          const user = userData[id] || "";
          if (user != "") {
            const info = `姓名 : ${user} 病例號 : ${id}`;
            setData(info);
            setUserInfo({ user, id });
            setScanReady(true);
          }
        }}
      />
      <p>{data}</p>
      <Button
        variant="contained"
        color="primary"
        disabled={!scanReady}
        onClick={() => {
          const { user, id } = userInfo;
          history.push(`/UserInput?user=${user}&id=${id}`);
        }}
      >
        確認身份
      </Button>
    </>
  );
};

export default Scan;
