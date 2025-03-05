const db = require("./../config/db");


const createUser = "INSERT INTO Users (username, password, role, email, profilepicture) VALUES ($1, $2, $3, $4, $5)";
const getUserByUserID = "SELECT * FROM Users WHERE userID = $1";
const getUserByEmail = "SELECT * FROM Users WHERE email = $1";
const getUserByUsername = "SELECT * FROM Users WHERE username = $1";

class UserDAO {
  /**
   * Ez a fuggveny hozza letre a felhasznalot az adatbazisban
   * @param {string} username felhasznalonev
   * @param {string} password hashelt jelszo
   * @param {string} role player vagy admin lehet CSAK
   * @param {string} email email cim
   * @returns
   */
  async createUser(username, password, role, email) {
    await db
      .query(createUser, [
        username,
        password,
        role,
        email,
        'defprofpic.jpg'
      ])
      .catch(console.log);
    return;
  }

  /**
   * Ez a fuggveny visszaad 1 felhasznalot a parameterben megadott id alapjan
   * @param {int} userID userid a user tablaban
   * @returns user row
   */
  async getUserByUserID(userID) {
    let result = await db
      .query(getUserByUserID, [userID])
      .catch(console.log);
    return result.rows[0];
  }

  /**
   * Ez a fuggveny visszaad 1 felhasznalot a parameterben megadott email alapjan
   * @param {string} email email cim a user tablaban
   * @returns user row
   */

  async getUserByEmail(email) {
    let result = await db
      .query(getUserByEmail, [email])
      .catch(console.log);
    return result.rows[0];
  }

  /**
   * Ez a fuggveny visszaad 1 felhasznalot a parameterben megadott username alapjan
   * @param {string} username email cim a user tablaban
   * @returns user row
   */

  async getUserByUsername(username) {
    let result = await db
      .query(getUserByUsername, [username])
      .catch(console.log);
      
    return result.rows[0];
  }

  async updatePassword(username, hashedPassword) {
    const updatePasswordQuery = `UPDATE users SET password = $1 WHERE username = $2`;
    try {
      await db.query(updatePasswordQuery, [hashedPassword, username]);
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  }

  async updateEmail(username, newEmail) {
    const updateEmailQuery = `
      UPDATE users SET email = $1 WHERE username = $2
    `;

    try {
      await db.query(updateEmailQuery, [newEmail, username]);
    } catch (error) {
      console.error("Error updating email:", error);
      throw error;
    }
  } 

  async verifyPassword(user, password) {
    return bcrypt.compare(password, user.password);
  }

  /**
   * Ez a függvény frissíti a felhasználó profilképének elérési útvonalát az adatbázisban.
   * @param {string} username A felhasználó felhasználóneve, akinek a profilképét frissítjük
   * @param {string} profilePicturePath Az új profilkép fájlnév (pl. profile-pic.jpg)
   * @returns {Promise} A frissítés eredménye
   */
  async updateUserProfilePicture(username, profilePicturePath) {
    const updateProfilePictureQuery = `UPDATE users SET profilepicture = $1 WHERE username = $2`;
    try {
      await db.query(updateProfilePictureQuery, [profilePicturePath, username]);
    } catch (error) {
      console.error("Error updating profile picture:", error);
      throw error;
    }
  } 

  async updateUserStatus(username, status) {
    const updateStatusQuery = `UPDATE users SET status = $1 WHERE username = $2`;
    try {
      await db.query(updateStatusQuery, [status, username]);
    } catch (error) {
      console.error("Error updating user status:", error);
      throw error;
    }
  }

  

}

module.exports = UserDAO;

