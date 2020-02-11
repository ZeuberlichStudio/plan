const router = require('express').Router();

let Cat = require('../models/categories.model');
let Subcat = require('../models/subcategories.model')

router.route('/').get((req, res) => {
  Cat.find()
    .populate('subcats')
    .then( cats => res.json(cats))
    .catch( err => res.status(400).json('Error' + err));
});

module.exports = router;
