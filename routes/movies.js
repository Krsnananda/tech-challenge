var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
  const db = require("../db");
  const Movies = db.Mongoose.model('movies', db.MovieSchema, 'movies');
  const movie = req.query.name

  try {
    if (movie) {
      const result = await Movies.find({ Title: new RegExp('.*' + movie + '.*', 'i') })
      result.length > 0 ? res.send(result) : res.status(404).send('Filme não encontrado.')
    }
    else {
      res.status(400).send('Informe o termo a ser buscado')
    }
  } catch (error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  const payload = req.body.movies
  const db = require("../db");
  const Movies = db.Mongoose.model('movies', db.MovieSchema, 'movies');

  try {
    const response = await Movies.insertMany(payload, { ordered: false })
    res.send('OK')
  } catch (error) {
    next(error)
  }
})

module.exports = router;
