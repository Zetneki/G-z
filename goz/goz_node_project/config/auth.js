const jwt = require("jsonwebtoken");
const jwtSecret =
  "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTczMTA2NzQyMCwiaWF0IjoxNzMxMDY3NDIwfQ.enkSR_AC4iqXhvNbHplcgYRA3Attuzw6hhytHlEHMus";

// INFO: middleware, hogy be van jelentkezve-e, error kezeles
userAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        req.flash("error", "Ehhez nincs jogod!");
        return res.redirect("/");
      } else {
        // NOTE: player vagy admin lehet csak, de valamelyiknek kell lennie, egyebkent errort dob
        if (decodedToken.role !== "player" && decodedToken.role !== "admin") {
          req.flash("error", "Ehhez nincs jogod!");
          return res.redirect("/");
        } else {
          next();
        }
      }
    });
  } else {
    req.flash("error", "Ehhez nincs jogod!");
    return res.redirect("/");
  }
};

// INFO: middleware, hogy admin-e, error kezeles
adminAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        req.flash("error", "Ehhez nincs jogod!");
        return res.redirect("/");
      } else {
        // NOTE: admin lehet csak, egyebkent errort dob
        if (decodedToken.role !== "admin") {
          req.flash("error", "Ehhez nincs jogod!");
          return res.redirect("/");
        } else {
          next();
        }
      }
    });
  } else {
    req.flash("error", "Ehhez nincs jogod!");
    return res.redirect("/");
  }
};

module.exports = {
  jwtSecret,
  userAuth,
  adminAuth,
};
