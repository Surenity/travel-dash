const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  build: function(req, res) {
    knex('airlines').then((results)=>{
      res.render('plantrip', {airlines: results});
    })
  },

  create: function (req, res){
    knex('trips')
    .insert({
      name: req.body.name,
      origin: req.body.origin,
      destination: req.body.destination,
      airline_id: req.body.airline_id,
      date: req.body.date,
      user_id: req.session.user_id
    })
    .then(()=>{
      res.redirect('/welcome');
    })
  }
}
