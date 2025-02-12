import { NextResponse } from "next/server";
import { cardsAPI, outputCardFactory } from "../utils";

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    if (!id) {
      return NextResponse.json({ message: "Missing ID" }, { status: 400 });
    }

    const card = await cardsAPI.findById(id);
    if (!card)
      return NextResponse.json({ message: "Card not found" }, { status: 404 });

    return NextResponse.json(outputCardFactory(card), { status: 200 });
  } catch (error) {
    console.error(`GET Card Error: ${error}`);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
