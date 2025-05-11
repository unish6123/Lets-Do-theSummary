import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDb from "./config/mongoDb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoute.js";
import bookRouter from "./routes/bookRoutes.js";
import bookHistoryRouter from "./routes/bookHistoryRoutes.js";
import dbBookRouter from "./routes/dbBookRoutes.js";
import {S3Client} from "@aws-sdk/client-s3";


const app = express();

const port = process.env.PORT || 4000;
connectDb();

const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins,credentials:true}));





app.get('/',(req, res)=> res.send("APi working"));
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);

app.use('/api',bookHistoryRouter);

app.use('/api',bookRouter);

app.use('/api', dbBookRouter);

app._router.stack.forEach((r) => {
    if (r.route) {
        console.log(r.route.path);
    } else if (r.name === 'router') {
        r.handle.stack.forEach((s) => {
            if (s.route) {
                console.log(s.route.path);
            }
        });
    }
});


app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
    });


    // Remember while quering a date of the response gotten by user you need to do this:
    // const formatted = new Date(history.createdAt).toLocaleString(); // e.g., "4/22/2025, 11:00:00 AM"
    // this will give you the date in the format you want
    // you can use toLocaleDateString() for just the date
    // and toLocaleTimeString() for just the time