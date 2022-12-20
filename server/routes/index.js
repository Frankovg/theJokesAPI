var express = require("express");
var router = express.Router();
var jokeControllers = require("../controllers/jokeControllers");

// get a joke
// http://localhost:4000/getJoke
router.get("/getJoke", jokeControllers.getAJoke);

// search jokes
// http://localhost:4000/searchJoke/:find
router.get("/searchJoke/:find", jokeControllers.searchJoke);

// show top ten
// http://localhost:4000/topJoke
router.get("/topJoke", jokeControllers.topJoke);

// filter by type
// http://localhost:4000/type/:type
router.get("/type/:type", jokeControllers.typeJoke);

// add a new joke
// http://localhost:4000/setJoke
router.post("/setJoke", jokeControllers.setAJoke);

// give a like to a joke
//http://localhost:4000/like/:id
router.put("/like/:id", jokeControllers.setLike);

module.exports = router;
