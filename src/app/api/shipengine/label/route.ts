import { Shipengine } from "@/helper/shipEngine";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { rateId } = await req.json();

    if (!rateId) {
      return NextResponse.json({ error: "rateId is required" }, { status: 400 });
    }

    const label = await Shipengine.createLabelFromRate({ rateId });

    return NextResponse.json(label, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while creating the label" },
      { status: 500 }
    );
  }
}
