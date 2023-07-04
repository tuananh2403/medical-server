const express = require("express");

const initRoutes = require("./routes");
// const cookieParser = require("cookie-parser");
const dbConnect = require("./config/dbconnect");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "DELETE"],
  })
);
// app.use(cookieParser());
const port = 8888;
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

dbConnect();
initRoutes(app);
app.use("/", (req, res) => {
  res.send("TRan tuan anh");
});

app.listen(port, () => {
  console.log(port);
});
