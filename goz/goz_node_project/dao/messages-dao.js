const db = require('./../config/db');

const saveMessageQuery = 'INSERT INTO messages (senderID, receiverID, content, timestamp) VALUES ($1, $2, $3, NOW())';
const getMessagesBetweenUsersQuery = `
  SELECT * FROM messages
  WHERE (senderID = $1 AND receiverID = $2) OR (senderID = $2 AND receiverID = $1)
  ORDER BY timestamp ASC`;
const deleteMessageQuery = 'DELETE FROM messages WHERE messageID = $1';
const getMessageByIDQuery = 'SELECT * FROM messages WHERE messageID = $1';

class MessagesDAO {
  async saveMessage(senderID, receiverID, content) {
    const values = [senderID, receiverID, content];
    await db.query(saveMessageQuery, values);
  }

  async getMessagesBetweenUsers(userID1, userID2) {
    const values = [userID1, userID2];
    const result = await db.query(getMessagesBetweenUsersQuery, values);
    return result.rows;
  }

  async getMessageByID(messageID) {
    const values = [messageID];
    const result = await db.query(getMessageByIDQuery, values);
    return result.rows[0];
  }

  async deleteMessage(messageID) {
    const values = [messageID];
    await db.query(deleteMessageQuery, values);
  }
}

module.exports = MessagesDAO;