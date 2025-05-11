import { sendVerifyOtp, signIn,  signOut, signUp,sendForgotPasswordOtp, verifyAccount, isAuthenticated, verifyForgotPasswordOtp,getUserDetails } from "../controller/authController.js";
import express from 'express';
import userAuth from "../middleware/userAuth.js";



const authRouter = express.Router();

authRouter.post('/signIn', signIn);
authRouter.post('/signUp', signUp);
authRouter.get('/signOut',signOut);
authRouter.post('/sendVerifyOtp', userAuth, sendVerifyOtp);
authRouter.post('/verifyAccount', userAuth, verifyAccount);
authRouter.post('/isAuthenticated', userAuth, isAuthenticated);
authRouter.post('/sendForgotPasswordOtp',  sendForgotPasswordOtp);
authRouter.post('/verifyNewPassword', verifyForgotPasswordOtp)
authRouter.get('/profile', userAuth, getUserDetails);

export default authRouter;