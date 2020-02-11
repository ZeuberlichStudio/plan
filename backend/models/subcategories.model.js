const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subcatSchema = new Schema({
  name: { type: String, required: true },
  posts_count: { type: Number, required: true }
},{
  timestampes: true,
});

const Subcat = mongoose.model('Subcat', subcatSchema);

module.exports = Subcat;
