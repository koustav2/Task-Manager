import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/utils/prisma";
export async function POST(
    request: Request,
) {
    const body = await request.json();
    const { username, email, password, avatar } = body;
    if (!username || !email || !password) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const user = await prisma.user.findUnique({
        where: { email: email }
    });
    if (user) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }



    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newuser = await prisma.user.create({
        data: {
            username,
            email,
            password: hash,
            avatar
        },
    });
    return NextResponse.json({ newuser,message: "User created" }, { status: 200 });
}

