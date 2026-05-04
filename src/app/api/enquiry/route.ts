import { NextResponse } from 'next/server';
import { sendEnquiryEmail } from '@/lib/sendEnquiryEmail';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Call the serverless function
    const response = await sendEnquiryEmail({ name, email, message });

    return NextResponse.json({ success: true, data: response });
  } catch (error: any) {
    console.error('Error sending enquiry email:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
