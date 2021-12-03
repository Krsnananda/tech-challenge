var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
  const db = require("../db");
  const Movies = db.Mongoose.model('movies', db.MovieSchema, 'movies');
  const movie = req.query.name

  try {
    if (movie) {
      const result = await Movies.findOne({ title: new RegExp('.*' + movie + '.*', 'i') })
      result ? res.send(result) : res.status(404).send('Filme não encontrado.')
    } else {
      const result = await Movies.find()
      result ? res.send(result) : res.status(404).send('Filme não encontrado.')
    }
  } catch (error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  const payload = {
    title: req.body.Title,
    year: req.body.Year,
    imdbID: req.body.imdbID,
    type: req.body.Type,
    poster: req.body.Poster,
  }

  const db = require("../db");
  const Movies = db.Mongoose.model('movies', db.MovieSchema, 'movies');
  const movie = new Movies(payload)

  try {
    const emptyPayload = Object.values(payload).some(x => x === null || x === '')
    if (emptyPayload) {
      res.status(400).send('Foram enviados dados nulos ou vazios.')
    } else {
      await movie.save()
      res.send(movie)
    }
  } catch (err) {
    next(err);
  }
})

module.exports = router;
