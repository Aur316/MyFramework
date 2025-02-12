import { NextResponse } from "next/server";
import { cardsAPI, outputCardFactory } from "../utils";

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    if (!id)
      return NextResponse.json({ message: "Missing ID" }, { status: 400 });

    const body = await req.json();
    const updatedCard = await cardsAPI.updateOne(id, body);

    if (!updatedCard)
      return NextResponse.json({ message: "Card not found" }, { status: 404 });

    return NextResponse.json(outputCardFactory(updatedCard), { status: 200 });
  } catch (error) {
    console.error(`PUT Card Error: ${error}`);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
