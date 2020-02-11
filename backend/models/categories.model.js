const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = new Schema({
  name: { type: String, required: true },
  subcats: [{ type: Schema.Types.ObjectId, ref: 'Subcat' }],
  icon: { type: String, required: true }
},{
  timestampes: true,
});

const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;
