import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://greatStack:5tBM4vagDVMLXTQi@cluster0.gxg19.mongodb.net/food-del').then(()=> {console.log("DB Connected");
    })
}




//5tBM4vagDVMLXTQi
//mongodb+srv://greatStack:<db_password>@cluster0.gxg19.mongodb.net/?