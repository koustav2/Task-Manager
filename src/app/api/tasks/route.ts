import { NextResponse } from "next/server";
import getCurrentUser from "@/utils/getCurrentUser";
import prisma from "@/utils/prisma";
export async function POST(req: Request) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { title, description, date, completed, important } = body;

    if (!title || !description || !date) {
        return NextResponse.json({
            error: "Missing required fields",
            status: 400,
        });
    }
    if (title.length > 20) {
        return NextResponse.json({
            error: "Title is too long",
            status: 400,
        });
    }

    if (title.length < 3) {
        return NextResponse.json({
            error: "Title is too short",
            status: 400,
        });
    }
    console.log(user)

    const newTask = await prisma.task.create({
        data: {
            title,
            description,
            date,
            isCompleted: completed,
            isImportant: important,
            userId: user.id,
        },
    });

    return NextResponse.json({ message: "Task created successfully" });


}

export async function GET(req: Request) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const tasks = await prisma.task.findMany({
        where: {
            userId: user.id,
        },
    });
    return NextResponse.json(tasks);
}
