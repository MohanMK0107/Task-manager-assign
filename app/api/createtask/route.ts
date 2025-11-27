import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";


export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if(!session || !session.user?.email){
      return Response.json({error: "Unauthorized"},{status:401})
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }
    const { title, description, dueDate } = await req.json();
    if (!title) {
      return Response.json({ error: "Title is required" }, { status: 400 });
    }

    const due = dueDate ? new Date(dueDate) : undefined;
    if(due && isNaN(due.getTime())){
      return Response.json({ error: "Invalid dueDate format" }, { status: 400 });
    }
    const newTask = await prisma.task.create({
      data:{
        title,
        description,
        dueDate:due,
        userId:user.id,
      },
    });
    return Response.json({message:"Task created Successfully",task:newTask},{status:201})
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
};
