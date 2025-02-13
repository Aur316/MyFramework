import { NextResponse } from "next/server";
import { cardsAPI } from "../utils";

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    if (!id) {
      return NextResponse.json({ message: "Missing ID" }, { status: 400 });
    }
    await cardsAPI.deleteOne(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`DELETE Card Error: ${error}`);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
