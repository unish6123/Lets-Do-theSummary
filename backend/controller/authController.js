import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import transporter from "../config/nodeMailer.js";


export const signUp = async(req, res) =>{
    try{
        const{name, email, password} = req.body;
        if (!name || !email || !password){
            return res.json({success:false, message:"Missing Credentials"});
        }

        const userEmail = await userModel.findOne({email});
        if (userEmail){
            return res.json({success:false, message:"Your account already exists or this email arealy exists."})
        }
        
        try{
            const hashedPassword = await bcrypt.hash(password,10); 
            const user = new userModel({name, email, password:hashedPassword});
            await user.save();


            const token = jwt.sign({id:user._id},process.env.JWT_SECRET, 
                {expiresIn:"7d"});
            
            res.cookie('token', token, {
                httpOnly:true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite:'none',
                maxAge: 7*24*60*60*1000
            })

            await transporter.sendMail({
                from:process.env.SENDER_EMAIL,
                to: email,
                subject:'Welcome to bookSummary.',
                text:`Hello ${name} welcome to the reading world. Thank you for signing up with 
                ${email}.`
                

            })

            return res.json({success:true, message:"User signed up successfully."})

        }
        catch(error){
            res.json({success:false, message:error.message});
        }

        

    } catch(error){
        res.json({success:false, message:error.message});

    }
}

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: "The user doesn't exist." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid password." });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Set the cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Respond with user data and token
        return res.status(200).json({ 
            success: true,
            message: "User signed in successfully.",
            user: {
              name: user.name,
              email: user.email,
              role: user.role,
              id: user._id
            }
          });;

    } catch (error) {
        console.error("SignIn Error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};


export const signOut = async(req, res)=>{
    try{    
        res.clearCookie('token',{
            httpOnly:true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite:'none',
        })

        return res.json({succes:true, message:"User signed out successfully."})

    }
    catch(error){
        res.json({success:false, message:error.message});
    }
}


export const sendVerifyOtp = async (req, res) =>{

    try{

        const {userId, email} = req.body;

        const user = await userModel.findById(userId);
        
        if (user.isVerified){
            return res.json({success:false, message: "The account is already verified."})
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now()+ 24 *60*60*1000

        await user.save();

        await transporter.sendMail({
            from:process.env.SENDER_EMAIL,
            to: email,
            subject:'Welcome to bookSummary.',
            text:`Your verification code is  ${otp}.`
    })
        res.json({success:true, message: "Verification otp sent to your email." })


        } catch(error){
            res.json({success:false, message: error.message})
    }

}

export const verifyAccount = async (req, res) => {
    try {
        const { userId, otp } = req.body;

        const user = await userModel.findById(userId); 

        if (!user || !otp) {
            return res.json({ success: false, message: "User ID and OTP are required." });
        }

        const otpDatabase = user.verifyOtp;

        if (user.isVerified){
            return res.json({ success: false, message: "The account is already verified." });
        }

        if (otpDatabase != otp) {
            return res.json({ success: false, message: "Wrong verification code." });
        }

        if (user.verifyOtpExpireAt < new Date()) {
            return res.json({ success: false, message: "The OTP is already expired." });
        }

        if (user.verifyOtp != otp) {
            return res.json({ success: false, message: "The OTP doesn't match." });
        }

        user.isVerified = true;

        return res.json({ success: true, message: "Account successfully verified." });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


export const isAuthenticated = async (req, res)=>{
    try{
        return res.json({success:true, message:"user is authenticated."})
    }catch(error){
        res.json({success:false, message:error.message})
    }
}

export const sendForgotPasswordOtp = async(req, res)=>{
    try{
         const { email} = req.body;
         const user = await userModel.findOne({email})
         user.resetOtp = "";
         await user.save();
        
         if (!email ){
            return res.json({success:false, message:"Missing email address."})
         }
         
         if (!user){
            return res.json({success:false, message:"This user doesn't exist."})
         }

         

         const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.resetOtp = otp;
        await user.save();
        user.resetOtpExpireAt = Date.now()+  5*60*1000

        await user.save();

        await transporter.sendMail({
            from:process.env.SENDER_EMAIL,
            to: email,
            subject:'Verification Otp.',
            text:`Use this code to verify your new password change.  ${otp}
            \n Note that this otp will expire within 5 minutes.`
    })

         return res.json({success:true, message:`Verification otp sent to your email.`})
         

    }catch(error){
        return res.json({success:false, message:error.message})
    }
}


export const verifyForgotPasswordOtp = async(req, res)=>{

    try{
        const {email, otp, newPassword} = req.body;
        const user = await userModel.findOne({email});

        console.log('The otp that we got from front end is ', otp, "And the resetOtp in database is ", user.resetOtp)

        if (!user || !otp || !newPassword){
            return res.json({success:false, message: "User is not register with this account. "})
        }
        if (user.resetOtp === "" || otp !== user.resetOtp){
            return res.json({success:false, message: `invalidOtp from database = ${user.resetOtp} and form frontend ${otp}`})
        }
        if (Date.now() > user.resetOtpExpireAt){
            return res.json({success:false , message:"Otp is expired."})
        }
        
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;
        user.save();

        return res.json({success:true, message:"Password updated successfully."})


    

    }catch(error){
        return res.json({success:false, message:error.message})
    }
}


export const getUserDetails = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select('-password -resetOtp -verifyOtp'); 

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({ success: false, message: "Server error." });
    }
};
