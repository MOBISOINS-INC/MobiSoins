import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const waitlistSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  role: z.enum(['Patient', 'Nurse', 'Employer']),
  city: z.string().min(1, 'City is required'),
  language: z.enum(['Français', 'English']),
  consent: z.literal(true, { message: 'Consent is required' }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = waitlistSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.issues },
        { status: 400 }
      );
    }

    const { fullName, email, phone, role, city, language, consent } = parsed.data;

    const existingUser = await prisma.waitlist.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 409 }
      );
    }

    const newEntry = await prisma.waitlist.create({
      data: { fullName, email, phone, role, city, language, consent },
    });

    return NextResponse.json(
      { message: 'Successfully joined the waitlist', data: newEntry },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving to waitlist:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
