import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { id } = body;

  if (!id) return Response.json({ message: "ID is required" }, { status: 400 });

  await prisma?.task.delete({
    where:{
      id
    }
  })
  return Response.json({ message: `Deleted task Successfully`,taskId:id },{status:200});
  } catch (error) {
    return Response.json({ message: `Can't able to find id`,error:error },{status:500});
  }
}

