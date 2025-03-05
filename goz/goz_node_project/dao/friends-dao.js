const db = require("../config/db");

class FriendsDAO {
  async getPendingFriendRequests(userID) {
    const query = `
      SELECT f.friendshipid, u.username, u.profilepicture, f.status
      FROM friends f
      JOIN users u 
        ON (u.userid = f.userid)
      WHERE f.status = 'pending' 
        AND f.friendid = $1  -- Csak azok a kérelmek, amelyeket a felhasználónak küldtek
    `;
    const result = await db.query(query, [userID]);
    return result.rows;
  }

  async sendFriendRequest(userID, friendID, status) {
    const query = `
      INSERT INTO friends (userid, friendid, status)
      VALUES ($1, $2, $3)
    `;
    const values = [parseInt(userID), parseInt(friendID), status];

    try {
      await db.query(query, values);
    } catch (error) {
      console.error("Error sending friend request:", error);
      throw error;
    }
  }

  // Módosítja a barátok státuszát 'pending' -> 'accepted' státuszra
  async acceptFriendRequest(friendshipID) {
    const query = `
      UPDATE friends
      SET status = 'accepted'
      WHERE friendshipid = $1 AND status = 'pending'
    `;
    try {
      await db.query(query, [parseInt(friendshipID)]);
    } catch (error) {
      console.error("Error accepting friend request:", error);
      throw error;
    }
  }

  // Lekérdezi a barátokat, akiknek a státusza 'accepted'
  async getAcceptedFriends(userID) {
    const query = `
      SELECT u.*
      FROM users u
      JOIN friends f ON (f.userid = u.userid OR f.friendid = u.userid)
      WHERE (f.userid = $1 OR f.friendid = $1) AND f.status = 'accepted'
      AND u.userid != $1  -- Kiszedjük saját magunkat
    `;
    const result = await db.query(query, [userID]);
    return result.rows;
  }

  // Lekérdezi a barátok nevét és profilképét
  async getFriends(userID) {
    const query = `
      SELECT u.username, u.profilepicture
      FROM friends f
      JOIN users u ON (f.userid = u.userid OR f.friendid = u.userid)
      WHERE (f.userid = $1 OR f.friendid = $1) AND f.status = 'accepted' AND u.userid != $1
    `;
    const result = await db.query(query, [userID]);
    return result.rows;
  }

  async removeFriend(userID, friendID) {
    const query = `
      DELETE FROM friends 
      WHERE (userid = $1 AND friendid = $2) 
         OR (userid = $2 AND friendid = $1)
    `;
    await db.query(query, [parseInt(userID), parseInt(friendID)])
      .catch(console.log);
    return;
  }

  async listUsersBasedOnSearch(keyword, sessionUserId) {
    const query = `
    SELECT * 
    FROM users 
    WHERE (username ILIKE CONCAT('%', $1::text, '%') OR $1 = '') 
    AND userID != $2
    AND NOT EXISTS (
    SELECT 1 
    FROM friends 
    WHERE (userID = $2 AND friendID = users.userid) 
      OR (friendID = $2 AND userID = users.userid)
      OR (userID = $2 AND friendID = users.userid AND status = 'pending')
  );
  `;
    const result = await db.query(query, [keyword, sessionUserId]);

    const usersBasedOnSearch = {};
    result.rows.forEach((user) => {
      if (!usersBasedOnSearch[user.username]) {
        usersBasedOnSearch[user.username] = [];
      }
      usersBasedOnSearch[user.username].push(user);
    });

    return usersBasedOnSearch;
  }
}

module.exports = FriendsDAO;
