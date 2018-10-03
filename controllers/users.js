const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  index: function(req, res) {
    res.render('index', {errors: req.session.errors});
    req.session.errors = [];
    req.session.save();
  },

  login:(req, res)=>{
    console.log(req.body)
   knex('users').where('email', req.body.email).then((results)=>{
     let user = results[0];
     if(!user){
       console.log('No user')
       req.session.errors.push("Incorrect email or password.");
       req.session.save(()=>{
         res.redirect('/');
       })
       return;
     }
     if(user.password === req.body.password){
       console.log('should work')
       req.session.user_id = user.id;
       req.session.save(()=>{
         res.redirect('/welcome');
       })
     }else{
       console.log('incorrect pass')
       req.session.errors.push("Incorrect email or password.");
       req.session.save(()=>{
         res.redirect('/');
       })
     }
   })
   .catch(error => {
     console.error(error);
   })
 },

  register: (req, res)=>{
    if(req.body.password === req.body.passwordconfirmation){
      knex('users')
      .insert({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      .then(()=>{
        res.redirect('/');
      })
    }

  },

  welcome: (req, res)=>{
    knex('users').where('id', req.session.user_id).then((userResults) =>{
      knex.select('trips.*', 'airlines.name AS airline_name').from('trips')
      .join('airlines', 'airlines.id', 'trips.airline_id')
      .where('user_id', req.session.user_id)
      .then((tripResults)=>{
        res.render('welcome' , {user: userResults[0], trips: tripResults});
      })
    })
    .catch(error =>{
      console.error(error);
    })
  },



}
