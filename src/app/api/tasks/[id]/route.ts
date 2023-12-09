import { NextResponse } from "next/server";
import prisma from "../../../../utils/prisma";
import getCurrentUser from "@/utils/getCurrentUser";
export async function POST(req: Request) { }

export async function GET(req: Request) { }

export async function PUT(req: Request) { }

export async function DELETE(req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { id } = params;

        const task = await prisma.task.delete({
            where: {
                id,
            },
        });

        return NextResponse.json({
            message: "Task deleted successfully",
            status: 200,
        });
    } catch (error) {
        console.log("ERROR DELETING TASK: ", error);
        return NextResponse.json({ error: "Error deleting task", status: 500 });
    }
}