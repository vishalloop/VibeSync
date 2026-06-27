import mongoose, { mongo } from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Name is required for registration"],
    },
    email : {
        type : String,
        required : [true, "Email Address is required for registration"],
        unique : [true, "Email Address must be unique"]
    },
    password : {
        type : String,
        required : [true, "Password is required for registration"]
    }
})

userSchema.pre("save",async function () {
    if(!this.isModified("password")) return true;

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const userModel = mongoose.model('user',userSchema);

export default userModel