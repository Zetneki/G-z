const UserDAO = require("./../dao/user-dao.js");
const userDAO = new UserDAO();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/auth.js");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../Uploads/profile_pictures");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const username = req.params.username;
    const ext = path.extname(file.originalname);
    cb(null, `${username}-profile_picture${ext}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

router.get("/profile/:username", userAuth, async (req, res) => {
  try {
    const username = req.params.username;
    const user = await userDAO.getUserByUsername(username);
    console.log(user);

    if (!user) {
      req.flash("error", "Nem található felhasználó");
      return res.redirect("/");
    }

    const { email } = user; // Az email a lekért felhasználó adatai között szerepelú
    const { profilePicture } = user; //Profilkép lekérése

    // A profiloldal renderelése az email és username változókkal
    return res.render("profile", {
      username: username,
      email: email, // Email átadása
      profilePicture: profilePicture,
    });
  } catch (error) {
    req.flash("error", "Váratlan hiba történt");
    return res.redirect(`/profile/${username}`);
  }
});

// POST: Jelszó módosítása
router.post("/profile/:username/password", async (req, res) => {
  const { username } = req.params;
  const { current_password, new_password } = req.body;

  try {
    const user = await userDAO.getUserByUsername(username);
    if (!user) {
      req.flash("error", "Nem található felhasználó");
      return res.redirect("/");
    }
    const passwordMatch = await bcrypt.compare(current_password, user.password);
    if (!passwordMatch) {
      req.flash("error", "Hibás jelenlegi jelszó");
      return res.redirect(`/profile/${username}`);
    }
    if (new_password.length < 8) {
      req.flash("error", "A jelszó nem lehet rövidebb 8 karakternél");
      return res.redirect(`/profile/${username}`);
    }

    // Hasheljük az új jelszót

    const hashedPassword = await bcrypt.hash(new_password, 10);
    await userDAO.updatePassword(username, hashedPassword);

    return res.redirect(`/profile/${username}?message=siker`);
  } catch (error) {
    req.flash("error", "Váratlan hiba történt");
    return res.redirect(`/profile/${username}`);
  }
});

// POST: Email módosítása
router.post("/profile/:username/email", userAuth, async (req, res) => {
  try {
    const { new_email } = req.body;
    const username = req.params.username;

    // Ha nem adtak meg új emailt
    if (!new_email) {
      req.flash("error", "Nincs email cím megadva");
      return res.redirect(`/profile/${username}`);
    }

    if (!new_email.includes("@")) {
      req.flash("error", "Hibás email cím megadva");
      return res.redirect(`/profile/${username}`);
    }

    const user = await userDAO.getUserByUsername(username);
    if (!user) {
      req.flash("error", "Felhasználó nem található");
      return res.redirect("/");
    }

    // Ellenőrizzük, hogy az új email cím már foglalt-e
    const existingUserWithEmail = await userDAO.getUserByEmail(new_email);
    if (existingUserWithEmail) {
      req.flash("error", "Ez az email már használatban van");
      return res.redirect(`/profile/${username}`);
    }

    // Email frissítése
    await userDAO.updateEmail(username, new_email);

    // Visszairányítjuk a felhasználót a profil oldalra

    res.redirect(`/profile/${username}?message=siker`);
  } catch (error) {
    req.flash("error", "Hiba történt az email feltöltése során");
    return res.redirect(`/profile/${username}`);
  }
});

router.post(
  "/profile/:username/picture",
  upload.single("profile_picture"),
  async (req, res) => {
    const { username } = req.params;

    if (!req.file) {
      req.flash("error", "Nincs kép kiválasztva");
      return res.redirect(`/profile/${username}`);
    }

    try {
      const profilePicturePath = req.file.filename;
      await userDAO.updateUserProfilePicture(username, profilePicturePath);
      const updatedUser = await userDAO.getUserByUsername(username);
      const token = jwt.sign(
        {
          id: updatedUser.userid,
          username,
          role: updatedUser.role,
          profilepicture: updatedUser.profilepicture, // Frissített profilkép
        },
        jwtSecret
      );
      res.cookie("jwt", token, {
        httpOnly: true,
      });

      res.redirect(`/profile/${username}?message=siker`);
    } catch (error) {
      req.flash(
        "error",
        "Hiba történt a kép feltöltése során. Próbáld újra később."
      );
      return res.redirect(`/profile/${username}`);
    }
  }
);

router.post(
  "/profile/:username/upload",
  userAuth,
  upload.single("profile_picture"),
  async (req, res) => {
    try {
      // Handle the file upload and update the user's profile picture in the database
      const username = req.params.username;
      const profilePicture = `${username}-profile_picture${path.extname(
        req.file.originalname
      )}`;
      await userDAO.updateProfilePicture(username, profilePicture);
      res.redirect(`/profile/${username}`);
    } catch (error) {
      req.flash(
        "error",
        "Hiba történt a kép feltöltése során. Próbáld újra később."
      );
      return res.redirect(`/profile/${username}`);
    }
  }
);

module.exports = router;
