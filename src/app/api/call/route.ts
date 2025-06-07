import { NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !twilioPhoneNumber) {
  console.error('Twilio credentials missing!');
}

const client = twilio(accountSid, authToken);

export async function POST(request: Request) {
  try {
    const { to, message } = await request.json();

    if (!to || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing phone number or message' },
        { status: 400 }
      );
    }

    const call = await client.calls.create({
      twiml: `<Response><Say voice="alice">${message}</Say></Response>`,
      to,
      from: twilioPhoneNumber,
      statusCallback: `${process.env.NEXTAUTH_URL}/api/call/status`,
      statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
      statusCallbackMethod: 'POST'
    });

    return NextResponse.json({
      success: true,
      callSid: call.sid,
      status: call.status,
      message: 'Call initiated successfully'
    });

  } catch (error: any) {
    console.error('Twilio error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: error.message.includes('Permission to call') 
          ? 'International calling not enabled on your Twilio account'
          : 'Failed to initiate call'
      },
      { status: 500 }
    );
  }
}