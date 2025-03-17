import { connectToDB } from "./config/db.js";
import app from "./index.js";
import dotenv from 'dotenv';

dotenv.config()
connectToDB()
app.listen(process.env.PORT || 3000, () => {
    console.log(`sever started at port ${process.env.PORT}`);

})

