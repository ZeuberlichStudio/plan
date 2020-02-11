const router = require('express').Router();

let Post = require('../models/posts.model');
let Cat = require('../models/categories.model');
let Subcat = require('../models/subcategories.model');
let Client = require('../models/clients.model');

router.route('/').get((req,res) => {
  Post.find()
    .populate('cat')
    .populate('subcat')
    .populate('client')
    .then( post => res.json(post) )
    .catch( err => res.status(400).json('Error' + err) );
});

router.route('/cat=:cat').get((req,res) => {
  Post.find({ cat: req.params.cat })
    .sort('date')
    .populate('cat')
    .populate('subcat')
    .populate('client')
    .then( post => res.json(post) )
    .catch( err => res.status(400).json('Error' + err) );
});

/*router.route('/scat=:subcat').get((req,res) => {
  Post.find({ subcat: req.params.subcat })
    .populate('cat')
    .populate('subcat')
    .populate('client')
    .then( post => res.json(post) )
    .catch( err => res.status(400).json('Error' + err) );
});*/

router.route('/client=:client').get((req,res) => {
  Post.find({ client: req.params.client })
    .populate('cat')
    .populate('subcat')
    .populate('client')
    .then( post => res.json(post) )
    .catch( err => res.status(400).json('Error' + err) );
});

module.exports = router;
