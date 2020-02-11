const router = require('express').Router();

let Client = require('../models/clients.model');
let Cat = require('../models/categories.model');
let Post = require('../models/posts.model');

router.route('/').get((req, res) => {
  Client.find()
    .sort('order')
    .populate('cats')
    .then( clients => res.json(clients))
    .catch( err => res.status(400).json('Error' + err));
});

module.exports = router;
