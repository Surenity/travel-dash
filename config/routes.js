//Update the name of the controller below and rename the file.
const users = require("../controllers/users.js")
const trips = require("../controllers/trips.js")
module.exports = function(app){

  app.use(createErrorArr);

  app.get('/', users.index);

  app.post('/login', users.login);

  app.post('/register' , users.register);

  app.use(authenticateUser);

  app.get('/welcome', users.welcome);

  app.get('/trip/create', trips.build);

  app.post('/trip/create', trips.create);

  app.get('/trip/:id', trips.edit);

  app.post('/trip/:id', trips.update);
}

function authenticateUser(req, res, next){
  if(!req.session.user_id){
    req.session.errors.push("Sorry, you don't have access to that page.");
    req.session.save(()=>{
      res.redirect('/');
    })
  }else{
    next();
  }
}

function createErrorArr(req, res, next){
  if(!req.session.errors){
    req.session.errors = [];
  }
  next();
}
