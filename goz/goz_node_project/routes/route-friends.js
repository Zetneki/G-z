const express = require("express");
const router = express.Router();
const FriendsDAO = require("../dao/friends-dao");
const jwt = require("jsonwebtoken");
const jwtSecret = require("./../config/auth.js"); // INFO: ezt a sort ne piszkald, ha mashogy kapja nem mukodik
const { userAuth, adminAuth } = require("./../config/auth.js");

// Route a barát hozzáadása után
router.post("/request_sent", async (req, res) => {
  const { userID, friendID, status } = req.body;

  const userIdParsed = parseInt(userID);
  const friendIdParsed = parseInt(friendID);

  const token = req.cookies.jwt;
  let current_username, current_role, current_userid;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, jwtSecret.jwtSecret);
      current_username = decodedToken.username;
      current_role = decodedToken.role;
      current_userid = decodedToken.id;
    } catch (err) {
      req.flash("error", "Váratlan hiba történt!");
      return res.redirect("/");
    }
  }

  try {
    const friendsDAO = new FriendsDAO();
    await friendsDAO.sendFriendRequest(userIdParsed, friendIdParsed, status); // Küldő felhasználó ID-ja
    return res.redirect("/friends");
  } catch (error) {
    req.flash("error", "Váratlan hiba történt!");
    return res.redirect("/");
  }
});

router.post("/accept_request", async (req, res) => {
  const { friendshipID } = req.body; // A barátfelkérés ID-ja

  const token = req.cookies.jwt;
  let current_userid;

  if (token) {
    jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
      if (err) {
        console.log(err);
        return res.redirect("/");
      }
      current_userid = decodedToken.id;
    });
  }

  try {
    const friendsDAO = new FriendsDAO();
    await friendsDAO.acceptFriendRequest(friendshipID); // A státusz frissítése
    return res.redirect("/friends"); // Vissza a barátok oldalra
  } catch (error) {
    console.error(error);
    req.flash("error", "Váratlan hiba történt!");
    return res.redirect("/");
  }
});

router.post("/delete_friend", async (req, res) => {
  const { friendID } = req.body; // A barát ID-ja (barát felhasználói ID-ja)

  const token = req.cookies.jwt;
  let current_userid;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, jwtSecret.jwtSecret);
      current_userid = decodedToken.id; // A session felhasználó ID-ja
    } catch (err) {
      req.flash("error", "Váratlan hiba történt!");
      return res.redirect("/");
    }
  }

  try {
    const friendsDAO = new FriendsDAO();
    await friendsDAO.removeFriend(current_userid, friendID); // A törlés végrehajtása
    return res.redirect("/friends"); // Vissza a barátok oldalra
  } catch (error) {
    req.flash("error", "Váratlan hiba történt!");
    return res.redirect("/");
  }
});

router.get("/friends", userAuth, async (req, res) => {
  const token = req.cookies.jwt;
  let current_username, current_role, current_userid;

  if (token) {
    jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
      if (err) {
        console.log(err);
        return res.redirect("/");
      }
      current_username = decodedToken.username;
      current_role = decodedToken.role;
      current_userid = decodedToken.id;
    });
  }

  try {
    const friendsDAO = new FriendsDAO();
    const usersBasedOnSearch = await friendsDAO.listUsersBasedOnSearch(
      "",
      current_userid
    );
    const pendingRequests = await friendsDAO.getPendingFriendRequests(
      current_userid
    );
    const acceptedFriends = await friendsDAO.getAcceptedFriends(current_userid); // Elfogadott barátok lekérése

    return res.render("friends", {
      pendingRequests: pendingRequests,
      usersBasedOnSearch: usersBasedOnSearch,
      sessionUserId: current_userid,
      sessionUsername: current_username,
      sessionUserRole: current_role,
      acceptedFriends: acceptedFriends, // Új adat
    });
  } catch (error) {
    req.flash("error", "Váratlan hiba történt!");
    return res.redirect("/");
  }
});

// Keresési route
router.get("/search", userAuth, async (req, res) => {
  const { username } = req.query; // A query paraméter (pl. ?username=john)
  const token = req.cookies.jwt;
  var current_userid;

  if (token) {
    jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
      if (err) {
        req.flash("error", "Váratlan hiba történt!");
        return res.redirect("/");
      }
      current_userid = decodedToken.id;
    });
  }

  try {
    const friendsDAO = new FriendsDAO();
    const usersBasedOnSearch = await friendsDAO.listUsersBasedOnSearch(
      username,
      current_userid
    );
    const pendingRequests = await friendsDAO.getPendingFriendRequests(
      current_userid
    );
    const acceptedFriends = await friendsDAO.getAcceptedFriends(current_userid); // Elfogadott barátok lekérése

    return res.render("friends", {
      usersBasedOnSearch: usersBasedOnSearch,
      sessionUserId: current_userid,
      acceptedFriends: acceptedFriends, // Új adat
      pendingRequests: pendingRequests,
    });
  } catch (error) {
    creq.flash("error", "Váratlan hiba történt!");
    return res.redirect("/");
  }
});

module.exports = router;
