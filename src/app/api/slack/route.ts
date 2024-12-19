import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const webhookUrl = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL; // .env.local에 저장된 Webhook URL
  const body = await request.json();

  const message = {
    text: `New form submission:\n- Email: ${body.email}\n -Name: ${body.name}\n -Organization: ${body.organization}\n -Phone: ${body.phone}\n -Inquiry: ${body.inquiry}\n -Agreement: ${body.agreement}\n
`};

  try {
    const response = await fetch(webhookUrl!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to send to Slack' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
