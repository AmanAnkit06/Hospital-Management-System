import mongoose from "mongoose";
import validator, { isJWT, stripLow } from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First Name must contain at least 3 characters!"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "First Name must contain at least 3 characters!"],
  },
  email: {
    type: String,
    required: true,
    validator: [validator.isEmail, "Please provide valid email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [11, "Phone Number Must contain exact 11 digits!"],
    maxLenght: [11, "Phone Number Must contain exact 11 digits!"],
  },
  nic: {
    type: String,
    required: true,
    minLength: [13, "NIC Must contain exact 13 digits!"],
    maxLenght: [13, "NIC Must contain exact 13 digits!"],
  },
  dob: {
    type: Date,
    required: [true, "DOB is required!"],
  },

  gender: {
    type: String,
    required: [true, "Gender is required!"],
    enum: ["Male", "Female"],
  },

  password: {
    type: String,
    required: true,
    minLength: [11, "Password must contains at least 8 characters!"],
    select: false,
  },

  role: {
    type: String,
    required: true,
    enum: ["Admin", "Patient", "Doctor"],
  },
  doctorDepartment: {
    type: String,
  },
  docAvtar: {
    public_id: String,
    url: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); 
};

userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id:this._})
}

export const User = mongoose.model("User", userSchema);
