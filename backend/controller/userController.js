import userModel from "../model/userModel.js";
const getUserData= async(req, res)=>{

    const {userId} = req.body;
    const user = await userModel.findById(userId);

    if (!user){
        return res.json({success:false, message:"User needs to login first."})
    }

    try{
        res.json({
            success:true,
            userData :{
                name:user.name,
                isAccountVerified:user.isVerified,
            }
        })

    }catch(error){
        return res.json({success:false, message:error.message})
    }
}
export default getUserData;