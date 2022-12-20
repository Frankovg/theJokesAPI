const connection = require("../config/db");
require("dotenv").config();

class jokeControllers {
  // get a joke
  // http://localhost:4000/getJoke
  getAJoke = (req, res) => {
    let sql = "SELECT * FROM jokes";

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // show top ten
  // http://localhost:4000/topJoke
  topJoke = (req, res) => {
    let sql = "SELECT * FROM jokes ORDER BY likes DESC LIMIT 10";

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // filter by type
  // http://localhost:4000/type/:type
  typeJoke = (req, res) => {
    const type = req.params.type;
    let sql = `SELECT * FROM jokes WHERE type = "${type}"`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // add a new joke
  // http://localhost:4000/setJoke
  setAJoke = (req, res) => {
    const { setup, punchline, type } = req.body;
    let maxIdSQL = "SELECT MAX(id) FROM jokes";

    connection.query(maxIdSQL, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      } else {
        let newId = parseInt(Object.values(result[0])) + 1;
        let newJokeSQL = `INSERT INTO jokes (id,type,setup,punchline) VALUES ("${newId}", "${type}", "${setup}", "${punchline}")`;
        connection.query(newJokeSQL, (error, result) => {
          error
            ? res.status(400).json({ error })
            : res.status(200).json(result);
        });
      }
    });
  };

  // search jokes
  //http://localhost:4000/searchJoke/:find
  searchJoke = (req, res) => {
    const find = req.params.find;
    let sql = `SELECT * FROM jokes WHERE setup LIKE "%${find}%" ORDER BY RAND() LIMIT 1`;

    connection.query(sql, (error, result) => {
      console.log(result);
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // give a like to a joke
  //http://localhost:4000/like
  setLike = (req, res) => {
    const id = req.params.id;
    let pickLikes = `SELECT likes FROM jokes WHERE id = ${id}`;

    connection.query(pickLikes, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      } else {
        let newLike = result[0].likes + 1;

        let addNewLike = `UPDATE jokes SET likes = ${newLike} WHERE id = ${id}`;

        connection.query(addNewLike, (error, result) => {
          error
            ? res.status(400).json({ error })
            : res.status(200).json(result);
        });
      }
    });
  };
}

module.exports = new jokeControllers();
