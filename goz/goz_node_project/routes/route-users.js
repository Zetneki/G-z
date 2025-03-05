const UserDAO = require("./../dao/user-dao.js");
const userDAO = new UserDAO();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = require("./../config/auth.js"); // INFO: ezt a sort ne piszkald, ha mashogy kapja nem mukodik
const router = express.Router();

/**
 *  ebben a fileban a session kezeleshez a 13. sortol van pontosabb leiras, a tobbihez nem irom ki mert kb copy paste
 *  ezen kivul, ha valahol kellene eldonteni, hogy user vagy admin lephet be csak arra az auth.js-ben van middleware
 */

router.get("/register", async (req, res) => {
  // NOTE: regisztracios get metodus
  const token = req.cookies.jwt;
  var current_role;
  var current_username;

  // NOTE: token (session) kezeles
  if (token) {
    jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
      if (err) {
        // NOTE: ha nincs token cookieba akkor visszamegy
        console.log(err);
        return res.redirect("/");
      }
      // NOTE: ide lehet tenni, hogy miket akartok kiszedni a tokenbol, az hogy miket lehet, a /loginuser post-ban van atadva, lehet boviteni
      current_username = decodedToken.username;
      current_role = decodedToken.role;
    });
    return res.redirect("/"); // NOTE: ide visz ha kesz a regisztracio, lehet valtoztatni, ha nem tetszik
  }
  return res.render("register", {
    // NOTE: itt lehet atadni az ejs-ben hasznalatos valtozokat
    current_role: current_role,
    current_username: current_username,
  });
});

router.get("/login", async (req, res) => {
  // NOTE: login get metodus, mukodese fentebb olvashato
  const token = req.cookies.jwt;
  var current_role;
  var current_username;

  if (token) {
    jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
      if (err) {
        console.log(err);
        return res.redirect("/");
      }
      current_username = decodedToken.username;
      current_role = decodedToken.role;
    });
    return res.redirect("/");
  }
  return res.render("login", {
    current_role: current_role,
  });
});

router.post("/loginuser", async (req, res) => {
  // NOTE: ezek az inputok a formban (name)
  let { username } = req.body;
  let { password } = req.body;

  // NOTE: username alapjan query az adatbazisban
  const user = await new UserDAO().getUserByUsername(username);

  if (!user) {
    // NOTE: ha nem talalt usert a nevvel error

    req.flash("error", "Felhasználó nem található");
    return res.redirect("/login");
  } else {
    req.session.userID = user.id;
    const result = await bcrypt.compare(password, user.password);
    // NOTE: jelszok megegyeznek-e (form, db)
    if (result) {
      const token = jwt.sign(
        {
          // NOTE: ITT lehet atadni a tokennek session valtozokat
          id: user.userid,
          username,
          role: user.role,
          profilepicture: user.profilepicture,
        },
        jwtSecret.jwtSecret
      );
      res.cookie("jwt", token, {
        httpOnly: true,
      });

      await userDAO.updateUserStatus(username, "active");

      return res.redirect("/");
    } else {
      req.flash("error", "Helytelen jelszó");
      return res.redirect("/login");
    }
  }
});

router.post("/registeruser", async (req, res) => {
  // NOTE: formbol inputok bekerese (name)
  let { regemail, regpassword, regpasswordconfirm, regusername } = req.body;
  let role = "player"; // NOTE: role mindig player alapbol

  // Jelszó ellenőrzések
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/; // Legalább egy nagybetű, egy szám és minimum 8 karakter

  if (regpassword !== regpasswordconfirm) {
    req.flash("error", "A jelszavak nem egyeznek.");
    return res.redirect("/register");
  }

  if (!passwordRegex.test(regpassword)) {
    req.flash("error", "A jelszónak tartalmaznia kell legalább egy nagybetűt és egy számot, és legalább 8 karakter hosszúnak kell lennie.");
    return res.redirect("/register");
  }

  try {
    // Ellenőrizni kell, hogy a felhasználónév vagy email már létezik-e
    const existingUserByUsername = await userDAO.getUserByUsername(regusername);
    const existingUserByEmail = await userDAO.getUserByEmail(regemail);

    if (existingUserByUsername) {
      req.flash("error", "A felhasználónév már foglalt.");
      return res.redirect("/register");
    }

    if (existingUserByEmail) {
      req.flash("error", "Az email cím már foglalt.");
      return res.redirect("/register");
    }

    // NOTE: jelszó hash-elés
    bcrypt.hash(regpassword, 10).then(async (hash) => {
      // NOTE: user insert query a createUser-ben
      await userDAO.createUser(regusername, hash, role, regemail);
      return res.redirect("/"); // Sikeres regisztráció után átirányítás
    });
  } catch (error) {
    console.error("Hiba a regisztráció során:", error);
    req.flash(
      "error",
      "Hiba történt a regisztráció során. Próbáld újra később."
    );
    return res.redirect("/register");
  }
});

router.get("/logout", async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, jwtSecret.jwtSecret, async (err, decodedToken) => {
      if (!err) {
        // Frissítjük a státuszt "inactive"-ra
        await userDAO.updateUserStatus(decodedToken.username, "inactive");
      } else {
        req.flash("error", "Valami hiba történt");
        return res.redirect("/register");
      }
    });
  }
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
});

module.exports = router;
