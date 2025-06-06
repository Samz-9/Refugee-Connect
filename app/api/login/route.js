import { NextResponse } from 'next/server';
import connectDB from '@/db/connectdb';
import User from '@/model/User';

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    await connectDB();
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    if (user.password !== password) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({
      message: 'Login successful',
      username: user.username,
      uid: user._id.toString(),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
