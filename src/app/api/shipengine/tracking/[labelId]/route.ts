import { Shipengine } from "@/helper/shipEngine";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: {
  params: Promise<{ labelId: string }>
}) {
  const labelId = (await params).labelId;
  if (!labelId) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
  }

  try {
    // you have two options to track
    // you can track using label id
    const label = await Shipengine.trackUsingLabelId(labelId);
    // or
    // you can track using carrier code and tracking number
    // const label = await shipengine.trackUsingCarrierCodeAndTrackingNumber({
    //   carrierCode: "carrier code", // Replace with the actual carrier code
    //   trackingNumber: "tracking number", // Replace with the actual tracking number
    // });

    return NextResponse.json(label, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "An error occurred";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
    });
  }
}