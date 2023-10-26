import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,


    },

    password:{
          type:String,
         minLenght:6
    },

    addedMovies:[{
        type:String,

    }]


});

export default mongoose.model("Admin",adminSchema);
