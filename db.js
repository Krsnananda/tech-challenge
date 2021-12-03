const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:Qwert123@tech-challenge.id1tf.mongodb.net/Tech-Challenge?retryWrites=true&w=majority').then(() => {
  console.log('Mongodb connected')
}).catch(err => console.log(err))

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: {
      unique: true,
      collation: { locale: 'en', strength: 2 }
    }
  },
  year: {
    type: String,
    required: true
  },
  imdbID: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  }
}, { collection: 'movies' }
);



module.exports = { Mongoose: mongoose, MovieSchema: movieSchema }