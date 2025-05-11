// 777410
import mongoose, { model } from "mongoose";

const historySchema = new mongoose.Schema({
    aiResponse: {type:String, required:true},
    userId: {type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
    bookName: {type:String, required:true},
    createdAt: {type:Date, default:Date.now},
    chapterName: {type:String, required:true},
    chapterId:{type:String, required:true},

    
})

const historyModel = mongoose.models.history || mongoose.model('history', historySchema);
// creates a new user model if it does not exist and if it exists then it uses that

export default historyModel;