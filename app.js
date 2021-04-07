let express = require('express');
let app = express();
let sequelize = require('./db');
require('dotenv').config();

let user = require('./controllers/usercontroller')
let artist = require('./controllers/artistcontroller')

// app.use('/test', function(req, res){
//     res.send('This is a message from the test endpoint on the server!')
// })

sequelize.sync();
//sequelize.sync({force: true})

app.use(express.json());

app.use('/user', user)
app.use('/artist', artist)

app.listen(3000, function(){
    console.log('App is listening on port 3000')
})