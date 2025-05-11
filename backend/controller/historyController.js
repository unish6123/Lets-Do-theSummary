import express from "express";
import historyModel from "../model/historiesModel.js";

export const getHistory = async(req, res)=>{
    try{
        const {userId} = req.body;
        if (!userId){
            return res.json({success:false, message:"User needs to login first."})
        }
        const searchHistory = await historyModel.findOne({userId})

        if (!searchHistory){
            return res.json({success:false, message:"No history."})
        }

        const responseFromAI = searchHistory.aiResponse;
        const bookName = searchHistory.bookName;
        const timeCreated = searchHistory.createdAt;
        const chapterName = searchHistory.chapterName;


        return res.json({success:true, responseFromAI, bookName, timeCreated, chapterName})


        
    } catch(error){
        res.status(500).json({success:false, message:error.message})
    }
}


export const addHistory = async(req,res)=>{
    try{
        const {userId, bookName, aiResponse, chapterName, chapterId} = req.body;
        if (!userId || !bookName || !aiResponse || !chapterName || !chapterId) {
            return res.json({success:false, message : "userId, bookName, aiResponse or chapterName might be missing."})
        }
        const historyToBeAdded  = new historyModel({
            userId,
            bookName,
            aiResponse,
            chapterName,
            chapterId
        })
        await historyToBeAdded.save();
        return res.json({success:true, message:"Added history successfully."})

    } catch(error){
        res.json({success:false, message:error.message})
    }
}