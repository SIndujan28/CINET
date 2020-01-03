import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';
import { hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

import { passwordConfig } from './user.validation';

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: '${VALUE} is not a valid email',
    },
  },
  userName: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Name is required'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    trim: true,
    minlength: [8, 'Password must atleast be 8 characters with a number'],
    validate: {
      validator(password) {
        return passwordConfig.test(password);
      },
      message: '{VALUE} is not a valid password!',
    },
  },
}, { timestamps: true });

userSchema.plugin(uniqueValidator, {
  message: '${VALUE} already taken',
});
userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashpassword(this.password);
  }
  return next();
});
userSchema.methods = {
  _hashpassword(password) {
    return hashSync(password, 10);
  },
  authenticatePassword(password) {
    return compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign({
      _id: this._id,
    }, 'piss off mom for being selfish');
  },
  toAuthJSON() {
    return {
      _id: this._id,
      userName: this.userName,
      email: this.email,
      token: `Bearer ${this.createToken()}`,
    };
  },
  toJSON() {
    return {
      _id: this._id,
      userName: this.userName,
    };
  },
};
export default mongoose.model('User', userSchema);
