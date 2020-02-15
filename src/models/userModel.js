var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var crypto = require('crypto');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new Schema({
	'name' : String,
	'email' : {type:String , unique:true , required : true},
	'hash' :{type:String},
	'salt' : {type:String}
});

userSchema.virtual('password')
	.get(function() {
    	return this.hash;
	})
	.set(function(password) {
	    this.salt = this.makeSalt();
        this.hash = this.encryptPassword(password);
	})
;

// Schema methods
userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.password;
    },
    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },
    encryptPassword: function(password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
    },
    saveUserId: function(id){
        console.log("******************************* Id " + id);
        this.user = mongoose.mongo.ObjectId(id);
        console.log(this.user)
    }
};

// Unique field plugin (makes better error messages)
userSchema.plugin(uniqueValidator, { message: 'Sorry, someone is already using {VALUE} for their {PATH}.'})

module.exports = mongoose.model('user', userSchema);
