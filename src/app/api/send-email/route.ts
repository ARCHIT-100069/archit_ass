import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build');

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let data: any = {};
    let file: File | null = null;
    
    if (contentType.includes('multipart/form-data')) {
        const formData = await request.formData();
        for (const [key, value] of formData.entries()) {
            if (key === 'attachment' && value instanceof Blob) {
                file = value as File;
            } else {
                data[key] = value;
            }
        }
    } else {
        data = await request.json();
    }

    const isQuotation = data.isQuotation === 'true' || data.isQuotation === true || !!data.productCategory;
    
    if (isQuotation) {
      console.log('QUOTE REQUEST RECEIVED:', data);
    }

    let resendAttachments = [];
    let uploadedFileUrl = null;

    if (file && file.size > 0) {
        if (file.size <= 3.5 * 1024 * 1024) { // Direct attachment for < 3.5MB
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            resendAttachments.push({
                filename: file.name,
                content: buffer.toString('base64'),
            });
        } else {
            // Upload to Supabase quote-attachments bucket
            if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
                const supabase = createClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL,
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                );
                
                const uniqueFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
                
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('quote-attachments')
                    .upload(uniqueFileName, file, {
                        contentType: file.type || 'application/octet-stream',
                        upsert: false
                    });
                    
                if (!uploadError && uploadData) {
                    const { data: publicUrlData } = supabase.storage
                        .from('quote-attachments')
                        .getPublicUrl(uniqueFileName);
                    uploadedFileUrl = publicUrlData.publicUrl;
                } else {
                    console.error("Supabase attachment upload error:", uploadError);
                }
            }
        }
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
        <hr />
        ${uploadedFileUrl ? `<p><strong>Attachment:</strong> <a href="${uploadedFileUrl}">${file?.name}</a> (Download Link)</p>` : (resendAttachments.length > 0 ? `<p><strong>Attachment:</strong> ${file?.name} (Attached directly to this email)</p>` : '<p><strong>Attachment:</strong> None</p>')}
      `;
    } else {
      const { name, email, message, subject } = data;

      finalSubject = subject
        ? `New Contact Message: ${subject}`
        : 'New Contact Message';

      htmlContent = `
        <h2>${finalSubject}</h2>
        <hr />
        <p><strong>Name:</strong> ${name || 'N/A'}</p>
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message || 'N/A'}</p>
      `;
    }

    const emailPayload: any = {
      from: 'onboarding@resend.dev',
      to: 'architasst@gmail.com',
      subject: finalSubject,
      html: htmlContent,
    };
    
    if (resendAttachments.length > 0) {
        emailPayload.attachments = resendAttachments;
    }

    const response = await resend.emails.send(emailPayload);

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
