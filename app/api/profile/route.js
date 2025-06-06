import { NextResponse } from "next/server";
import connectDB from "@/db/connectdb";
import User from "@/model/User";
import sanitize from "mongo-sanitize";


export async function POST(req) {
  try {
    const rawData = await req.json();
    const data = sanitize(rawData);
    await connectDB();
    let user;
    const existingUser = await User.findOne({ username: data.username });
    if (existingUser) {
      existingUser.name = data.name;
      existingUser.age = data.age;
      existingUser.gender = data.gender;
      existingUser.nationality = data.nationality;
      existingUser.language = data.language;
      existingUser.skills = data.skills;
      existingUser.location = data.location;
      existingUser.education = data.education;
      existingUser.updatedAt = new Date();
      await existingUser.save();
      user = existingUser;
    }
    else {
      const newUser = new User({
        username: data.username,
        password: data.password,
        name: data.name,
        age: data.age,
        gender: data.gender,
        nationality: data.nationality,
        language: data.language,
        skills: data.skills,
        location: data.location,
        education: data.education,
        createdAt: new Date(),
      });
      await newUser.save();
      user = newUser
    }
    return NextResponse.json({ _id: user._id }, { status: 200 });



  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
