const express = require("express");
const app = express();
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 8080;
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./config/auth");
const session = require("express-session");
const flash = require("connect-flash");

// INFO: static path beallitasok
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "dao")));
app.use("/Uploads", express.static("Uploads"));
app.set("views", path.join(__dirname, "views"));

app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());

app.use(
  session({
    secret: jwtSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Állítsd true-ra, ha HTTPS-t használsz
  })
);

//INFO: ennek el kene innen kerulnie, ez felel a tul hosszu nev megjeleniteseert
app.use((req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
      } else {
        res.locals.user = decodedToken;
        var name = res.locals.user.username;
        res.locals.shortenedName =
          name.length > 12 ? name.slice(0, 12) + "..." : name;
        req.session.userID = decodedToken.id;
      }
      next();
    });
  } else {
    res.locals.user = null;
    next();
  }
});

// INFO: majd elkerul innnen, ez felel az errorkezelesert ne piszkald
app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  next();
});

// INFO: router importok
const routeStore = require("./routes/route-store");
const routeLibrary = require("./routes/route-library");
const routeUsers = require("./routes/route-users");
const routeFriends = require("./routes/route-friends");
const routeProfile = require("./routes/route-profile");
const routeMessages = require("./routes/route-messages");
const routeForum = require("./routes/route-forum");

app.use(routeForum);
app.use(routeStore);
app.use(routeLibrary);
app.use(routeUsers);
app.use(routeFriends);
app.use(routeProfile);
app.use(routeMessages);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
