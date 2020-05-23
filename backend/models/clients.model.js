const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientsSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  slogan: { type: String, required: true },
  cats: [{ type: Schema.Types.ObjectId, ref: 'Cat' }],
  has_posts: { type: Boolean, required: true },
  order: {type: Number, required: true},
  link: {type: String, require: false}
}, {
  timestamps: true
});

const Client = mongoose.model('Client', clientsSchema);

module.exports = Client;
