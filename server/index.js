const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const fs = require("fs");

const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();
  app.use(bodyParser.json()); // to support JSON-encoded bodies
  app.use(
    bodyParser.urlencoded({
      // to support URL-encoded bodies
      extended: true,
    })
  );
  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, "../ntin-hie-app-ui/build")));

  // Answer API requests.
  app.get("/api", function (req, res) {
    res.set("Content-Type", "application/json");
    res.send('{"message":"Hello from the custom server!"}');
  });
  //Recive the user info
  app.post("/userData", (req, res) => {
    console.log("Got body:", req.body);
    writeUserInfo(req.body);
    // console.log("Got body:", req.body);
    res.sendStatus(200);
  });
  //Get User Data
  app.get("/userData", (req, res) => {
    const { id } = req.query;
    const path = `${id}.json`;
    let data = {};

    // console.log(id);
    try {
      if (fs.existsSync(path)) {
        const file = fs.readFileSync(path);
        data = JSON.parse(file);
      }
      res.send(data);
    } catch (err) {
      console.error(err);
      res.send({});
    }
  });

  //Recive the user weight
  app.post("/userWeight", (req, res) => {
    console.log("Got body:", req.body);
    writeUserWeight(req.body);
    res.sendStatus(200);
  });
  //Get the user weight
  app.get("/userWeight", (req, res) => {
    const { id } = req.query;
    const path = `${id}Weight.json`;
    let data = {};
    try {
      if (fs.existsSync(path)) {
        const file = fs.readFileSync(path);
        data = JSON.parse(file);
      }
      res.send(data);
    } catch (err) {
      console.error(err);
      res.send({});
    }
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get("*", function (request, response) {
    response.sendFile(
      path.resolve(__dirname, "../react-ui/build", "index.html")
    );
  });

  app.listen(PORT, function () {
    console.error(
      `Node ${
        isDev ? "dev server" : "cluster worker " + process.pid
      }: listening on port ${PORT}`
    );
  });
}

function writeUserInfo({ id, date, item, number }) {
  const path = `${id}.json`;
  const [yyyymmdd, hhmm] = date.split("T");
  try {
    let data = {};
    if (fs.existsSync(path)) {
      console.log("exist");
      const file = fs.readFileSync(path);
      data = JSON.parse(file);
      data[yyyymmdd] = data[yyyymmdd] || {};
      data[yyyymmdd][hhmm] = data[yyyymmdd][hhmm] || [];
      data[yyyymmdd][hhmm].push({ [item]: number });
    } else {
      data = {
        [yyyymmdd]: {
          [hhmm]: [{ [item]: number }],
        },
      };
    }
    fs.writeFile(path, JSON.stringify(data), function (err) {
      if (err) console.log(err);
      else console.log("Write operation complete.");
    });
  } catch (err) {
    console.error(err);
  }
}

function writeUserWeight({ id, date, weight }) {
  const path = `${id}Weight.json`;
  const yyyymmdd = date.split("T")[0];

  try {
    let data = {};
    if (fs.existsSync(path)) {
      console.log("exist");
      const file = fs.readFileSync(path);
      data = JSON.parse(file);
    }
    data[yyyymmdd] = weight;
    fs.writeFile(path, JSON.stringify(data), function (err) {
      if (err) console.log(err);
      else console.log("Write operation complete.");
    });
  } catch (err) {
    console.error(err);
  }
}
