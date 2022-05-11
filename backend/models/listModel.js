const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = mongoose.Schema({
   user:{
    type: Schema.Types.ObjectId,
    ref: 'User'
   },
   name:{
      type: String
   },
   detail:{ type: String }
});

module.exports = mongoose.model('List', listSchema);