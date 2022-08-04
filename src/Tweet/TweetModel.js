import mongoose from "mongoose";

const tweetSchema= new mongoose.Schema({
text: {
    type: String,
    required: true,
    maxlength: 120
},
status:{
    type: String,
    enum: ['draft', 'published'],
    default : 'draft'
},
user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
}
},{timestamps:true}); 

export const Tweet =mongoose.model('tweet', tweetSchema);