const express = require("express");
const router = express.Router();
const ForumDao = require("../dao/forum-dao");
const forumDAO = new ForumDao();
const UserDAO = require("../dao/user-dao");
const userDAO = new UserDAO();
const jwt = require("jsonwebtoken");
const { userAuth, adminAuth, jwtSecret } = require("./../config/auth.js");

// Route to create a new forum
router.post("/forum/add", async (req, res) => {
  const { title, description } = req.body;
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

  if (!title || !description) {
    req.flash("error", "Cím és leírás szükséges");
    return res.redirect("/forum");
  }
  try {
    await forumDAO.createForum(title, description, current_userid);
    res.redirect("/forum"); // Redirect to the forum page after creating a new forum
  } catch (err) {
    req.flash("error", "Váratlan hiba történt");
    return res.redirect("/forum");
  }
});

// Route to edit a forum
router.post("/forum/edit/:id", async (req, res) => {
  var id = req.params.id;
  const { title, description } = req.body;
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

  if (!title || !description) {
    req.flash("error", "Cím és leírás szükséges");
    return res.redirect("/forum");
  }
  try {
    await forumDAO.editForum(title, description, current_userid, id);
    res.redirect("/forum"); // Redirect to the forum page after creating a new forum
  } catch (err) {
    req.flash("error", "Váratlan hiba történt");
    return res.redirect("/forum");
  }
});

// Route to delete a forum
router.post("/forum/delete/:id", async (req, res) => {
  var id = req.params.id;
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

  try {
    await forumDAO.deleteForum(current_userid, id);
    res.redirect("/forum"); // Redirect to the forum page after creating a new forum
  } catch (err) {
    req.flash("error", "Váratlan hiba történt");
    return res.redirect("/forum");
  }
});

// Route to create a new post
router.post("/forumposts/add/:id", async (req, res) => {
  var id = req.params.id;
  const { content } = req.body;
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

  if (!content) {
    req.flash("error", "Üres posztot nem adhatsz hozzá");
    return res.redirect("/forum");
  }
  try {
    await forumDAO.createForumPost(id, current_userid, content);
    res.redirect(`/forumposts/${id}`); // Redirect to the forum page after creating a new forum
  } catch (err) {
    req.flash("error", "Váratlan hiba történt");
    return res.redirect("/forum");
  }
});

// Route to edit a post
router.post("/forumposts/edit/:id", async (req, res) => {
  var id = req.params.id;
  const { content } = req.body;
  const { forumid } = req.body;
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

  if (!content) {
    req.flash("error", "Üres posztot nem adhatsz hozzá");
    return res.redirect("/forum");
  }
  try {
    await forumDAO.editForumPost(content, current_userid, id);
    res.redirect(`/forumposts/${forumid}`); // Redirect to the forum page after creating a new forum
  } catch (err) {
    req.flash("error", "Váratlan hiba történt");
    return res.redirect("/forum");
  }
});

// Route to delete a post
router.post("/forumposts/delete/:id", async (req, res) => {
  var id = req.params.id;
  const { forumid } = req.body;
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

  try {
    await forumDAO.deleteForumPost(current_userid, id);
    res.redirect(`/forumposts/${forumid}`); // Redirect to the forum page after creating a new forum
  } catch (err) {
    req.flash("error", "Váratlan hiba történt");
    return res.redirect("/forum");
  }
});

// Route to create a new comment
router.post("/forumpost/add/:id", async (req, res) => {
  var id = req.params.id;
  const { content } = req.body;
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
  console.log(id, current_userid, content, current_role);

  if (!content) {
    req.flash("error", "Üres posztot nem adhatsz hozzá");
    return res.redirect("/forum");
  }
  try {
    await forumDAO.createForumComment(id, current_userid, content);
    res.redirect(`/forumpost/${id}`); // Redirect to the forum page after creating a new forum
  } catch (err) {
    req.flash("error", "Váratlan hiba történt");
    return res.redirect("/forum");
  }
});

