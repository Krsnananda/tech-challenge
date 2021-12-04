const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:Qwert123@tech-challenge.id1tf.mongodb.net/Tech-Challenge?retryWrites=true&w=majority').then(() => {
  console.log('Mongodb connected')
}).catch(err => console.log(err))

const movieSchema = new mongoose.Schema({
  Title: {
    type: String
  },
  Year: {
    type: String
  },
  imdbID: {
    type: String
  },
  Type: {
    type: String
  },
  Poster: {
    type: String
  }
}, { collection: 'movies' }
);

const favoriteSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
    index: {
      unique: true,
      collation: { locale: 'en', strength: 2 }
    }
  },
  Year: {
    type: String,
    required: true
  },
  imdbID: {
    type: String,
    required: true
  },
  Type: {
    type: String,
    required: true
  },
  Poster: {
    type: String,
    required: true
  }
}, { collection: 'favorites' }
);

module.exports = { Mongoose: mongoose, MovieSchema: movieSchema, FavoriteSchema: favoriteSchema }