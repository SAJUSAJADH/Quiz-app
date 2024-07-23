import { User } from "@/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";



export async function POST(request){
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const {id, downloadURL} = await request.json()
        console.log(id, downloadURL)
        const filter = {
            userId: id
        }
        const update = {
            profilepic: downloadURL
        }
        let user = await User.findOneAndUpdate(filter, update, {new: true})
        console.log(user)
        return NextResponse.json({message: 'ok', user})
    } catch (error) {
        return NextResponse.json({message: 'internal server error', error: error})
    }
}