import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs";

export const POST = async(req:Request)=>{
  try {
    const {name , email , password} = await req.json();

    if(!email || !password){
      return Response.json({error:"Credentials Required"},{status:400})
    }
    const existing = await prisma.user.findUnique({where:{email}});
    if(existing){
      return Response.json({error:"User already exists"},{status:409})
    }
    const hashed = await bcrypt.hash(password,10);
    const newUser = await prisma.user.create({
      data:{
        name,
        email,
        password:hashed
      },
    });

    return Response.json({message:"User created Successfully",user:newUser},{status:201})

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}