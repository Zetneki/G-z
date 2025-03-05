const db = require("../config/db");

class StoreDAO {
  /**
   * Ez a fuggveny a db games tablajanak osszes sorat visszaadja
   * @returns games tabla minden sora
   */
  async getGames() {
    let results = await db.query(`SELECT * FROM games`).catch(console.log);
    return results.rows;
  }

  /**
   * Ez a fuggveny visszaad 1 jatekot a megadott id alapjan
   * @param {int} id games tablaban a jatek id-je
   * @returns games row
   */
  async getGameById(id) {
    let result = await db
      .query("SELECT * FROM games WHERE gameid = $1", [id])
      .catch(console.log);
    return result.rows[0];
  }

  /**
   *
   * @param {string} title a jatek cime (max 100 hosszu)
   * @param {string} developer fejleszto (max 100 hosszu)
   * @param {string} publisher kidao (max 100 hosszu)
   * @param {string} picture a jatek kepenek fileneve es kiterjesztese
   * @param {date} releasedate kiadasi datum (max 100 hosszu)
   * @param {decimal} price ar (2 tizedes jegyu decimal, pl.: 99.99)
   * @param {string} description leiras (tetszoleges hosszu string)
   * @param {string} category kategoria (max 50 hosszu string)
   * @returns
   */
  async addGame(
    title,
    developer,
    publisher,
    picture,
    releasedate,
    price,
    description,
    category
  ) {
    await db
      .query(
        "INSERT INTO games (title, developer, publisher, picture, releasedate, price, description, category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [
          title,
          developer,
          publisher,
          picture,
          releasedate,
          price,
          description,
          category,
        ]
      )
      .catch(console.log);
    return;
  }

  /**
   * Minden adattagot frissit egy jatekhoz gameid alapjan, a kep uresen hagyhato, ekkor marad az eredeti
   * @param {int} id a frissiteni kivant jatek gameid-je
   * @param {string} title a jatek cime (max 100 hosszu)
   * @param {string} developer fejleszto (max 100 hosszu)
   * @param {string} publisher kidao (max 100 hosszu)
   * @param {string} picture a jatek kepenek fileneve es kiterjesztese
   * @param {date} releasedate kiadasi datum (max 100 hosszu)
   * @param {decimal} price ar (2 tizedes jegyu decimal, pl.: 99.99)
   * @param {string} description leiras (tetszoleges hosszu string)
   * @param {string} category kategoria (max 50 hosszu string)
   * @returns
   */
  async updateGame(
    id,
    title,
    developer,
    publisher,
    picture,
    releasedate,
    price,
    description,
    category
  ) {
    console.log(id);
    console.log(title);
    console.log(developer);
    console.log(publisher);
    console.log(picture);
    console.log(releasedate);
    console.log(price);
    console.log(description);
    console.log(category);
    await db
      .query(
        `UPDATE games SET 
            title = $1,
            developer = $2,
            publisher = $3,
            picture = COALESCE($4, picture),
            releaseDate = $5,
            price = $6,
            description = $7,
            category = $8 
         WHERE gameID = $9`,
        [
          title,
          developer,
          publisher,
          picture,
          releasedate,
          price,
          description,
          category,
          parseInt(id),
        ]
      )
      .catch(console.log);

    return;
  }

  /**
   * Ez a fuggveny torol 1 jatekot a megadott id alapjan
   * @param {int} id game tablabol id
   * @returns
   */
  async deleteGame(id) {
    await db
      .query(`DELETE FROM games WHERE gameID=$1`, [parseInt(id)])
      .catch(console.log);

    return;
  }

  /**
   * Kategoria alapjan osszerakja az egesz game tablat egy asszociativ tombkent es azt visszaadja
   * @returns assoc tomb (jatekok kategoria alapjan sorolt)
   */
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
}

module.exports = StoreDAO;
