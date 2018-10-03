const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  show: function(req, res) {
    knex('airlines')
    .where('id', req.params.id)
    .then((airlineResult)=>{
      knex('trips')
      .where('airline_id', req.params.id)
      .then((tripResults)=>{
        res.render('airlinepage', {airline: airlineResult[0], trips: tripResults});
      })
    })
  },


}
