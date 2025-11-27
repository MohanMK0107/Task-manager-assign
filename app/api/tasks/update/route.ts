import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, title, description, dueDate, status } = body;
    if (!id) return Response.json({ message: "ID is required" }, { status: 400 });

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        dueDate: new Date(dueDate) ,
        status,
      },
    });
    if(!updatedTask) return Response.json({message:"Task cant be updated"})
    return Response.json(
      { message: `Update task Successfully`, task: updatedTask },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: `Can't able to find id`, error: error },
      { status: 500 }
    );
  }
}
