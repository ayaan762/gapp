import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to } = body;

    if (!to) {
      return NextResponse.json({ message: "Missing 'to' phone number" }, { status: 400 });
    }

    const call = await client.calls.create({
      url: "http://demo.twilio.com/docs/voice.xml",
      to,
      from: process.env.TWILIO_PHONE_NUMBER!,
    });

    return NextResponse.json({ callSid: call.sid });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
