import dbConnect from "@/app/lib/mongoose";
import { todoSchemaUpdate } from "@/app/lib/validation";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { payloadToken } from "@/app/lib/types";
import todoModel from "@/app/model/todoModel";

// update todo
export async function PUT(
  request: NextResponse,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { id } = params;

  // get token form cookie
  const token = request.cookies.get("jwtCrudTask")?.value;
  if (!token)
    return NextResponse.json({ message: "unauthurized" }, { status: 401 });

  // validation on body
  const validation = todoSchemaUpdate.safeParse(body);
  if (validation.error) {
    return NextResponse.json({ message: validation.error.errors[0].message });
  }

  try {
    // connected db
    await dbConnect();

    // verify Token
    const decodeToken = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as payloadToken;
    const userId = decodeToken._id;

    // get todo
    const findTodo = await todoModel.findById(id);
    if (!findTodo)
      return NextResponse.json({ message: "todo not found" }, { status: 404 });

    // check on permission update todo
    if (findTodo?.userId?.toString() !== userId)
      return NextResponse.json(
        { message: "not allow update this todo" },
        { status: 401 }
      );
    // update todo
    findTodo.title = body.title || findTodo.title;
    findTodo.description = body.description || findTodo.description;
    findTodo.isComplete = body.isComplete;
    await findTodo.save();
    return NextResponse.json(
      { message: "update todo success", data: findTodo },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

// delete todo
export async function DELETE(
  request: NextResponse,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  // get token form cookie
  const token = request.cookies.get("jwtCrudTask")?.value;
  if (!token)
    return NextResponse.json({ message: "unauthurized" }, { status: 401 });

  try {
    // connected db
    await dbConnect();

    // verify Token
    const decodeToken = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as payloadToken;
    const userId = decodeToken._id;

    // get todo
    const findTodo = await todoModel.findById(id);
    if (!findTodo)
      return NextResponse.json({ message: "todo not found" }, { status: 404 });

    // check on permission update todo
    if (findTodo?.userId?.toString() !== userId)
      return NextResponse.json(
        { message: "not allow update this todo" },
        { status: 401 }
      );

    // delete todo
    await todoModel.deleteOne({ _id: id });

    return NextResponse.json(
      { message: "delete todo success" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
