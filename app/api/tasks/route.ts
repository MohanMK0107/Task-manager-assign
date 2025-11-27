import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tasks = await prisma.task.findMany({
      where: {
        user: { email: session.user.email },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({ tasks }, { status: 200 });
  } catch (error) {
    console.error("TASK FETCH ERROR:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
};
