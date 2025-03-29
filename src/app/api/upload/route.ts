import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { prisma } from '@/lib/prisma/client';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  const session = (await getServerSession(authOptions)) as {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  };
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file)
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileKey = `${Date.now()}-${file.name}`;
  const uploadPath = path.join(process.cwd(), 'public/uploads', fileKey);

  await writeFile(uploadPath, buffer);

  const document = await prisma.document.create({
    data: {
      name: file.name,
      fileKey,
      userId: session.user.id,
    },
  });

  return NextResponse.json(document);
}
