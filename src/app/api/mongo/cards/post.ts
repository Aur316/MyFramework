import { NextResponse } from "next/server";
import { cardsAPI, inputCardFactory, outputCardFactory } from "./utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newCard = inputCardFactory(body);
    const savedCard = await cardsAPI.insertOne(newCard);
    return NextResponse.json(outputCardFactory(savedCard), { status: 201 });
  } catch (error) {
    console.error("POST Card Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
