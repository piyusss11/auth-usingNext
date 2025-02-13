import { connectDb } from "@/config/db";
import { SendEmail } from "@/helper/nodemailer";
import User from "@/models/UserModel";
import bcrypt from "bcryptjs";


import { NextRequest, NextResponse } from "next/server";

connectDb();
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;
    const isUser = await User.findOne({ email });
    if (isUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPasswrod =await bcrypt.hash(password, 10);
    const addUser = await User.create({
      username,
      email,
      password: hashedPasswrod,
    });
    console.log(addUser);
    await SendEmail({
      email: addUser.email,
      emailType: "VERIFY",
      userId: addUser._id,
    });
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      addUser,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
