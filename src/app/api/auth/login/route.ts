import User from '@/models/schemas/user.schema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  const { email, password } = reqBody;
  try {
    const user = await User.findOne({
      email,
      password,
    });
    if (!user) {
      return NextResponse.json({
        status: 400,
        message: 'User not found',
      });
    }
    return NextResponse.json({
      status: 200,
      message: 'User found',
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}