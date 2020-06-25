let db = require('../models')

exports.new = function(req, res) {
  res.render('user/new');
};

exports.findAll = function(req, res) {
  db.User.findAll().then(function(result) {
     //Rendering HTML with result JSON, but the JSON will be send by the name of users
     res.render('user/show',{user: result});
  });
}

exports.find = function(req, res) {
  let user;
  //Finding user by id
  db.User.find({ where: { id: req.param('id') } }).then(function(result) {
    if (result) {
      //Rendering HTML with result JSON, but the JSON will be send by the name of user
      res.render('user/edit',{user: result});
    } 
  });
}

exports.create = function(req, res) {
  db.User.create(req.body).then(function(result) {
    /* Rendering back the saved user, note that we can send mutiplies JSON to HTML, here
     * we are sending the user and Message
     */
    res.render('user/edit',{user: result, message:'It Worked!'});
  }, function (error) {
    res.status(500).send('Error! '+error);
  });
}

exports.update = function(req, res) {
  //Finding user by ID param
  db.User.find({ where: { id: req.param('id') } }).then(function(user) {
    if (user) {   
      /* Updatind all attributes without refreshing the page
       * If you want to update a few attributes, you can use the example bellow
       * result.updateAttributes({attr1: req.body.name, attr2: req.body.location}).then(function(result) {
       * note that which attr1 correspond to a column in table
       */
       user.updateAttributes(req.body).then(function(resultUpdate) {
        /* Rendering back only the JSON message
        */
        res.render('user/edit',{user: resultUpdate, message: "It is updated!"});
        //You can refresh the page, by using res.render and passing the resultUpdate via param.
      }, function (error) {
        res.status(404).send('Error updating '+error);
      });
    }
  })
}

exports.destroy = function(req, res) {
  //Deleting from database
  db.User.destroy({ where: { id: req.param('id') } }).then(function() {
    res.status(200).json({message: "It is deleted!"});
   }, function (error) {
    res.status(500).send('Error deleting '+error);
  });
}

exports.join = function(req, res) {
  db.User.find({ where: { id: req.param('id') },include : [Job] }).then(function(result) {
    res.send(result);
  })
}