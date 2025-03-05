const express = require("express");
const router = express.Router();
const StoreDAO = require("../dao/store-dao");
const jwt = require("jsonwebtoken");
const { userAuth, adminAuth, jwtSecret } = require("./../config/auth.js"); // INFO: ezen belul a jwtSecret-et ne szedd ki, ne hivd meg mashogy mert nem fog mukodni
const path = require("path");

/**
 * itt multerrel van megoldva a kepfeltoltes, egy az egyben lophato, file path-t allitsd at es kb ennyi
 * lentebb latni lehet, hogyan kell a kep nevet is lekerni a formbol
 */

const multer = require("multer"); // NOTE: file feltoltes multerrel
const { Store } = require("express-session");
const storage = multer.diskStorage({
  // NOTE: storage beallitas
  destination: (req, file, cb) => {
    cb(null, "Uploads/game_images"); // NOTE: ide lesznek rakva a feltoltott kepek
  },
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)), // NOTE: unique nevek minden filenak, hogy ne legyen kavarodas
});
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const storeDAO = new StoreDAO();
    const gamesByCategory = await storeDAO.getGamesByCategory();
    const games = await storeDAO.getGames();
    const token = req.cookies.jwt;
    var current_role;
    var current_username;

    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          console.log(err);
        } else {
          current_username = decodedToken.username;
          current_role = decodedToken.role;
        }
      });
    }

    return res.render("index", {
      games: games,
      gamesByCategory: gamesByCategory,
      current_role: current_role,
      current_username: current_username,
    });
  } catch (error) {
    console.error(error);
    req.flash("error", "Váratlan hiba történt");
    return res.redirect("/");
  }
});

router.get("/admin", adminAuth, async (req, res) => {
  const token = req.cookies.jwt;
  var current_role;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      current_role = decodedToken.role;
    });
  }
  return res.render("admin");
});

router.get("/game/:id", async (req, res) => {
  let id = req.params.id;
  let game = await new StoreDAO().getGameById(id);

  const token = req.cookies.jwt;
  var current_userid;
  var current_role;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        current_userid = decodedToken.id;
        current_role = decodedToken.role;
      }
    });
  }

  return res.render("game", {
    current_userid: current_userid,
    game: game,
    current_role: current_role,
  });
});

router.post("/game/add", upload.single("gameImage"), async (req, res) => {
  // NOTE: formban inputok bekeres (name)
  let { title } = req.body;
  let { developer } = req.body;
  let { publisher } = req.body;
  let { description } = req.body;
  let { category } = req.body;
  let { price } = req.body;
  let { releasedate } = req.body;
  let picture = req.file ? req.file.filename : null; // NOTE: ha valahogy nincs kep null lesz feltoltve

  // NOTE: INSERT query addGame-ben
  await new StoreDAO().addGame(
    title,
    developer,
    publisher,
    picture,
    releasedate,
    price,
    description,
    category
  );
  return res.redirect("/admin");
});

router.post("/game/edit/:id", upload.single("gameImage"), async (req, res) => {
  // NOTE: formban inputok bekeres (name)
  let id = req.params.id;
  let { title } = req.body;
  let { developer } = req.body;
  let { publisher } = req.body;
  let { description } = req.body;
  let { category } = req.body;
  let { price } = req.body;
  let { releasedate } = req.body;
  let picture = req.file ? req.file.filename : null; // NOTE: ha valahogy nincs kep null lesz feltoltve

  await new StoreDAO().updateGame(
    id,
    title,
    developer,
    publisher,
    picture,
    releasedate,
    price,
    description,
    category
  );
  return res.redirect("/");
});

router.post("/game/delete/:id", async (req, res) => {
  let id = req.params.id;
  await new StoreDAO().deleteGame(id);
  return res.redirect("/");
});

router.get("/game/edit/:id", adminAuth, async (req, res) => {
  let id = req.params.id;
  game = await new StoreDAO().getGameById(id);

  const date = new Date(game.releasedate);
  const formattedReleaseDate = date.toLocaleDateString("en-CA");

  return res.render("editgame", {
    game: game,
    formattedReleaseDate: formattedReleaseDate,
  });
});

module.exports = router;
