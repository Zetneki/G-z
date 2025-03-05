const db = require("../config/db");

class LibraryDAO {
  /**
   * userid alapjan talalt felhasznalo osszes jatekat visszaadja
   * TODO: meg nem mukodik
   * @param {int} userId users table userid
   * @returns userid alapjan talalt felhasznalo osszes jateka
   */
  async getAllGamesByUserID(userId) {
    let results = await db
      .query(
        `SELECT g.* FROM Games g INNER JOIN GameLibrary gl ON g.gameID = gl.gameID WHERE gl.userID = $1;`,
        [userId]
      )
      .catch(console.log);
    return results.rows;
  }

  async getGameById(id) {
    let result = await db
      .query("SELECT * FROM games WHERE gameid = $1", [id])
      .catch(console.log);
    return result.rows[0];
  }

  async getStatusById(gameId, userId) {
    let result = await db
      .query("SELECT * FROM gamelibrary WHERE gameid = $1 AND userid = $2", [
        gameId,
        userId,
      ])
      .catch(console.log);
    return result.rows[0];
  }

  /**
   * UserId alapjan meghatarozott felhasznalo konyvtarahoz gameId altal meghatarozott jatek hozzaadasa
   * NOTE: TESZTELES ALATT
   * @param {int} userId users table userid
   * @param {int} gameId games tabla id
   * @param {string} status CSAK owned, completed lehet
   * @returns
   */
  async addGameToLibrary(userId, gameId, status) {
    // TODO: ha mar megvan a jatek ne vegye meg
    var userexists = await db.query("SELECT * FROM users WHERE userid = $1", [
      userId,
    ]);
    var gameexists = await db.query("SELECT * FROM games WHERE gameid = $1", [
      gameId,
    ]);

    console.log(await this.isGameOwnedByPlayer(userId, gameId));
    if (
      userexists.rows.length === 0 ||
      gameexists.rows.length === 0 ||
      (await this.isGameOwnedByPlayer(userId, gameId))
    ) {
      return;
    }
    await db
      .query(
        "INSERT INTO gamelibrary (userid, gameid, status) VALUES ($1, $2, $3)",
        [userId, gameId, status]
      )
      .catch(console.log);
    return;
  }

  // NOTE: TESZTELES ALATT
  async isGameOwnedByPlayer(userId, gameId) {
    var userexists = await db.query("SELECT * FROM users WHERE userid = $1", [
      userId,
    ]);
    var gameexists = await db.query("SELECT * FROM games WHERE gameid = $1", [
      gameId,
    ]);

    if (userexists.rows.length === 0 || gameexists.rows.length === 0) {
      return;
    }

    var gameFromPlayersLibrary = await db.query(
      "SELECT * FROM gamelibrary WHERE userid = $1 AND gameid = $2",
      [userId, gameId]
    );

    return !(gameFromPlayersLibrary.rows.length === 0);
  }

  async updateGame(id, name, age) {
    await db
      .query(`UPDATE games SET name = $1, age = $2 WHERE id = $3`, [
        name,
        age,
        parseInt(id),
      ])
      .catch(console.log);

    return;
  }

  async deleteGame(id) {
    await db
      .query(`DELETE FROM games WHERE id=$1`, [parseInt(id)])
      .catch(console.log);

    return;
  }

  async getGamesByCategory() {
    const query = "SELECT * FROM games ORDER BY category, title";
    const result = await db.query(query);

    const gamesByCategory = {};
    result.rows.forEach((game) => {
      if (!gamesByCategory[game.category]) {
        gamesByCategory[game.category] = [];
      }
      gamesByCategory[game.category].push(game);
    });

    return gamesByCategory;
  }

  async updateGameStatus(userId, gameId, status) {
    await db
      .query(
        "UPDATE gamelibrary SET status = $1 WHERE userid = $2 AND gameid = $3",
        [status, userId, gameId]
      )
      .catch(console.log);
  }

  async removeGameFromLibrary(userId, gameId) {
    await db
      .query("DELETE FROM GameLibrary WHERE userid = $1 AND gameid = $2", [
        userId,
        gameId,
      ])
      .catch(console.log);
  }
}

module.exports = LibraryDAO;
