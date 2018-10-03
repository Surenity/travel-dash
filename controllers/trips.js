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
  },

  edit: (req, res)=>{
    knex('airlines').then((airlineResults)=>{
      knex('trips').where('id', req.params.id)
      .then((tripResults)=>{
          res.render('edittrip', {airlines: airlineResults, trip: tripResults[0]});
      })

    })

  },

  update: (req, res)=>{
    knex('trips')
    .where('id', req.params.id)
    .update({
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
