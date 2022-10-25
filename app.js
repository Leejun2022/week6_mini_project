const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const passportConfig = require("./passport");
const cors = require("cors");
const app = express();
const port = 4000;
let corsOptions = {
  origin: "http://localhost:4000",
  origin: "http://localhost:3000",
  credentials: true,
};

const routes = require("./routes");
passportConfig();

app.use(cors(corsOptions));
app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: [process.env.KAKAO_SECRET],
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
app.use("/", routes);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});

