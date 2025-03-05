const express = require("express");
const router = express.Router();
const FriendsDAO = require("../dao/friends-dao");
const friendsDAO = new FriendsDAO();
const UserDAO = require("../dao/user-dao");
const userDAO = new UserDAO();
const MessagesDAO = require("../dao/messages-dao");
const messagesDAO = new MessagesDAO();
const app = express();

//Jelenlegi felhasználó megjelenítése
router.use(async (req, res, next) => {
  if (req.session.userID) {
    try {
      const currentUser = await userDAO.getUserByUserID(req.session.userID);
      if (currentUser) {
        res.locals.currentUser = currentUser;
      }
    } catch (error) {
      req.flash("error", "Váratlan hiba történt");
      return res.redirect("/");
    }
  }
  next();
});

router.get("/messages", async (req, res) => {
  try {
    const userID = req.session.userID;
    if (!userID) {
      req.flash("error", "Ehhez nincs jogod!");
      return res.redirect("/");
    }

    const friends = await friendsDAO.getAcceptedFriends(userID);

    res.render("messages", { friends, messages: [], selectedFriend: null });
  } catch (error) {
    req.flash("error", "Váratlan hiba történt");
    return res.redirect("/");
  }
});

// Üzenetek megjelenítése
router.get("/messages/:username", async (req, res) => {
  try {
    const userID = req.session.userID;
    if (!userID) {
      req.flash("error", "Ehhez nincs jogod!");
      return res.redirect("/");
    }

    const friendUsername = req.params.username;
    const friend = await userDAO.getUserByUsername(friendUsername);
    if (!friend) {
      req.flash("error", "Barát nem található");
      return res.redirect("/messages");
    }

    const friends = await friendsDAO.getAcceptedFriends(userID);
    const messages = await messagesDAO.getMessagesBetweenUsers(
      userID,
      friend.userid
    );

    // Add sender details to each message
    for (let msg of messages) {
      //console.log("Message:", msg); // Debug üzenet
      const sender = await userDAO.getUserByUserID(msg.senderid);
      if (sender) {
        msg.senderUsername = sender.username;
        msg.senderProfilePic = sender.profilepicture;
      } else {
        req.flash("error", `Küldő nem található a ${msg.senderid} néven`);
        return res.redirect("/messages");
      }
    }

    res.render("messages", {
      friends,
      messages,
      currentUser: res.locals.currentUser.username,
      selectedFriend: friendUsername,
    });
  } catch (error) {
    req.flash("error", "Ehhez nincs jogod!");
    return res.redirect("/");
  }
});

// Üzenet küldése
router.post("/messages/:username", async (req, res) => {
  try {
    const senderID = req.session.userID;
    const recipientUsername = req.params.username;
    const messageContent = req.body.message;

    const recipient = await userDAO.getUserByUsername(recipientUsername);
    if (!recipient) {
      req.flash("error", "Üzenet fogadó nem található");
      return res.redirect("/");
    }
    const receiverID = recipient.userid; // A receiverID beállítása

    // Üzenet mentése az adatbázisba
    await messagesDAO.saveMessage(senderID, receiverID, messageContent);

    res.redirect(`/messages/${recipientUsername}`);
  } catch (error) {
    req.flash("error", "Ehhez nincs jogod!");
    return res.redirect("/");
  }
});

//Üzenet törlése
router.post("/messages/:username/delete", async (req, res) => {
  try {
    const userID = req.session.userID;
    const friendUsername = req.params.username;
    const friend = await userDAO.getUserByUsername(friendUsername);
    const messageID = req.body.messageID;

    if (!messageID) {
      req.flash("error", "Váratlan hiba történt!");
      return res.redirect("/");
    }

    const message = await messagesDAO.getMessageByID(messageID);
    if (!message) {
      req.flash("error", "Váratlan hiba történt!");
      return res.redirect("/");
    }

    if (!friend) {
      req.flash("error", "Váratlan hiba történt!");
      return res.redirect("/");
    }

    // Üzenet törlése az adatbázisból
    await messagesDAO.deleteMessage(messageID);

    res.redirect(`/messages/${friendUsername}`);
  } catch (error) {
    req.flash("error", "Váratlan hiba történt!");
    return res.redirect("/");
  }
});

module.exports = router;
