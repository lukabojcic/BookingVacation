
const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [ /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, 'Please add valid email'
        ]
    },
  
    password: {
        type: String,
        required: [true, 'Please add a password'],
      
    },
   
    date: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('user', UserSchema); {

    const resetToken = crypto.randomBytes(20).toString('hex'); 
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex'); 
    //set expire 
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; //tj 10min expire

    return resetToken; 


}
