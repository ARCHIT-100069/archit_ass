import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build');

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const isQuotation = data.isQuotation === 'true' || data.isQuotation === true || !!data.productCategory;
    
    if (isQuotation) {
      console.log('QUOTE REQUEST RECEIVED:', data);
    }

    let finalSubject;
    let htmlContent;

    if (isQuotation) {
      finalSubject = 'New Quotation Request';
      htmlContent = `
        <h2>${finalSubject}</h2>
        <p><strong>Name:</strong> ${data.fullName || 'N/A'}</p>
        <p><strong>Company Name:</strong> ${data.companyName || 'N/A'}</p>
        <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
        <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
        <p><strong>GST Number:</strong> ${data.gstNumber || 'N/A'}</p>
        <p><strong>Product Category:</strong> ${data.productCategory || 'N/A'}</p>
        <p><strong>Product Name:</strong> ${data.productName || 'N/A'}</p>
        <p><strong>Quantity:</strong> ${data.quantity || 'N/A'}</p>
        <p><strong>Delivery Location:</strong> ${data.deliveryLocation || 'N/A'}</p>
        <p><strong>Project Type:</strong> ${data.projectType || 'N/A'}</p>
        <p><strong>Requirements / Message:</strong> ${data.requirementDescription || 'N/A'}</p>
      `;
    } else {
      const { name, email, message, subject } = data;
      finalSubject = subject ? \`New Contact Message: \${subject}\` : 'New Contact Message';
      htmlContent = `
        <h2>${finalSubject}</h2>
        <p><strong>Name:</strong> ${name || 'N/A'}</p>
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
        <p><strong>Message:</strong> ${message || 'N/A'}</p>
      `;
    }

    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'architasst@gmail.com',
      subject: finalSubject,
      html: htmlContent,
    });

    if (response.error) {
      if (isQuotation) console.error('QUOTE EMAIL ERROR:', response.error);
      else console.error('Resend API Error:', response.error);
      return NextResponse.json({ error: response.error.message }, { status: 400 });
    }

    if (isQuotation) {
      console.log('EMAIL SENT:', response);
    }

    return NextResponse.json({ success: true, data: response });
  } catch (error: any) {
    console.error('QUOTE EMAIL ERROR:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}

