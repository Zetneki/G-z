const express = require("express");
const router = express.Router();
const LibraryDAO = require("../dao/library-dao");
const StoreDAO = require("../dao/store-dao");
const UserDAO = require("../dao/user-dao");
const jwt = require("jsonwebtoken");
const { userAuth, adminAuth, jwtSecret } = require("./../config/auth.js"); // INFO: ezen belul a jwtSecret-et ne szedd ki, ne hivd meg mashogy mert nem fog mukodni

router.get("/library", userAuth, async (req, res) => {
  const token = req.cookies.jwt;
  var current_username;
  var current_userid;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        current_username = decodedToken.username;
        current_userid = decodedToken.id;
      }
    });
  }

  let usergames = await new LibraryDAO().getAllGamesByUserID(current_userid);
  if (!usergames || usergames.length === 0) {
    res.redirect("/library/-1");
  } else {
    res.redirect(`/library/${usergames[0].gameid}`);
  }
});

router.get("/library/:id", async (req, res) => {
  const token = req.cookies.jwt;
  var current_userid;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        current_userid = decodedToken.id;
      }
    });
  }

  let id = req.params.id;

  if (id == -1) return res.render("library", { empty: true });

  let game = await new StoreDAO().getGameById(id);

  let status = await new LibraryDAO().getStatusById(id, current_userid);
  const usergames = await new LibraryDAO().getAllGamesByUserID(current_userid);
  let talalt = false;
  for (const usergame of usergames) {
    if (usergame.gameid == id) {
      talalt = true;
      break;
    }
  }
  if (!talalt) {
    return res.redirect(
      usergames.length > 0 ? `/library/${usergames[0].gameid}` : "/library/-1"
    );
  }
  return res.render("library", {
    usergames,
    current_userid: current_userid,
    game: game,
    status,
    empty: false,
  });
});

router.post("/library/add", async (req, res) => {
  const libraryDAO = new LibraryDAO();

  // NOTE: formban inputok bekeres (name)
  let { userid } = req.body;
  let { gameid } = req.body;

  await libraryDAO.addGameToLibrary(userid, gameid, "owned");
  return res.redirect("/");
});

router.post("/library/complete", userAuth, async (req, res) => {
  const token = req.cookies.jwt;
  var current_userid;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        current_userid = decodedToken.id;
      }
    });
  }
  const { gameid } = req.body;
  await new LibraryDAO().updateGameStatus(current_userid, gameid, "completed");
  res.redirect(`/library/${gameid}`);
});

router.post("/library/remove", async (req, res) => {
  const token = req.cookies.jwt;
  var current_userid;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        current_userid = decodedToken.id;
      }
    });
  }

  const libraryDAO = new LibraryDAO();

  let { gameid } = req.body;

  await libraryDAO.removeGameFromLibrary(current_userid, gameid);
  return res.redirect("/library");
});

module.exports = router;
