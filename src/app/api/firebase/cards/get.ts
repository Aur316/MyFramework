import { NextResponse } from "next/server";
import { cardsAPI, outputCardFactory } from "./utils";

export async function GET() {
  try {
    const cards = await cardsAPI.findAll();
    return NextResponse.json(cards.map(outputCardFactory), { status: 200 });
  } catch (error) {
    console.error(`GET Cards Error: ${error}`);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