// Route to get all forums
router.get("/forum", async (req, res) => {
  try {
    const forums = await forumDAO.getAllForums();
    forums.reverse();
    const users = [];
    for (const forum of forums) {
      const user = await userDAO.getUserByUserID(forum.userid);
      users.push(user);
    }
    const token = req.cookies.jwt;
    var current_role;
    var current_userid;

    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          console.log(err);
        } else {
          current_role = decodedToken.role;
          current_userid = decodedToken.id;
        }
      });
    }

    var moment = require("moment");
    return res.render("forum", {
      moment: moment,
      forums: forums || [], // Ensure forums is always an array
      current_role,
      current_userid,
      users,
    });
  } catch (error) {
    req.flash("error", "Váratlan hiba történt");
    return res.redirect("/");
  }
});

// Route to get forum by ID
router.get("/forumposts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const token = req.cookies.jwt;
    var current_role;
    var current_userid;

    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          console.log(err);
        } else {
          current_role = decodedToken.role;
          current_userid = decodedToken.id;
        }
      });
    }
    const forum = await forumDAO.getForumById(id);
    const creator = await userDAO.getUserByUserID(forum.userid);
    const posts = await forumDAO.getPostsByForumID(id);
    posts.reverse();
    const users = [];
    for (const post of posts) {
      const user = await userDAO.getUserByUserID(post.userid);
      users.push(user);
    }
    if (forum) {
      res.render("forumposts", {
        forums: null,
        forum,
        posts,
        creator,
        users,
        current_role,
        current_userid,
      });
    } else {
      req.flash("error", "Fórum nem található");
      return res.redirect("/");
    }
  } catch (err) {
    req.flash("error", "Váratlan hiba történt");
    return res.redirect("/");
  }
});

// Route to get post by ID
router.get("/forumpost/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const token = req.cookies.jwt;
    var current_role;
    var current_userid;

    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          console.log(err);
        } else {
          current_role = decodedToken.role;
          current_userid = decodedToken.id;
        }
      });
    }

    const forumID = await forumDAO.getForumIdByPostId(parseInt(id));
    const forum = await forumDAO.getForumById(forumID.forumid);
    const post = await forumDAO.getPostById(id);
    const creator = await userDAO.getUserByUserID(post.userid);
    const comments = await forumDAO.getCommentsByPostId(id);
    comments.reverse();
    const users = [];
    for (const comment of comments) {
      const user = await userDAO.getUserByUserID(comment.userid);
      users.push(user);
    }
    console.log(post);
    if (forum && post) {
      res.render("forumpost", {
        forums: null,
        forum,
        post,
        comments,
        current_role,
        current_userid,
        users,
        creator,
      });
    } else {
      req.flash("error", "Poszt nem található");
      return res.redirect("/");
    }
  } catch (err) {
    req.flash("error", "Váratlan hiba történt");
    return res.redirect("/forum");
  }
});

// Route to edit a post
router.post("/forumpost/edit/:id", async (req, res) => {
  var id = req.params.id;
  const { content } = req.body;
  const { postid } = req.body;
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

  if (!content) {
    req.flash("error", "Üres posztot nem adhatsz hozzá");
    return res.redirect("/forum");
  }
  try {
    await forumDAO.editForumComment(content, current_userid, id);
    res.redirect(`/forumpost/${postid}`); // Redirect to the forum page after creating a new forum
  } catch (err) {
    req.flash("error", "Váratlan hiba történt");
    return res.redirect("/forum");
  }
});

// Route to delete a post
router.post("/forumpost/delete/:id", async (req, res) => {
  var id = req.params.id;
  const { postid } = req.body;
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

  try {
    await forumDAO.deleteForumComment(current_userid, id);
    res.redirect(`/forumpost/${postid}`); // Redirect to the forum page after creating a new forum
  } catch (err) {
    req.flash("error", "Váratlan hiba történt");
    return res.redirect("/forum");
  }
});

module.exports = router;
