import dbConnect from "@/app/lib/mongoose";
import { payloadToken } from "@/app/lib/types";
import { todoSchemaCreate } from "@/app/lib/validation";
import todoModel from "@/app/model/todoModel";
import userModel from "@/app/model/userModel";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

// create todo
export async function POST(request: NextRequest) {
  const body = await request.json();
  // get token form cookie
  const token = request.cookies.get("jwtCrudTask")?.value;
  if (!token)
    return NextResponse.json({ message: "unauthurized" }, { status: 401 });
  // validation on body
  const validation = todoSchemaCreate.safeParse(body);
  if (validation.error) {
    return NextResponse.json({ message: validation.error.errors[0].message });
  }
  try {
    // connection db
    await dbConnect();
    // verify Token
    const decodeToken = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as payloadToken;
    const userId = decodeToken._id;
    // check on user found
    const findUser = await userModel.findById(userId);
    if (!findUser)
      return NextResponse.json({ message: "user ot found" }, { status: 404 });
    // create todo
    const newTodo = {
      ...body,
      userId,
    };
    const todo = await todoModel.create(newTodo);
    return NextResponse.json(
      { message: "create todo success", data: todo },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: `internal server error` },
      { status: 500 }
    );
  }
}

// fetch todo for user login
export async function GET(request: NextRequest) {
  // get token form cookie
  const token = request.cookies.get("jwtCrudTask")?.value;
  if (!token)
    return NextResponse.json({ message: "unauthurized" }, { status: 401 });

  try {
    // connection db
    await dbConnect();
    // verify Token
    const decodeToken = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as payloadToken;
    const userId = decodeToken._id;

    const todos = await todoModel.find({
      userId: userId,
    });
    return NextResponse.json(
      { message: "fetch todo success", data: todos },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: `internal server error` },
      { status: 500 }
    );
  }
}
