import { NextResponse } from "next/server";
import connectDB from "@/db/connectdb";
import mongoose from "mongoose";
import User from "@/model/User";

export async function POST(req) {
  try {
    const { username, uid } = await req.json();
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(uid)) {
      return NextResponse.json({ valid: false });
    }

    const user = await User.findOne({
      username,
      _id: uid,
    });

    return NextResponse.json({ valid: !!user , user });
  } catch (err) {
    console.error("Validation error:", err);
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
