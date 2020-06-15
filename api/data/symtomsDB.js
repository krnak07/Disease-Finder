let mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);

let disease = new mongoose.Schema({
    name : {
        type : String,
        required : true
    }
});

let symtomsSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    diseases : [disease]
});

mongoose.model('symtoms',symtomsSchema);
