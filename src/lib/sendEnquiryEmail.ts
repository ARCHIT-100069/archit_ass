import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EnquiryEmailParams {
  name: string;
  email: string;
  message: string;
}

export async function sendEnquiryEmail({ name, email, message }: EnquiryEmailParams) {
  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'architasst@gmail.com',
      subject: 'New Enquiry Received',
      html: `
        <h3>New Enquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
