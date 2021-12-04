var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
  const db = require("../db");
  const Favorites = db.Mongoose.model('favorites', db.FavoriteSchema, 'favorites');
  const movie = req.query.name

  try {
    if (movie) {
      const result = await Favorites.findOne({ Title: new RegExp('.*' + movie + '.*', 'i') })
      result ? res.send(result) : res.status(404).send('Este filme não se encontra nos favoritos.')
    } else {
      const result = await Favorites.find()
      result.length > 0 ? res.send(result) : res.status(404).send('Não há filmes favoritados no momento.')
    }
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id

  const result = await Favorites.deleteOne({ _id: id })
  result ? res.send(result) : res.status(404).send('id inválido')
})

router.post('/', async (req, res, next) => {
  const payload = {
    Title: req.body.Title,
    Year: req.body.Year,
    imdbID: req.body.imdbID,
    Type: req.body.Type,
    Poster: req.body.Poster,
  }

  const db = require("../db");
  const Favorites = db.Mongoose.model('favorites', db.FavoriteSchema, 'favorites');
  const movie = new Favorites(payload)

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
