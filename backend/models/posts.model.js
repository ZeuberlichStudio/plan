const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema= new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  img: { type: String, required: false },
  cat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cat' }],
  subcat: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcat' },
  client: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
  year: { type: String, required: true },
  month: { type: String, required: true },
  date: { type: Date, required: true },
  additions: [[{ type: String, required: true }]]
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
