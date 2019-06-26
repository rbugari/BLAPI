const mongoose = require('mongoose');
const xconfig =require('../config.json')
const config = xconfig[0]

function dbconnect (){
  mongoose.set('useFindAndModify', false);

  console.log ('Mongo DB : ',config.DBstring)
  mongoose.connect(config.DBstring, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));
}



module.exports = dbconnect