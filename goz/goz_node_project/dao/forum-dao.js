const db = require("../config/db");

class ForumDao {
  // Create a new forum
  async createForum(title, description, userid) {
    const result = await db.query(
      "INSERT INTO Forum (title, description, userid) VALUES ($1, $2, $3)",
      [title, description, userid]
    );
    return result.rows[0];
  }

  // Edit a forum
  async editForum(title, description, userid, forumid) {
    const result = await db.query(
      "UPDATE Forum SET title=$1, description=$2 WHERE userid=$3 AND forumid=$4",
      [title, description, userid, forumid]
    );
    return result.rows[0];
  }

  //Delete
  async deleteForum(userid, forumid) {
    await db.query("DELETE FROM Forum WHERE userid=$1 AND forumid=$2", [
      userid,
      forumid,
    ]);
    return;
  }

  // Get all forums
  async getAllForums() {
    try {
      const result = await db.query("SELECT * FROM Forum");
      return result.rows;
    } catch (error) {
      throw error; // Throw error to propagate it to the route
    }
  }

  // Get forum by ID
  async getForumById(id) {
    const result = await db.query("SELECT * FROM Forum WHERE forumID = $1", [
      id,
    ]);
    return result.rows[0];
  }

  // Create a new forumpost
  async createForumPost(forumid, userid, content) {
    const result = await db.query(
      "INSERT INTO ForumPosts (forumid, userid, content) VALUES ($1, $2, $3)",
      [forumid, userid, content]
    );
    return result.rows[0];
  }

  // Edit a forum
  async editForumPost(content, userid, postid) {
    const result = await db.query(
      "UPDATE ForumPosts SET content=$1 WHERE userid=$2 AND postid=$3",
      [content, userid, postid]
    );
    return result.rows[0];
  }

  //Delete
  async deleteForumPost(userid, postid) {
    await db.query("DELETE FROM ForumPosts WHERE userid=$1 AND postid=$2", [
      userid,
      postid,
    ]);
    return;
  }

  // Get posts by forum ID
  async getPostsByForumID(forumid) {
    const result = await db.query(
      "SELECT * FROM ForumPosts WHERE forumID = $1 ORDER BY created_at ASC",
      [forumid]
    );
    return result.rows;
  }

  // Get post by post ID
  async getPostById(postid) {
    const result = await db.query(
      "SELECT * FROM ForumPosts WHERE postid = $1",
      [postid]
    );
    return result.rows[0];
  }

  // Get forum ID by post ID
  async getForumIdByPostId(postid) {
    const result = await db.query(
      "SELECT * FROM ForumPosts WHERE postid = $1",
      [postid]
    );
    return result.rows[0];
  }

  // Create a new forumcomment
  async createForumComment(postid, userid, content) {
    const result = await db.query(
      "INSERT INTO ForumComments (postid, userid, content) VALUES ($1, $2, $3)",
      [postid, userid, content]
    );
    return result.rows[0];
  }

  // Edit a forum
  async editForumComment(content, userid, commentid) {
    const result = await db.query(
      "UPDATE ForumComments SET content=$1 WHERE userid=$2 AND commentid=$3",
      [content, userid, commentid]
    );
    return result.rows[0];
  }

  //Delete
  async deleteForumComment(userid, commentid) {
    await db.query(
      "DELETE FROM ForumComments WHERE userid=$1 AND commentid=$2",
      [userid, commentid]
    );
    return;
  }

  // Get comments by post ID
  async getCommentsByPostId(postid) {
    const result = await db.query(
      "SELECT * FROM ForumComments WHERE postID = $1 ORDER BY created_at ASC",
      [postid]
    );
    return result.rows;
  }
}

module.exports = ForumDao;
