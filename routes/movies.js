var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
  const db = require("../db");
  const Movies = db.Mongoose.model('movies', db.MovieSchema, 'movies');
  const movie = req.query.name

  try {
    if (movie) {
      const result = await Movies.findOne({ title: new RegExp('.*' + movie + '.*', 'i') })
      res.send(result);
    } else {
      const result = await Movies.find()
      res.send(result);
    }
  } catch (error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  const title = req.body.Title
  const year = req.body.Year
  const imdbID = req.body.imdbID
  const type = req.body.Type
  const poster = req.body.Poster

  const db = require("../db");
  const Movies = db.Mongoose.model('users', db.MovieSchema, 'movies');
  const movie = new Movies({ title, year, imdbID, type, poster });

  try {
    await movie.save();
    res.send(movie)
  } catch (err) {
    next(err);
  }
})

module.exports = router;
