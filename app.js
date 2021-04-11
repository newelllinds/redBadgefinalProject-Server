require('dotenv').config();
const Express = require('express');
const db = require('./db');

const app = Express();

const middlewares = require('./middleware');

const controllers = require('./controllers')

let sequelize = require('./db');

// let user = require('./controllers/usercontroller')
// let artist = require('./controllers/artistcontroller')

// app.use('/test', function(req, res){
//     res.send('This is a message from the test endpoint on the server!')
// })

sequelize.sync();
//sequelize.sync({force: true})

app.use(Express.json());

app.use('/user', controllers.User)
app.use('/artist', controllers.ArtistProfile)
app.use('/listing', controllers.SaleListing)
// app.use('/supporter', controllers.Supporter)

db.authenticate()
  .then(() => db.sync())
  .then(() =>
    app.listen(3000, () => {
      console.log(`[server]: App is listening on localhost:3000`);
    })
  )
  .catch((e) => {
    console.log("[server]: Server Crashed");
    console.log(e);
  });

// app.listen(3000, function(){
//     console.log('App is listening on port 3000')
// })