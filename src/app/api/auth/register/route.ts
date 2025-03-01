import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json();
    
    const response = await axios.post(`${process.env.API_URL}/api/auth/register`, {
      email,
      username,
      password,
      name: username,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Registration failed", error: error.response?.data || error.message },
      { status: error.response?.status || 500 }
    );
  }
}
